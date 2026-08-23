import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const splashCursorSource = readFileSync(
  new URL("./SplashCursor.jsx", import.meta.url),
  "utf8",
);

describe("SplashCursor WebGL fallback", () => {
  it("does not initialize WebGL extensions when the browser returns no context", () => {
    expect(splashCursorSource).toContain("const webglContext = getWebGLContext(canvas);");
    expect(splashCursorSource).toContain("if (!webglContext) return;");
    expect(splashCursorSource).toContain("if (!gl) return null;");
  });
});
