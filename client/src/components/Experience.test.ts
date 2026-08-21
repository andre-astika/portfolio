import { describe, expect, it } from "vitest";
import { ABOUT_PORTRAIT_OPTIONS, EXPERIENCE } from "./Experience";
import { BOTTOM_CAPTION_CLASS } from "./AndrePhoto";

describe("Experience About section", () => {
  it("uses a static, mode-aware portrait composition in the About section", () => {
    expect(ABOUT_PORTRAIT_OPTIONS).toEqual({
      hoverFlip: false,
      labelPosition: "bottom-bar",
      sparklePlacement: "top-right",
    });
  });

  it("anchors the About caption at the image bottom without a visible border", () => {
    expect(BOTTOM_CAPTION_CLASS).toContain("inset-x-0");
    expect(BOTTOM_CAPTION_CLASS).toContain("bottom-0");
    expect(BOTTOM_CAPTION_CLASS).not.toContain("border");
  });

  it("uses the requested Lead WordPress Frontend Developer role and corrected Lead wording", () => {
    const jupitrRole = EXPERIENCE.find((experience) => experience.period === "Oct 2024 — Jan 2026");

    expect(jupitrRole?.role).toBe("Lead WordPress Frontend Developer");
    expect(jupitrRole?.points).toContain("Lead the frontend development team — managed workflow and delegated tasks.");
    expect(EXPERIENCE.flatMap((experience) => experience.points).some((point) => point.startsWith("Led"))).toBe(false);
  });
});
