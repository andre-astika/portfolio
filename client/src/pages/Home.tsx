/*
  NOIR KINETIC — single-page portfolio for Andre Astika.
  Weekend mode keeps the same kinetic editorial system but moves the whole page
  to a warm light-paper palette through one shared theme class.
*/
import SplashCursor from "@/components/SplashCursor";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import { AndrePhotoProvider, useSiteWeekend } from "@/components/AndrePhoto";
import Hero from "@/components/Hero";
import WorkGallery from "@/components/WorkGallery";
import CaseStudies from "@/components/CaseStudies";
import Philosophy from "@/components/Philosophy";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import { useRevealObserver } from "@/hooks/useKinetic";

const TICKER_A = ["Website Development", "Website Design", "Frontend Architecture", "UI/UX Sense", "Website Responsive", "Graphic Design"];
const TICKER_B = ["WordPress", "Next.js", "Headless CMS", "Tailwind", "Sanity", "Photoshop"];

function SiteSurface() {
  const { weekend } = useSiteWeekend();

  return (
    <div className={`grain site-surface relative min-h-screen bg-background ${weekend ? "weekend-theme" : "developer-theme"}`}>
      <SplashCursor
        key={weekend ? "weekend" : "developer"}
        COLOR={weekend ? "#000000" : "#ffffff"}
        RAINBOW_MODE={false}
      />
      <Nav />

      <main>
        <Hero />
        <Marquee items={TICKER_A} />
        <WorkGallery />
        <CaseStudies />
        <Marquee items={TICKER_B} reverse />
        <Philosophy />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}

export default function Home() {
  useRevealObserver();

  return (
    <AndrePhotoProvider>
      <SiteSurface />
    </AndrePhotoProvider>
  );
}
