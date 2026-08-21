import { describe, expect, it } from "vitest";
import { PROJECTS } from "./WorkGallery";

describe("WorkGallery project data", () => {
  it("keeps the four requested portfolio projects in the intended order", () => {
    expect(PROJECTS.map((project) => project.title)).toEqual([
      "Agency Client Website",
      "Cultural Campaign Website",
      "E-Invitation Website",
      "Invitation Branding Suite",
    ]);
  });

  it("uses managed portfolio images and includes requested responsive-web metadata", () => {
    expect(PROJECTS.every((project) => project.image.includes("/manus-storage/portfolio-"))).toBe(true);
    expect(PROJECTS[0].tag).toContain("Responsive Web");
    expect(PROJECTS[0].description).toContain("responsive");
    expect(PROJECTS[1].tag).toContain("Responsive Web");
    expect(PROJECTS[1].description).toContain("responsive");
  });

  it("uses a crisp, dark, high-contrast monochrome treatment for the Invitation Branding Suite image", () => {
    expect(PROJECTS[3].imageFilter).toBe("grayscale(100%) brightness(0.82) contrast(1.48)");
  });
});
