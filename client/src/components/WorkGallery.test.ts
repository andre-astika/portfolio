import { describe, expect, it } from "vitest";
import { PROJECTS, WORK_IMAGE_CLASS } from "./WorkGallery";

describe("WorkGallery project data", () => {
  it("keeps the featured portfolio projects in the intended order", () => {
    expect(PROJECTS.map((project) => project.title)).toEqual([
      "Digital Service",
      "Agency Client Website",
      "Cultural Campaign Website",
      "E-Invitation Website",
      "Invitation Branding Suite",
    ]);
  });

  it("uses managed portfolio images and includes requested responsive-web metadata", () => {
    expect(PROJECTS.slice(1).every((project) => project.image.includes("/manus-storage/portfolio-"))).toBe(true);
    expect(PROJECTS[1].tag).toContain("Responsive Web");
    expect(PROJECTS[1].description).toContain("responsive");
    expect(PROJECTS[2].tag).toContain("Responsive Web");
    expect(PROJECTS[2].description).toContain("responsive");
  });

  it("uses a crisp, dark, high-contrast monochrome treatment for the Invitation Branding Suite image", () => {
    expect(PROJECTS[4].imageFilter).toBe("grayscale(100%) brightness(0.82) contrast(1.48)");
  });

  it("keeps project images cover-fitted without hover zoom or image-filter motion", () => {
    expect(WORK_IMAGE_CLASS).toContain("object-cover");
    expect(WORK_IMAGE_CLASS).not.toContain("group-hover:scale");
    expect(WORK_IMAGE_CLASS).not.toContain("group-hover:contrast");
  });

  it("adds the Digital Service project with its featured asset and link", () => {
    const project = PROJECTS[0];

    expect(project).toMatchObject({
      year: "2026",
      title: "Digital Service",
      tag: "Web Design · Web Development · Graphic Design",
      link: "https://andre-astika.github.io/algorhythm-works/",
    });
    expect(project.image).toContain("/manus-storage/algorhythm-works-website-device_e1029af2.webp");
    expect(project.description).toContain("web design, web development, and graphic design");
    expect(project.stats).toEqual(["Web design", "Web development", "Graphic design"]);
  });
});
