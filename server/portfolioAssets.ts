import { Buffer } from "node:buffer";

export const MAX_PORTFOLIO_ASSET_BYTES = 10 * 1024 * 1024;

export const ALLOWED_PORTFOLIO_ASSET_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

type UploadCandidate = {
  fileName: string;
  contentType: string;
  dataBase64: string;
};

export function sanitizePortfolioFileName(fileName: string): string {
  const source = fileName.split(/[\\/]/).pop()?.trim() || "portfolio-asset";
  const sanitized = source
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);

  return sanitized || "portfolio-asset";
}

export function validatePortfolioAssetUpload(candidate: UploadCandidate): number {
  if (!ALLOWED_PORTFOLIO_ASSET_TYPES.has(candidate.contentType)) {
    throw new Error("Only JPG, PNG, WEBP, and PDF files can be uploaded.");
  }

  const sizeBytes = Buffer.byteLength(candidate.dataBase64, "base64");
  if (sizeBytes <= 0) throw new Error("The selected file is empty.");
  if (sizeBytes > MAX_PORTFOLIO_ASSET_BYTES) {
    throw new Error("Files must be 10 MB or smaller.");
  }

  return sizeBytes;
}
