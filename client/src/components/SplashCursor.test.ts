import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const splashCursorSource = readFileSync(
  new URL("./SplashCursor.jsx", import.meta.url),
  "utf8",
);
const homeSource = readFileSync(
  new URL("../pages/Home.tsx", import.meta.url),
  "utf8",
);

describe("SplashCursor WebGL guard", () => {
  it("does not initialize WebGL extensions when the browser returns no context", () => {
    expect(splashCursorSource).toContain("const webglContext = getWebGLContext(canvas);");
    expect(splashCursorSource).toContain("if (!webglContext) return removeHeroFluidTrail;");
    expect(splashCursorSource).toContain("if (!gl) return null;");
  });

  it("keeps a Hero-scoped fluid trail active alongside the WebGL renderer", () => {
    expect(splashCursorSource).toContain("function mountHeroFluidTrail()");
    expect(splashCursorSource).toContain("document.getElementById('top')");
    expect(splashCursorSource).toContain("splashcursor-fluid-blob");
    expect(splashCursorSource).toContain("const removeHeroFluidTrail = mountHeroFluidTrail();");
    expect(splashCursorSource).toContain("if (!webglContext) return removeHeroFluidTrail;");
    expect(splashCursorSource).toContain("window.addEventListener('mousemove', emitFluidPuff");
  });

  it("keeps white developer splashes and black weekend splashes", () => {
    expect(homeSource).toContain('COLOR={weekend ? "#000000" : "#ffffff"}');
    expect(homeSource).toContain("INK_MODE={weekend}");
    expect(splashCursorSource).toContain("FLUID_INTENSITY = 0.72");
    expect(splashCursorSource).toContain("DENSITY_DISSIPATION = 1.25");
  });
});
