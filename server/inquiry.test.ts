import { describe, expect, it } from "vitest";
import {
  buildInquiryEmailPayload,
  createInquiryFingerprint,
  inquiryInputSchema,
  isInquirySubmittedTooQuickly,
} from "./inquiry";
import { evaluateInquiryRateLimit, INQUIRY_RATE_LIMIT_MAX_ATTEMPTS } from "./inquiryRateLimit";

const completeInquiry = {
  name: "Nina Lee",
  email: "nina@example.com",
  project: "Portfolio website",
  message: "I would like to discuss a new portfolio.",
  honeypot: "",
  formStartedAt: 10_000,
};

describe("inquiry validation and delivery payload", () => {
  it("requires an authentic name, email, and project details", () => {
    expect(() => inquiryInputSchema.parse({ ...completeInquiry, name: "" })).toThrow("name");
    expect(() => inquiryInputSchema.parse({ ...completeInquiry, email: "not-an-email" })).toThrow("email");
    expect(() => inquiryInputSchema.parse({ ...completeInquiry, message: "" })).toThrow("details");
  });

  it("keeps the visitor address as reply-to rather than sender", () => {
    const payload = buildInquiryEmailPayload(inquiryInputSchema.parse(completeInquiry));

    expect(payload.from).toBe("onboarding@resend.dev");
    expect(payload.to).toEqual(["en.andre.st@gmail.com"]);
    expect(payload.reply_to).toBe("nina@example.com");
    expect(payload.html).toContain("Nina Lee");
  });

  it("hashes client rate-limit fingerprints and rejects fast submissions", () => {
    expect(createInquiryFingerprint("203.0.113.10", "Example Browser")).not.toContain("203.0.113.10");
    expect(isInquirySubmittedTooQuickly(10_000, 12_999)).toBe(true);
    expect(isInquirySubmittedTooQuickly(10_000, 13_000)).toBe(false);
  });
});

describe("inquiry rate-limit decisions", () => {
  it("allows only the configured number of requests per window", () => {
    const startedAt = new Date("2026-08-22T00:00:00.000Z");
    const allowed = evaluateInquiryRateLimit(
      { attempts: INQUIRY_RATE_LIMIT_MAX_ATTEMPTS - 1, windowStartedAt: startedAt },
      new Date("2026-08-22T00:01:00.000Z"),
    );
    const blocked = evaluateInquiryRateLimit(
      { attempts: INQUIRY_RATE_LIMIT_MAX_ATTEMPTS, windowStartedAt: startedAt },
      new Date("2026-08-22T00:01:00.000Z"),
    );

    expect(allowed).toMatchObject({ allowed: true, attempts: INQUIRY_RATE_LIMIT_MAX_ATTEMPTS });
    expect(blocked.allowed).toBe(false);
  });
});
