import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const fluidHeroSource = readFileSync(
  new URL("./FluidHeroBg.tsx", import.meta.url),
  "utf8",
);

describe("Lumora smoke Hero layer", () => {
  it("keeps the smoke canvas above the Hero photography but below the content", () => {
    expect(fluidHeroSource).toContain('absolute inset-0 z-[2] h-full w-full');
    expect(fluidHeroSource).toContain('absolute inset-0 z-0 overflow-hidden');
    expect(fluidHeroSource).toContain('lumora-smoke-veil pointer-events-none absolute inset-0 z-[3]');
    expect(fluidHeroSource).toContain('absolute inset-0 z-[4] overflow-hidden');
  });

  it("uses white smoke in Developer Mode and black ink smoke in Weekend Mode", () => {
    expect(fluidHeroSource).toContain("uniform float inkMode;");
    expect(fluidHeroSource).toContain("inkMode > 0.5 ? vec3(0.0) : vec3(smoke)");
    expect(fluidHeroSource).toContain("weekend ? 1 : 0");
  });

  it("fails safely when the browser cannot initialize the Hero WebGL effect", () => {
    expect(fluidHeroSource).toContain("if (!gl) return removeSmokeTrail;");
    expect(fluidHeroSource).toContain("try {");
    expect(fluidHeroSource).toContain("p = makePrograms(gl);");
  });

  it("emits a soft smoke trail instead of a ring or bubble fallback", () => {
    expect(fluidHeroSource).toContain("emitSmokePuff");
    expect(fluidHeroSource).toContain("createSmokePuff");
    expect(fluidHeroSource).toContain('puff.className = "lumora-smoke-puff"');
    expect(fluidHeroSource).not.toContain("splash-cursor-fallback");
  });
});
