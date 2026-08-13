/* NOIR KINETIC — work section: horizontal-scrolling editorial project showcase
   driven by vertical scroll. Harsh grayscale crops, giant index numerals,
   type/image collisions, magazine-style metadata. See ideas.md Style Decisions. */
import { useEffect, useRef, useState } from "react";
import { useRevealObserver } from "@/hooks/useKinetic";

const PROJECTS = [
  {
    index: "01",
    year: "2026",
    title: "Invitation Branding Suite",
    tag: "Brand · Print · Web",
    image: "/manus-storage/project-invite_8162f19b.png",
    description:
      "Logo, invitation card, and a custom e-invitation website — one identity, three surfaces, shipped as a single system.",
    stats: ["3 deliverables", "1 identity", "2026"],
  },
  {
    index: "02",
    year: "2026",
    title: "Logo & E-Invitation Website",
    tag: "Logo · Website",
    image: "/manus-storage/project-web_6efabdbf.png",
    description:
      "Custom logo design plus a modern e-invitation site. Visual elegance, flawless function — desktop to pocket.",
    stats: ["Logo design", "Full website", "2026"],
  },
  {
    index: "03",
    year: "2022 — 26",
    title: "Agency Client Websites",
    tag: "Frontend · WordPress · Next.js",
    image: "/manus-storage/project-brand_b5d041e3.png",
    description:
      "10–20 sites shipped per year for international agency clients. Headless Next.js, Sanity, custom WordPress — each build a different performance puzzle.",
    stats: ["60+ sites shipped", "10–20 / yr", "4 yrs"],
  },
];

function SpotlightCard({ project, i }: { project: (typeof PROJECTS)[number]; i: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--sx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--sy", `${e.clientY - rect.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <a
      ref={cardRef}
      href="#contact"
      data-cursor
      data-cursor-label="TALK"
      className="group relative flex w-[86vw] shrink-0 flex-col border border-white/10 bg-[oklch(0.19_0_0)] md:w-[46vw]"
    >
      {/* overlapping index numeral colliding with image */}
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="aspect-[4/3] w-full object-cover transition-all duration-700 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.05] group-hover:contrast-[1.15]"
          style={{ filter: "grayscale(100%) contrast(1.2)" }}
          loading="lazy"
        />
        <span
          className="font-display pointer-events-none absolute -bottom-6 left-4 select-none text-[9rem] font-black leading-none text-white/15 mix-blend-difference md:text-[12rem]"
          aria-hidden="true"
        >
          {project.index}
        </span>
        <span className="font-label absolute right-4 top-4 border border-white/30 bg-black/60 px-2.5 py-1 text-[9px] uppercase tracking-[0.3em] text-white backdrop-blur-sm">
          {project.year}
        </span>
      </div>

      <div className="flex flex-col gap-4 p-6 md:p-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40">
            (Project) — {project.tag}
          </span>
        </div>
        <h3 className="font-display text-3xl font-black uppercase leading-[0.95] tracking-tight text-white transition-colors duration-300 group-hover:text-silver-gradient md:text-4xl">
          {project.title}
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-white/55">{project.description}</p>
        <div className="flex gap-6 border-t border-white/10 pt-4">
          {project.stats.map((s) => (
            <span key={s} className="font-label text-[9px] uppercase tracking-[0.2em] text-white/40">
              {s}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function WorkGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [pinned, setPinned] = useState(false);
  const [progress, setProgress] = useState(0);
  useRevealObserver();

  /* Horizontal scroll: pin the section and translate the track while scrolling */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let raf = 0;
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      const sectionH = section.offsetHeight;
      const raw = -rect.top / (sectionH - viewH);
      const p = Math.min(1, Math.max(0, raw));
      const trackWidth = track.scrollWidth - window.innerWidth;
      track.style.transform = `translate3d(${-p * trackWidth}px, 0, 0)`;
      setPinned(p > 0.01 && p < 0.99);
      setProgress(p);
    };
    const tick = () => {
      onScroll();
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative bg-[oklch(0.15_0_0)]">
      {/* giant clipped numeral bleeding off the right edge */}
      <div
        className="font-display pointer-events-none select-none absolute -right-10 top-0 text-[22rem] font-black leading-none text-white/[0.05] md:text-[26rem]"
        aria-hidden="true"
      >
        02
      </div>

      <div className="container pb-8 pt-24 md:pt-32">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-label mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-white/45">
              <span className="text-white/30">✦</span> (Selected) — Featured projects
            </p>
            <h2 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-7xl">
              The
              <br />
              <span className="text-stroke">work</span>
              <span className="relative ml-4 inline-block align-middle text-2xl text-white/40 md:text-3xl">✦</span>
            </h2>
          </div>
          <p className="font-label max-w-sm text-[11px] uppercase leading-relaxed tracking-[0.15em] text-white/40">
            Scroll ↓ to move sideways — every card is real client work, shipped and in the wild.
          </p>
        </div>

        {/* progress bar */}
        <div className="mt-10 h-px w-full bg-white/10">
          <div
            className="h-px bg-white/70 transition-[width] duration-150"
            style={{ width: `${Math.min(100, progress * 100 + 8)}%` }}
          />
        </div>
      </div>

      <div className="overflow-x-clip" style={{ pointerEvents: pinned ? "none" : "auto" }}>
        <div
          ref={trackRef}
          className="flex gap-10 px-[max(1rem,calc((100vw-1280px)/2+2rem))] pb-28 pt-16 md:gap-14"
        >
          {PROJECTS.map((p, i) => (
            <div
              key={p.index}
              className="reveal w-full max-w-[46rem] shrink-0"
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <SpotlightCard project={p} i={i} />
            </div>
          ))}

          {/* closing editorial card */}
          <div className="reveal flex w-full max-w-[28rem] shrink-0 flex-col justify-between border border-dashed border-white/25 p-10">
            <div>
              <span className="font-display mb-8 block text-[5rem] font-black leading-none text-white/10" aria-hidden="true">✦</span>
              <p className="font-serif-accent text-2xl italic leading-snug text-white/80 md:text-3xl">
                "Every pixel has a job. I just make sure it does it well."
              </p>
              <p className="font-label mt-6 text-[10px] uppercase tracking-[0.3em] text-white/40">
                — Andre Astika, Bali
              </p>
            </div>
            <a
              href="#contact"
              data-cursor
              className="font-label mt-10 inline-flex items-center gap-3 border border-white/25 px-5 py-3 text-[11px] uppercase tracking-[0.25em] text-white/80 transition-all duration-200 hover:bg-white hover:text-black"
            >
              Brief a project <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
