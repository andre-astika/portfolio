import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const source = readFileSync(new URL('./Home.tsx', import.meta.url), 'utf8');

describe('conditional SplashCursor mount', () => {
  it('mounts the original WebGL SplashCursor using the active theme color', () => {
    expect(source).toContain('import SplashCursor from "@/components/SplashCursor";');
    expect(source).toContain('<SplashCursor');
    expect(source).toContain('COLOR={weekend ? "#000000" : "#ffffff"}');
    expect(source).toContain('INK_MODE={weekend}');
  });
});
