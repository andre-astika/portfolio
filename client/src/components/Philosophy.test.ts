import { describe, expect, it } from "vitest";
import { PHILOSOPHY_STATEMENT, PHILOSOPHY_STATEMENT_CLASS } from "./Philosophy";

describe("Philosophy statement", () => {
  it("uses the requested Pinyon Script utility with theme-aware white source text", () => {
    expect(PHILOSOPHY_STATEMENT).toBe("Design is what remains when nothing else can be taken away.");
    expect(PHILOSOPHY_STATEMENT_CLASS).toContain("font-script-accent");
    expect(PHILOSOPHY_STATEMENT_CLASS).toContain("text-white");
  });
});
