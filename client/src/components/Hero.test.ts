import { describe, expect, it } from "vitest";
import {
  DESKTOP_DEV_MODE_LABEL,
  DESKTOP_ROLE_LABEL,
  MOBILE_DEV_MODE_LABEL,
  MOBILE_ROLE_LABEL,
  MODE_SWITCH_DEV_ACTIVE_CLASS,
  MODE_SWITCH_WEEKEND_ACTIVE_CLASS,
} from "./Hero";

describe("Hero mode switch", () => {
  it("uses a solid background on the entire active mode button", () => {
    expect(MODE_SWITCH_DEV_ACTIVE_CLASS).toBe("bg-white text-black");
    expect(MODE_SWITCH_WEEKEND_ACTIVE_CLASS).toBe("bg-black text-white");
  });

  it("uses the requested compact labels only on mobile", () => {
    expect(MOBILE_DEV_MODE_LABEL).toBe("✦ Dev Mode");
    expect(DESKTOP_DEV_MODE_LABEL).toBe("✦ Developer Mode");
    expect(MOBILE_ROLE_LABEL).toBe("Web Developer · Web Designer · Graphic Designer");
    expect(DESKTOP_ROLE_LABEL).toBe("Website Developer · Website Designer · Graphic Designer");
  });
});
