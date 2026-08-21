import { describe, expect, it } from "vitest";
import { THEME_MODE_TOOLTIPS } from "./themeControl";

describe("THEME_MODE_TOOLTIPS", () => {
  it("provides concise color-theme guidance for both selectable modes", () => {
    expect(THEME_MODE_TOOLTIPS).toEqual({
      dev: "Switch to Developer color theme",
      weekend: "Switch to Weekend color theme",
    });
  });
});
