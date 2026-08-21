import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import AssetLibrary from "./pages/AssetLibrary";
import ArticlePage from "./pages/ArticlePage";
import Home from "./pages/Home";

const isGitHubPagesBuild = import.meta.env.VITE_GITHUB_PAGES === "true";

function StaticAssetLibraryNotice() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[oklch(0.13_0_0)] px-6 text-white">
      <section className="max-w-lg border border-white/15 p-8">
        <p className="font-label text-[10px] uppercase tracking-[0.3em] text-white/45">Static portfolio edition</p>
        <h1 className="font-display mt-4 text-4xl font-extrabold uppercase">Asset Library unavailable</h1>
        <p className="mt-5 text-sm leading-relaxed text-white/65">
          The GitHub Pages site is a static portfolio. Asset upload, OAuth, and database-backed admin tools remain available on the Manus deployment.
        </p>
        <a href="./" className="font-label mt-7 inline-block border border-white/30 px-4 py-3 text-[10px] uppercase tracking-[0.25em]">
          Return to portfolio
        </a>
      </section>
    </main>
  );
}

function Router() {
  if (isGitHubPagesBuild && typeof window !== "undefined") {
    const fallbackPath = new URLSearchParams(window.location.search).get("p");
    if (fallbackPath && /^\/blog-[1-3]$/.test(fallbackPath)) {
      window.history.replaceState(null, "", `/portfolio${fallbackPath}`);
    }
  }

  // make sure to consider if you need authentication for certain routes
  const routes = (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/blog-1"}><ArticlePage slug="blog-1" /></Route>
      <Route path={"/blog-2"}><ArticlePage slug="blog-2" /></Route>
      <Route path={"/blog-3"}><ArticlePage slug="blog-3" /></Route>
      <Route path={"/assets"} component={isGitHubPagesBuild ? StaticAssetLibraryNotice : AssetLibrary} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );

  return isGitHubPagesBuild ? <WouterRouter base="/portfolio">{routes}</WouterRouter> : routes;
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
