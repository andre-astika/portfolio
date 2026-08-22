import { describe, expect, it } from "vitest";
import {
  PHILOSOPHY_STATEMENT,
  PHILOSOPHY_STATEMENT_CLASS,
} from "./Philosophy";

describe("Philosophy statement", () => {
  it("uses the complete statement as one display phrase", () => {
    expect(PHILOSOPHY_STATEMENT).toBe("Design is what remains when nothing else can be taken away.");
    expect(PHILOSOPHY_STATEMENT_CLASS).toContain("font-display");
    expect(PHILOSOPHY_STATEMENT_CLASS).not.toContain("font-script-accent");
  });

  it("does not force a structural line break within the statement", () => {
    expect(PHILOSOPHY_STATEMENT_CLASS).not.toContain("block");
    expect(PHILOSOPHY_STATEMENT_CLASS).not.toContain("mt-");
  });
});
