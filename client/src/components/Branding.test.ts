import { describe, expect, it } from "vitest";
import { FOOTER_BRAND_MARK, FOOTER_COPYRIGHT } from "./Contact";
import { NAV_BRAND_MARK } from "./Nav";
import { SITE_CHROME_CONTAINER_CLASS, SITE_CHROME_MARK_CLASS } from "@/lib/siteChrome";

describe("minimal site branding", () => {
  it("uses a sparkle-only mark in both the navigation and footer", () => {
    expect(NAV_BRAND_MARK).toBe("✦");
    expect(FOOTER_BRAND_MARK).toBe("✦");
    expect(SITE_CHROME_MARK_CLASS).toContain("text-2xl");
    expect(SITE_CHROME_MARK_CLASS).toContain("md:text-3xl");
  });

  it("uses the same fixed-height container structure for header and footer", () => {
    expect(SITE_CHROME_CONTAINER_CLASS).toBe("container site-chrome-container flex h-16 items-center justify-between md:h-20");
  });

  it("retains the requested footer copyright line", () => {
    expect(FOOTER_COPYRIGHT).toBe("© 2026 Andre Astika — Bali, Indonesia");
  });
});
