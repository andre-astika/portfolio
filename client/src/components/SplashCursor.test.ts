import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const source = readFileSync(new URL('./SplashCursor.jsx', import.meta.url), 'utf8');

describe('SplashCursor renderer capability handling', () => {
  it('keeps the null-WebGL guard before reading WebGL extensions', () => {
    expect(source).toMatch(/if \(!gl\) \{\s+return \{ gl: null, ext: \{\} \};\s+\}/);
  });

  it('does not replace the original fluid renderer with a particle fallback', () => {
    expect(source).not.toContain('startCanvas2DFallback');
    expect(source).not.toContain('CANVAS_FALLBACK_MAX_PARTICLES');
    expect(source).toMatch(/if \(!gl \|\| !ext\.formatRGBA \|\| !ext\.formatRG \|\| !ext\.formatR \|\| !ext\.halfFloatTexType\) \{\s+return \(\) => \{\s+isActive = false;\s+\};\s+\}/);
  });

  it('keeps the original WebGL renderer marked while it is active', () => {
    expect(source).toContain("canvas.dataset.splashRenderer = 'webgl'");
    expect(source).toContain('delete canvas.dataset.splashRenderer;');
  });
});
