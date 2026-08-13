import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { createPortfolioAsset, listPortfolioAssets } from "./db";
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
