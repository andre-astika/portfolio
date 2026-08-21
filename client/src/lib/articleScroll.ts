export function resetArticleScrollPosition() {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  // The portfolio uses smooth scrolling globally. Disable it only for this
  // route-entry reset so the Hero is painted in place rather than sliding up.
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  root.style.scrollBehavior = previousScrollBehavior;
}
