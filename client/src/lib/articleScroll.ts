export function resetArticleScrollPosition() {
  window.scrollTo(0, 0);

  // Also run on the next frame to override session-history restoration when a
  // visitor reopens a study URL they had previously read.
  const frame = window.requestAnimationFrame(() => window.scrollTo(0, 0));
  return () => window.cancelAnimationFrame(frame);
}
