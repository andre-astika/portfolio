import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const indexHtml = readFileSync(new URL("../index.html", import.meta.url), "utf8");

describe("portfolio document metadata", () => {
  it("defines a relevant title and description", () => {
    expect(indexHtml).toContain("Andre Astika — Digital Designer &amp; Frontend Developer");
    expect(indexHtml).toContain("Bali-based frontend developer, website designer, and graphic designer");
  });

  it("uses the sparkle favicon as the social sharing image", () => {
    const favicon = "https://andrefolio-f6gtj9q8.manus.space/manus-storage/andre-portfolio-padded-sparkle-favicon_b4bdeb5a.png";
    expect(indexHtml).toContain(`<link rel="icon" type="image/png" href="${favicon}" />`);
    expect(indexHtml).toContain(`<meta property="og:image" content="${favicon}" />`);
    expect(indexHtml).toContain(`<meta name="twitter:image" content="${favicon}" />`);
  });

  it("declares the GitHub Pages canonical URL", () => {
    expect(indexHtml).toContain('<link rel="canonical" href="https://andre-astika.github.io/portfolio/" />');
  });
});
