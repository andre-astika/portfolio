import { describe, expect, it } from "vitest";
import { getPhilosophyReadingProgress } from "./philosophyProgress";

describe("getPhilosophyReadingProgress", () => {
  it("returns a cumulative percentage for the active principle", () => {
    expect(getPhilosophyReadingProgress(0, 3)).toBeCloseTo(33.333, 2);
    expect(getPhilosophyReadingProgress(1, 3)).toBeCloseTo(66.667, 2);
    expect(getPhilosophyReadingProgress(2, 3)).toBe(100);
  });

  it("keeps progress within a valid range", () => {
    expect(getPhilosophyReadingProgress(-1, 3)).toBeCloseTo(33.333, 2);
    expect(getPhilosophyReadingProgress(12, 3)).toBe(100);
    expect(getPhilosophyReadingProgress(0, 0)).toBe(0);
  });
});
