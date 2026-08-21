import { describe, expect, it } from "vitest";
import {
  PHILOSOPHY_REMAINDER,
  PHILOSOPHY_REMAINDER_CLASS,
  PHILOSOPHY_SCRIPT_CLASS,
  PHILOSOPHY_SCRIPT_PHRASE,
} from "./Philosophy";

describe("Philosophy statement", () => {
  it("limits Pinyon Script to the requested opening phrase", () => {
    expect(PHILOSOPHY_SCRIPT_PHRASE).toBe("Design is what remains");
    expect(PHILOSOPHY_SCRIPT_CLASS).toContain("font-script-accent");
    expect(PHILOSOPHY_SCRIPT_CLASS).toContain("text-white");
    expect(PHILOSOPHY_REMAINDER).toBe("when nothing else can be taken away.");
    expect(PHILOSOPHY_REMAINDER_CLASS).toContain("font-display");
    expect(PHILOSOPHY_REMAINDER_CLASS).not.toContain("font-script-accent");
  });

  it("uses a measured script scale and leading at mobile widths", () => {
    expect(PHILOSOPHY_SCRIPT_CLASS).toContain("text-[4rem]");
    expect(PHILOSOPHY_SCRIPT_CLASS).toContain("leading-[0.74]");
  });
});
