import { describe, expect, it } from "vitest";
import { FOOTER_BRAND_MARK, FOOTER_COPYRIGHT } from "./Contact";
import { NAV_BRAND_MARK } from "./Nav";
import {
  FOOTER_CHROME_CONTAINER_CLASS,
  FOOTER_SECTION_CLASS,
  HEADER_CHROME_CONTAINER_CLASS,
  HEADER_NAV_LINKS_CLASS,
  SITE_CHROME_MARK_CLASS,
} from "@/lib/siteChrome";

describe("minimal site branding", () => {
  it("uses a sparkle-only mark in both the navigation and footer", () => {
    expect(NAV_BRAND_MARK).toBe("✦");
    expect(FOOTER_BRAND_MARK).toBe("✦");
    expect(SITE_CHROME_MARK_CLASS).toContain("text-[18px]");
    expect(SITE_CHROME_MARK_CLASS).toContain("md:text-3xl");
  });

  it("uses the same fixed-height container structure for header and footer", () => {
    expect(HEADER_CHROME_CONTAINER_CLASS).toBe("container site-chrome-container flex h-16 items-center justify-between md:h-20");
    expect(FOOTER_CHROME_CONTAINER_CLASS).toBe("container site-chrome-container flex flex-col items-center justify-between gap-5 md:flex-row md:gap-0");
    expect(FOOTER_SECTION_CLASS).toBe("border-t border-white/10 bg-[oklch(0.11_0_0)] py-6 md:py-12");
    expect(HEADER_NAV_LINKS_CLASS).toContain("lg:flex");
  });

  it("retains the requested footer copyright line", () => {
    expect(FOOTER_COPYRIGHT).toBe("© 2026 Andre Astika — Bali, Indonesia");
  });
});
