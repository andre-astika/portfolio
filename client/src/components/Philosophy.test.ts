import { describe, expect, it } from "vitest";
import {
  PHILOSOPHY_PRIMARY_CLASS,
  PHILOSOPHY_PRIMARY_PHRASE,
  PHILOSOPHY_REMAINDER,
  PHILOSOPHY_REMAINDER_CLASS,
} from "./Philosophy";

describe("Philosophy statement", () => {
  it("restores the original display treatment for both statement lines", () => {
    expect(PHILOSOPHY_PRIMARY_PHRASE).toBe("Design is what remains");
    expect(PHILOSOPHY_PRIMARY_CLASS).toContain("font-display");
    expect(PHILOSOPHY_PRIMARY_CLASS).not.toContain("font-script-accent");
    expect(PHILOSOPHY_REMAINDER).toBe("when nothing else can be taken away.");
    expect(PHILOSOPHY_REMAINDER_CLASS).toContain("font-display");
    expect(PHILOSOPHY_REMAINDER_CLASS).not.toContain("font-script-accent");
  });

  it("uses separate display lines with original editorial spacing", () => {
    expect(PHILOSOPHY_PRIMARY_CLASS).toContain("block");
    expect(PHILOSOPHY_REMAINDER_CLASS).toContain("block");
    expect(PHILOSOPHY_REMAINDER_CLASS).toContain("mt-3");
    expect(PHILOSOPHY_REMAINDER_CLASS).toContain("md:mt-5");
  });
});
