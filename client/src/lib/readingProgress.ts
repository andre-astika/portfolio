export function getReadingProgress(
  scrollY: number,
  scrollHeight: number,
  viewportHeight: number,
) {
  const scrollableDistance = Math.max(scrollHeight - viewportHeight, 1);
  const rawProgress = (scrollY / scrollableDistance) * 100;

  return Math.min(100, Math.max(0, rawProgress));
}
