import { describe, expect, it } from "vitest";
import { resolveSiteAsset } from "./siteAsset";

describe("resolveSiteAsset", () => {
  const assetPath = "/manus-storage/andre-profile-img.webp";

  it("keeps same-origin storage paths for the managed deployment", () => {
    expect(resolveSiteAsset(assetPath, false)).toBe(assetPath);
  });

  it("uses the public Manus origin for the static GitHub Pages build", () => {
    expect(resolveSiteAsset(assetPath, true)).toBe(
      "https://andrefolio-f6gtj9q8.manus.space/manus-storage/andre-profile-img.webp",
    );
  });
});
