import { describe, expect, it } from "vitest";
import { ABOUT_PORTRAIT_OPTIONS, ABOUT_SUMMARY, EXPERIENCE } from "./Experience";
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

  it("uses the supplied CV profile summary", () => {
    expect(ABOUT_SUMMARY).toContain("Frontend Web Developer with 3+ years of experience");
    expect(ABOUT_SUMMARY).toContain("Expert Traditional WordPress Developer");
    expect(ABOUT_SUMMARY).toContain("Modern Next.js Specialist");
    expect(ABOUT_SUMMARY).toContain("Headless WordPress");
    expect(ABOUT_SUMMARY).toContain("GraphQL");
    expect(ABOUT_SUMMARY).toContain("MDX");
    expect(ABOUT_SUMMARY).toContain("ChatGPT, Gemini, Claude");
  });

  it("uses the supplied CV roles, employers, periods, and responsibilities", () => {
    const currentRole = EXPERIENCE.find((experience) => experience.period === "Jul 2026 — Present");
    const jupitrRole = EXPERIENCE.find((experience) => experience.period === "Oct 2024 — Jan 2026");
    const freelanceRole = EXPERIENCE.find((experience) => experience.period === "2022 — Present");

    expect(currentRole?.role).toBe("Frontend Web Developer (Headless CMS & Next.js)");
    expect(currentRole?.points).toContain(
      "Engineer Headless WordPress architecture by connecting Next.js applications to PHP/MySQL content systems through GraphQL."
    );
    expect(jupitrRole?.role).toBe("Lead Frontend WordPress Developer");
    expect(jupitrRole?.points).toContain(
      "Led the frontend team in building, maintaining, and optimising 10+ web projects annually for client business operations."
    );
    expect(freelanceRole).toMatchObject({
      role: "Freelance WEBSITE & GRAPHIC DESIGNER",
      company: "Self-employed",
    });
  });
});
