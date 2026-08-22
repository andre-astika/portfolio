import { describe, expect, it } from "vitest";
import { MODE_SWITCH_DEV_ACTIVE_CLASS, MODE_SWITCH_WEEKEND_ACTIVE_CLASS } from "./Hero";

describe("Hero mode switch", () => {
  it("uses a solid background on the entire active mode button", () => {
    expect(MODE_SWITCH_DEV_ACTIVE_CLASS).toBe("bg-white text-black");
    expect(MODE_SWITCH_WEEKEND_ACTIVE_CLASS).toBe("bg-black text-white");
  });
});
