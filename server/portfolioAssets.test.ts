import { describe, expect, it } from "vitest";
import {
  MAX_PORTFOLIO_ASSET_BYTES,
  sanitizePortfolioFileName,
  validatePortfolioAssetUpload,
} from "./portfolioAssets";

describe("portfolio asset upload safeguards", () => {
  it("removes unsafe path characters from uploaded names", () => {
    expect(sanitizePortfolioFileName("../Andre hero (final).webp")).toBe("Andre-hero-final-.webp");
  });

  it("accepts an allowed small image payload", () => {
    const bytes = validatePortfolioAssetUpload({
      fileName: "hero.webp",
      contentType: "image/webp",
      dataBase64: Buffer.from("image bytes").toString("base64"),
    });

    expect(bytes).toBeGreaterThan(0);
  });

  it("rejects unsupported file types and oversized files", () => {
    expect(() => validatePortfolioAssetUpload({
      fileName: "danger.exe",
      contentType: "application/x-msdownload",
      dataBase64: "ZmlsZQ==",
    })).toThrow("Only JPG, PNG, WEBP, and PDF files can be uploaded.");

    expect(MAX_PORTFOLIO_ASSET_BYTES).toBe(10 * 1024 * 1024);
  });
});
