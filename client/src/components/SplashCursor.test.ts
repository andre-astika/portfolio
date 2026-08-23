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
    expect(splashCursorSource).toContain("if (!webglContext) return;");
    expect(splashCursorSource).toContain("if (!gl) return null;");
  });

  it("does not replace the approved fluid cursor with a bubble-style fallback", () => {
    expect(splashCursorSource).not.toContain("mountCssSplashFallback");
    expect(splashCursorSource).not.toContain("splash-cursor-fallback");
  });

  it("keeps white developer splashes and black weekend splashes", () => {
    expect(homeSource).toContain('COLOR={weekend ? "#000000" : "#ffffff"}');
    expect(homeSource).toContain("INK_MODE={weekend}");
  });
});
