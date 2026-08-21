import { describe, expect, it } from "vitest";
import { getReadingProgress } from "./readingProgress";

describe("getReadingProgress", () => {
  it("returns zero at the beginning of an article", () => {
    expect(getReadingProgress(0, 2_000, 800)).toBe(0);
  });

  it("calculates the reader position across the scrollable article distance", () => {
    expect(getReadingProgress(600, 2_000, 800)).toBe(50);
  });

  it("clamps values when the browser reports positions beyond either boundary", () => {
    expect(getReadingProgress(-100, 2_000, 800)).toBe(0);
    expect(getReadingProgress(2_000, 2_000, 800)).toBe(100);
  });
});
