import { describe, expect, it } from "vitest";
import { FOOTER_BRAND_MARK, FOOTER_COPYRIGHT } from "./Contact";
import { NAV_BRAND_MARK } from "./Nav";

describe("minimal site branding", () => {
  it("uses a sparkle-only mark in both the navigation and footer", () => {
    expect(NAV_BRAND_MARK).toBe("✦");
    expect(FOOTER_BRAND_MARK).toBe("✦");
  });

  it("retains the requested footer copyright line", () => {
    expect(FOOTER_COPYRIGHT).toBe("© 2026 Andre Astika — Denpasar, Bali");
  });
});
