import { afterEach, describe, expect, it, vi } from "vitest";
import { resetArticleScrollPosition } from "./articleScroll";

describe("resetArticleScrollPosition", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("resets immediately without inheriting the global smooth-scroll behavior", () => {
    const scrollTo = vi.fn();
    const style = { scrollBehavior: "smooth" };

    vi.stubGlobal("window", {
      scrollTo,
    });
    vi.stubGlobal("document", { documentElement: { style } });

    resetArticleScrollPosition();

    expect(scrollTo).toHaveBeenCalledWith(0, 0);
    expect(scrollTo).toHaveBeenCalledTimes(1);
    expect(style.scrollBehavior).toBe("smooth");
  });
});
