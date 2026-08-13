export function getPhilosophyReadingProgress(activeIndex: number, principleCount: number): number {
  if (principleCount <= 0) return 0;
  const clampedIndex = Math.min(Math.max(activeIndex, 0), principleCount - 1);
  return ((clampedIndex + 1) / principleCount) * 100;
}
