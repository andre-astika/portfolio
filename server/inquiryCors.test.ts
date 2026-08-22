import { describe, expect, it } from "vitest";
import { applyInquiryCorsHeaders, GITHUB_PAGES_ORIGIN, isAllowedInquiryOrigin } from "./inquiryCors";

describe("inquiry CORS policy", () => {
  it("allows only the published GitHub Pages origin", () => {
    expect(isAllowedInquiryOrigin(GITHUB_PAGES_ORIGIN)).toBe(true);
    expect(isAllowedInquiryOrigin("https://example.com")).toBe(false);
    expect(isAllowedInquiryOrigin(undefined)).toBe(false);
  });

  it("returns only the headers needed for a public inquiry POST", () => {
    const headers = new Map<string, string>();
    applyInquiryCorsHeaders({ setHeader: (name, value) => headers.set(name, value) }, GITHUB_PAGES_ORIGIN);

    expect(headers).toEqual(
      new Map([
        ["Access-Control-Allow-Origin", GITHUB_PAGES_ORIGIN],
        ["Access-Control-Allow-Methods", "POST, OPTIONS"],
        ["Access-Control-Allow-Headers", "Content-Type, trpc-accept"],
        ["Vary", "Origin"],
      ]),
    );
  });
});
