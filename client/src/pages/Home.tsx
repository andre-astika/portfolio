/*
  NOIR KINETIC — single-page portfolio for Andre Astika.
  Sections: Hero → ticker → Work (horizontal gallery) → Case Studies → Philosophy →
  Experience → Testimonials → Contact. All motion via useKinetic hooks.
*/
import Cursor from "@/components/Cursor";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WorkGallery from "@/components/WorkGallery";
import CaseStudies from "@/components/CaseStudies";
import Philosophy from "@/components/Philosophy";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { useRevealObserver } from "@/hooks/useKinetic";

const TICKER_A = ["Web Design", "Web Development", "Graphic Design", "Frontend Architecture", "UI/UX Sense", "QA & Tooling"];
const TICKER_B = ["WordPress", "Next.js", "Headless CMS", "Tailwind", "Sanity", "Photoshop"];

export default function Home() {
  useRevealObserver();

  return (
    <div className="grain relative min-h-screen bg-background">
      <Cursor />
      <Nav />

      <main>
        <Hero />
        <Marquee items={TICKER_A} />
        <WorkGallery />
        <CaseStudies />
        <Marquee items={TICKER_B} reverse />
        <Philosophy />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
}
