import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { consumeInquiryRateLimit, createPortfolioAsset, listPortfolioAssets } from "./db";
import { createInquiryFingerprint, inquiryInputSchema, isInquirySubmittedTooQuickly, sendInquiryEmail } from "./inquiry";
import { sanitizePortfolioFileName, validatePortfolioAssetUpload } from "./portfolioAssets";
import { storagePut } from "./storage";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  inquiry: router({
    submit: publicProcedure.input(inquiryInputSchema).mutation(async ({ ctx, input }) => {
      // Quietly accept obvious bot submissions without sending an email.
      if (input.honeypot || isInquirySubmittedTooQuickly(input.formStartedAt)) {
        return { success: true, filtered: true } as const;
      }

      const forwardedFor = ctx.req.headers["x-forwarded-for"];
      const ipAddress = Array.isArray(forwardedFor)
        ? forwardedFor[0] ?? "unknown"
        : forwardedFor?.split(",")[0]?.trim() || ctx.req.ip || "unknown";
      const userAgent = ctx.req.headers["user-agent"] ?? "unknown";
      const fingerprint = createInquiryFingerprint(ipAddress, userAgent);
      const allowed = await consumeInquiryRateLimit(fingerprint);

      if (!allowed) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Please wait a few minutes before sending another inquiry.",
        });
      }

      try {
        await sendInquiryEmail(input);
      } catch (error) {
        console.error("[Inquiry] Delivery failed", error instanceof Error ? error.message : "Unknown error");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Your inquiry could not be sent. Please try again or email Andre directly.",
        });
      }

      return { success: true, filtered: false } as const;
    }),
  }),
  assets: router({
    list: adminProcedure.query(({ ctx }) => listPortfolioAssets(ctx.user.id)),
    upload: adminProcedure
      .input(
        z.object({
          fileName: z.string().trim().min(1).max(255),
          contentType: z.string().trim().min(1).max(128),
          dataBase64: z.string().min(1).max(14 * 1024 * 1024),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const sizeBytes = validatePortfolioAssetUpload(input);
        const fileName = sanitizePortfolioFileName(input.fileName);
        const { key, url } = await storagePut(
          `portfolio-assets/${ctx.user.id}/${Date.now()}-${fileName}`,
          Buffer.from(input.dataBase64, "base64"),
          input.contentType,
        );

        await createPortfolioAsset({
          ownerId: ctx.user.id,
          storageKey: key,
          storageUrl: url,
          fileName,
          contentType: input.contentType,
          sizeBytes,
        });

        return { key, url, fileName, contentType: input.contentType, sizeBytes };
      }),
  }),
});

export type AppRouter = typeof appRouter;
