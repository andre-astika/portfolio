import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const source = (file: string) =>
  readFileSync(new URL(`./${file}`, import.meta.url), "utf8");

describe("tablet and mobile section layout", () => {
  it("uses the requested mobile Work and Case Studies spacing", () => {
    expect(source("WorkGallery.tsx")).toContain("container pb-0 pt-12 md:pb-8 md:pt-32");
    expect(source("WorkGallery.tsx")).toContain("gap-6 px-6 py-12");
    expect(source("CaseStudies.tsx")).toContain("container px-6 py-12 md:py-32 lg:px-8");
    expect(source("CaseStudies.tsx")).toContain("-right-5 -bottom-8");
  });

  it("keeps Contact single-column on mobile, three-column from tablet, and updates Experience tablet geometry", () => {
    expect(source("Contact.tsx")).toContain("mt-12 grid grid-cols-1");
    expect(source("Contact.tsx")).toContain("md:grid-cols-3");
    expect(source("Experience.tsx")).toContain("md:grid-cols-[0.8fr_1.22fr]");
    expect(source("Experience.tsx")).toContain("grid gap-2");
  });

  it("uses the requested all-device Hero crop and mobile Work spacing", () => {
    expect(source("LiquidHeroReveal.tsx")).toContain("object-[80%_50%]");
    const css = readFileSync(new URL("../index.css", import.meta.url), "utf8");
    expect(css).toContain(".container {\n    max-width: unset;");
    expect(css).toContain("#work > .container {\n    padding: 3rem 1.5rem 0;");
  });
});
