import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const source = readFileSync(new URL('./SplashCursor.jsx', import.meta.url), 'utf8');

describe('SplashCursor WebGL capability guard', () => {
  it('exits cleanly when the browser cannot create a WebGL context', () => {
    expect(source).toMatch(/if \(!gl\) \{\s+return \{ gl: null, ext: \{\} \};\s+\}/);
    expect(source).toMatch(/if \(!gl\) \{\s+return \(\) => \{\s+isActive = false;\s+\};\s+\}/);
  });
});
