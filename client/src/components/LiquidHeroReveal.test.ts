import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const source = readFileSync(new URL('./LiquidHeroReveal.tsx', import.meta.url), 'utf8');

describe('Lumora-style Hero liquid reveal', () => {
  it('uses a large pointer-following feathered image mask instead of particle effects', () => {
    expect(source).toContain('"--liquid-radius": "clamp(13rem, 26vw, 29rem)"');
    expect(source).toContain('radial-gradient(ellipse calc(var(--liquid-radius) * 0.82) var(--liquid-radius) at var(--liquid-x) var(--liquid-y)');
    expect(source).not.toContain('particle');
  });

  it('keeps the reveal photo hidden before entering the Hero and softly fades it on pointer entry', () => {
    expect(source).toContain('active ? "opacity-[0.86] scale-100" : "opacity-0 scale-[0.985]"');
    expect(source).toContain('transition-[opacity,transform] duration-500 ease-out');
  });
});
