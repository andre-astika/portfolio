import { describe, expect, it } from "vitest";
import { THEME_CONTROL_HINT } from "./themeControl";

describe("THEME_CONTROL_HINT", () => {
  it("clearly explains the Developer and Weekend color control", () => {
    expect(THEME_CONTROL_HINT).toBe("Switch color theme");
  });
});
