export const GITHUB_PAGES_ORIGIN = "https://andre-astika.github.io";

export function isAllowedInquiryOrigin(origin: string | undefined) {
  return origin === GITHUB_PAGES_ORIGIN;
}

export function applyInquiryCorsHeaders(response: { setHeader(name: string, value: string): unknown }, origin: string) {
  response.setHeader("Access-Control-Allow-Origin", origin);
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, trpc-accept");
  response.setHeader("Vary", "Origin");
}
