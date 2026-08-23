import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const source = readFileSync(new URL('./SplashCursor.jsx', import.meta.url), 'utf8');

describe('SplashCursor renderer capability handling', () => {
  it('keeps the null-WebGL guard before reading WebGL extensions', () => {
    expect(source).toMatch(/if \(!gl\) \{\s+return \{ gl: null, ext: \{\} \};\s+\}/);
  });

  it('starts a Canvas 2D fallback when the original fluid renderer cannot initialize', () => {
    expect(source).toContain('function startCanvas2DFallback');
    expect(source).toMatch(/if \(!gl \|\| !ext\.formatRGBA \|\| !ext\.formatRG \|\| !ext\.formatR \|\| !ext\.halfFloatTexType\) \{/);
    expect(source).toMatch(/const disposeFallback = startCanvas2DFallback\(canvas, \{\s+color: COLOR,\s+inkMode: INK_MODE\s+\}\);/);
    expect(source).toContain("canvas.dataset.splashRenderer = 'canvas2d'");
  });

  it('keeps the fallback theme-aware and fully disposable', () => {
    expect(source).toContain("const tint = inkMode ? { r: 0, g: 0, b: 0 } : colorFromHex(color);");
    expect(source).toContain('disposeFallback();');
  });
});
