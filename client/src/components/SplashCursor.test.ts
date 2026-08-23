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

describe("SplashCursor WebGL fallback", () => {
  it("does not initialize WebGL extensions when the browser returns no context", () => {
    expect(splashCursorSource).toContain("const webglContext = getWebGLContext(canvas);");
    expect(splashCursorSource).toContain("if (!webglContext) return mountCssSplashFallback();");
    expect(splashCursorSource).toContain("if (!gl) return null;");
  });

  it("uses a visual fallback instead of removing the cursor experience when WebGL is unavailable", () => {
    expect(splashCursorSource).toContain("if (!webglContext) return mountCssSplashFallback();");
    expect(splashCursorSource).toContain("function mountCssSplashFallback()");
    expect(splashCursorSource).toContain("splash-cursor-fallback-particle");
  });

  it("keeps white developer splashes and black weekend splashes", () => {
    expect(homeSource).toContain('COLOR={weekend ? "#000000" : "#ffffff"}');
    expect(homeSource).toContain("INK_MODE={weekend}");
  });
});
