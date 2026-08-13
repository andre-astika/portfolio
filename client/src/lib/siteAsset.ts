const MANUS_PORTFOLIO_ORIGIN = "https://andrefolio-f6gtj9q8.manus.space";

/**
 * Keeps the managed Manus build using same-origin storage paths, while the
 * static GitHub Pages build reads the already-published portfolio assets from
 * the live site. This avoids copying project media into the repository.
 */
export function resolveSiteAsset(path: string, isGitHubPages = import.meta.env.VITE_GITHUB_PAGES === "true") {
  if (!isGitHubPages || !path.startsWith("/")) return path;
  return `${MANUS_PORTFOLIO_ORIGIN}${path}`;
}

export const siteAsset = (path: string) => resolveSiteAsset(path);
