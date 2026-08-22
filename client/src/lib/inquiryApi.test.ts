import { describe, expect, it } from "vitest";
import { GITHUB_PAGES_INQUIRY_API_ORIGIN, getTrpcApiUrl, shouldIncludeTrpcCredentials } from "./inquiryApi";

describe("inquiry API host selection", () => {
  it("uses the Manus endpoint without cookies from the GitHub Pages build", () => {
    expect(getTrpcApiUrl(true)).toBe(`${GITHUB_PAGES_INQUIRY_API_ORIGIN}/api/trpc`);
    expect(shouldIncludeTrpcCredentials(true)).toBe(false);
  });

  it("keeps same-origin credentials for the Manus-hosted site", () => {
    expect(getTrpcApiUrl(false)).toBe("/api/trpc");
    expect(shouldIncludeTrpcCredentials(false)).toBe(true);
  });
});
