import { describe, expect, it } from "vitest";
import { PROJECTS, WORK_CATEGORY_CLASS, WORK_GALLERY_VIEWPORT_CLASS, WORK_IMAGE_CLASS, WORK_META_CLASS } from "./WorkGallery";

describe("WorkGallery project data", () => {
  it("keeps the featured portfolio projects in the intended order", () => {
    expect(PROJECTS.map((project) => project.title)).toEqual([
      "Digital Service",
      "Brand Guidelines",
      "Agency Client Website",
      "Cultural Campaign Website",
      "E-Invitation Website",
    ]);
  });

  it("uses managed portfolio images and includes requested responsive-web metadata", () => {
    expect(PROJECTS.every((project) => project.image.includes("/manus-storage/"))).toBe(true);
    expect(PROJECTS[2].tag).toContain("Responsive Web");
    expect(PROJECTS[2].description).toContain("responsive");
    expect(PROJECTS[3].tag).toContain("Responsive Web");
    expect(PROJECTS[3].description).toContain("responsive");
  });

  it("keeps project images cover-fitted without hover zoom or image-filter motion", () => {
    expect(WORK_IMAGE_CLASS).toContain("object-cover");
    expect(WORK_IMAGE_CLASS).not.toContain("group-hover:scale");
    expect(WORK_IMAGE_CLASS).not.toContain("group-hover:contrast");
  });

  it("keeps project links clickable with right-aligned metadata and no grab cursor", () => {
    expect(WORK_META_CLASS).toContain("justify-between");
    expect(WORK_GALLERY_VIEWPORT_CLASS).not.toContain("cursor-grab");
    expect(WORK_GALLERY_VIEWPORT_CLASS).not.toContain("cursor-grabbing");
  });

  it("adds the Digital Service project with its featured asset and link", () => {
    const project = PROJECTS[0];

    expect(project).toMatchObject({
      year: "2026",
      title: "Digital Service",
      tag: "Web Design · Web Development · Graphic Design",
      link: "https://algorhythm-works.vercel.app/",
    });
    expect(project.image).toContain("/manus-storage/algorhythm-works-website-device_e1029af2.webp");
    expect(project.description).toContain("web design, web development, and graphic design");
    expect(project.stats).toEqual(["Web design", "Web development", "Graphic design"]);
  });

  it("adds Brand Guidelines as the second project with a featured asset and link", () => {
    const project = PROJECTS[1];

    expect(project).toMatchObject({
      index: "02",
      title: "Brand Guidelines",
      tag: "WEBSITE · Brand Identity · Visual System · Guidelines",
      link: "https://algorhythm-works-brand-guidelines.vercel.app/",
    });
    expect(project.image).toContain("/manus-storage/algorhythm-works-mockup_119ff09f.jpg");
    expect(project.description).toContain("logo rules");
    expect(project.stats).toEqual(["Brand identity", "Visual system"]);
  });

  it("links the Cultural Campaign Website to its live project", () => {
    expect(PROJECTS[3].link).toBe("https://batur2026.com/");
  });

  it("removes the 2026 stat label from E-Invitation Website", () => {
    expect(PROJECTS[4].stats).toEqual(["WordPress", "Responsive web"]);
  });

  it("matches category text sizing to the View project link", () => {
    expect(WORK_CATEGORY_CLASS).toContain("text-[10px]");
    expect(WORK_META_CLASS).toContain("justify-between");
  });
});
