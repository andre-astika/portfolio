import { describe, expect, it } from "vitest";
import { PROJECTS } from "./WorkGallery";

describe("WorkGallery project data", () => {
  it("keeps the four requested portfolio projects in the intended order", () => {
    expect(PROJECTS.map((project) => project.title)).toEqual([
      "Invitation Branding Suite",
      "E-Invitation Website",
      "Agency Client Website",
      "Cultural Campaign Website",
    ]);
  });

  it("uses managed portfolio images and includes WordPress for the e-invitation project", () => {
    expect(PROJECTS.every((project) => project.image.includes("/manus-storage/portfolio-"))).toBe(true);
    expect(PROJECTS[1]).toMatchObject({
      tag: "Website · WordPress",
    });
    expect(PROJECTS[1].description).toContain("WordPress");
  });
});
