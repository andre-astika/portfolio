import { afterEach, describe, expect, it, vi } from "vitest";
import { resetArticleScrollPosition } from "./articleScroll";

describe("resetArticleScrollPosition", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("resets immediately and once again after history restoration can run", () => {
    const scrollTo = vi.fn();
    const cancelAnimationFrame = vi.fn();
    let scheduledFrame: FrameRequestCallback | undefined;

    vi.stubGlobal("window", {
      scrollTo,
      requestAnimationFrame: vi.fn((callback: FrameRequestCallback) => {
        scheduledFrame = callback;
        return 17;
      }),
      cancelAnimationFrame,
    });

    const cancel = resetArticleScrollPosition();

    expect(scrollTo).toHaveBeenCalledWith(0, 0);
    scheduledFrame?.(0);
    expect(scrollTo).toHaveBeenCalledTimes(2);

    cancel();
    expect(cancelAnimationFrame).toHaveBeenCalledWith(17);
  });
});
