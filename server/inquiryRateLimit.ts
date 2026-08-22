export const INQUIRY_RATE_LIMIT_MAX_ATTEMPTS = 3;
export const INQUIRY_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1_000;

export type InquiryRateLimitSnapshot = {
  attempts: number;
  windowStartedAt: Date;
};

export type InquiryRateLimitDecision = {
  allowed: boolean;
  attempts: number;
  windowStartedAt: Date;
};

export function evaluateInquiryRateLimit(
  current: InquiryRateLimitSnapshot | undefined,
  now: Date,
): InquiryRateLimitDecision {
  if (!current || now.getTime() - current.windowStartedAt.getTime() >= INQUIRY_RATE_LIMIT_WINDOW_MS) {
    return { allowed: true, attempts: 1, windowStartedAt: now };
  }

  if (current.attempts >= INQUIRY_RATE_LIMIT_MAX_ATTEMPTS) {
    return { allowed: false, attempts: current.attempts, windowStartedAt: current.windowStartedAt };
  }

  return {
    allowed: true,
    attempts: current.attempts + 1,
    windowStartedAt: current.windowStartedAt,
  };
}
