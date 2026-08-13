/* NOIR KINETIC — work section: FULLY PINNED horizontal gallery.
   The section locks in place while scrolling; wheel/trackpad input drives the
   track sideways. Only when the track reaches its end does the page unlock and
   continue to the next section. Wheel events are captured via passive:false on
   the section. Hovering a card lifts it and reveals its brief description. */
import { useCallback, useEffect, useRef, useState } from "react";
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
      className="group relative flex w-[86vw] shrink-0 flex-col border border-white/10 bg-[oklch(0.19_0_0)] transition-all duration-500 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-3 hover:border-white/40 md:w-[46vw]"
    >
      {/* image block */}
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

        {/* hover description reveal */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0">
          <p className="font-label mb-1.5 text-[9px] uppercase tracking-[0.3em] text-white/60">
            ({project.index}) — {project.tag}
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-white">{project.description}</p>
        </div>
      </div>

      {/* meta block */}
      <div className="flex flex-col gap-4 p-6 md:p-8">
        <h3 className="font-display text-2xl font-black uppercase leading-[0.95] tracking-tight text-white transition-colors duration-300 group-hover:text-silver-gradient md:text-3xl">
          {project.title}
        </h3>
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
  const sectionRef = useRef<HTMLElement>(null);
  const trackZoneRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressLabelRef = useRef<HTMLSpanElement>(null);
  const pinnedRef = useRef(false);
  const [locked, setLocked] = useState(false);
  const [progress, setProgress] = useState(0);
  useRevealObserver();

  const PADDING_X = 40; // extra px around the track

  const applyProgress = useCallback((p: number) => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progressBar = progressRef.current;
    const progressLabel = progressLabelRef.current;
    if (!section || !track) return;
    const trackWidth = Math.max(0, track.scrollWidth - window.innerWidth);
    track.style.transform = `translate3d(${-p * trackWidth}px, 0, 0)`;
    if (progressBar) progressBar.style.width = `${Math.min(100, p * 100 + 6)}%`;
    if (progressLabel) progressLabel.textContent = `${Math.round(p * 100)}%`;
    setProgress(p);
    const wasPinned = pinnedRef.current;
    const isPinned = p > 0.002 && p < 0.998;
    pinnedRef.current = isPinned;
    if (wasPinned !== isPinned) setLocked(isPinned);
  }, []);

  /* Wheel → sideways while pinned. Captures events (passive:false) so the page
     doesn't scroll vertically until the track has reached the end. */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const trackZone = trackZoneRef.current;
    if (!trackZone) return;

    const SENSITIVITY = 0.0018; // fraction of track per wheel delta
    let current = 0;
    let raf = 0;

    const update = (raw: number) => {
      const p = Math.min(1, Math.max(0, raw));
      if (Math.abs(p - current) > 0.0005) {
        current = p;
        applyProgress(current);
      }
    };

    const onWheel = (e: WheelEvent) => {
      const atStart = current <= 0.002 && e.deltaY <= 0;
      const atEnd = current >= 0.998 && e.deltaY >= 0;
      if (atStart || atEnd) return; // let the page scroll naturally
      e.preventDefault();
      const step = (e.deltaY + e.deltaX * 0.5) * SENSITIVITY;
      update(current + step);
    };

    trackZone.addEventListener("wheel", onWheel, { passive: false });
    const tick = () => {
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", () => update(current));
    return () => {
      trackZone.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", () => {});
    };
  }, [applyProgress]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-[oklch(0.15_0_0)]"
      style={{ minHeight: locked ? "100vh" : undefined }}
    >
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
            Pinned while you browse — scroll ↓ to move sideways. At 100% the lock releases.
          </p>
        </div>

        {/* progress bar */}
        <div className="mt-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10">
            <div
              ref={progressRef}
              className="h-px bg-white/70 transition-[width] duration-150"
              style={{ width: "6%" }}
            />
          </div>
          <span
            ref={progressLabelRef}
            className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40"
          >
            00%
          </span>
        </div>
      </div>

      {/* pinned track: overflows beyond viewport so it can translate left */}
      <div ref={trackZoneRef} className="overflow-x-clip">
        <div
          ref={trackRef}
          className="flex gap-10 px-[max(1rem,calc((100vw-1280px)/2+2rem))] pb-28 pt-16 md:gap-14"
          style={{ width: "max-content", willChange: "transform" }}
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
              <span className="font-display mb-8 block text-[5rem] font-black leading-none text-white/10" aria-hidden="true">
                ✦
              </span>
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
