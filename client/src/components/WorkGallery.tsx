/* NOIR KINETIC — a manually draggable horizontal Work gallery.
   Hovering a card lifts it and reveals its brief description. */
import { useEffect, useRef, useState } from "react";
import { useRevealObserver } from "@/hooks/useKinetic";
import { siteAsset } from "@/lib/siteAsset";

export const PROJECTS = [
  {
    index: "01",
    year: "2022 — 26",
    title: "Agency Client Website",
    tag: "WordPress · Next.js · Responsive Web · Web Development",
    image: siteAsset("/manus-storage/portfolio-client_5e130c11.webp"),
    description:
      "A flexible, responsive client website engineered for an agency workflow, combining WordPress content management with the speed, structure, and scalability of Next.js across every screen size.",
    stats: ["WordPress", "Next.js", "Responsive web"],
  },
  {
    index: "02",
    year: "2026",
    title: "Cultural Campaign Website",
    tag: "WordPress · Campaign Design · Responsive Web · Web Development",
    image: siteAsset("/manus-storage/portfolio-batur2026_9512c622.webp"),
    description:
      "A responsive WordPress campaign site that translates cultural storytelling into a clear digital experience, giving the programme a distinctive presence and an accessible home across every device.",
    stats: ["WordPress", "Campaign site", "Responsive web"],
  },
  {
    index: "03",
    year: "2026",
    title: "E-Invitation Website",
    tag: "Website · WordPress",
    image: siteAsset("/manus-storage/portfolio-e-invitation_1bd541f0.webp"),
    description:
      "A responsive WordPress e-invitation experience that gives guests a clear, elegant way to discover every event detail across desktop and mobile.",
    stats: ["WordPress", "Responsive web", "2026"],
  },
  {
    index: "04",
    year: "2026",
    title: "Invitation Branding Suite",
    tag: "Logo · Invitation Card · Brand · Print",
    image: siteAsset("/manus-storage/portfolio-logo-card_df167b01.webp"),
    imageFilter: "grayscale(100%) brightness(0.64) contrast(1.12)",
    description:
      "A complete visual identity from the logo through invitation cards and print pieces, built as one considered brand system with a cohesive, memorable finish.",
    stats: ["Logo system", "Print suite", "2026"],
  },
];

function SpotlightCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const cardRef = useRef<HTMLElement>(null);

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
    <article
      ref={cardRef}
      data-cursor
      data-cursor-label="TALK"
      className="group relative flex w-full shrink-0 flex-col border border-white/10 bg-[oklch(0.19_0_0)] transition-all duration-500 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-3 hover:border-white/40"
    >
      {/* image block */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <div className="relative h-full overflow-hidden">
          <img
          src={project.image}
          alt={project.title}
          draggable={false}
          className="h-full w-full object-cover transition-all duration-700 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.05] group-hover:contrast-[1.15]"
          style={{ filter: project.imageFilter ?? "grayscale(100%) contrast(1.2)" }}
          loading="lazy"
          />
          <span className="font-label absolute right-4 top-4 border border-white/30 bg-black/60 px-2.5 py-1 text-[9px] uppercase tracking-[0.3em] text-white backdrop-blur-sm">
            {project.year}
          </span>

        {/* hover description reveal */}
          <div className="work-hover-description pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0">
            <p className="font-label mb-1.5 text-[9px] uppercase tracking-[0.3em] text-white/60">
              ({project.index}) — {project.tag}
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-white">{project.description}</p>
          </div>
        </div>
        <span
          className="font-display pointer-events-none absolute -bottom-20 -left-16 z-10 select-none text-[9rem] font-black leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.42)] md:text-[12rem]"
          aria-hidden="true"
        >
          {project.index}
        </span>
      </div>

      {/* meta block */}
      <div className="flex flex-col gap-4 p-6 md:p-8">
        <h3 className="font-display text-2xl font-extrabold uppercase leading-[0.95] tracking-tight text-white transition-colors duration-300 group-hover:text-silver-gradient md:text-3xl">
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
    </article>
  );
}

export default function WorkGallery() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, didDrag: false, pointerId: 0, startX: 0, startScrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);
  useRevealObserver();

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    dragRef.current = {
      active: true,
      didDrag: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: viewport.scrollLeft,
    };
    viewport.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const viewport = viewportRef.current;
    if (!drag.active || !viewport) return;

    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 4) drag.didDrag = true;
    viewport.scrollLeft = drag.startScrollLeft - distance;
  };

  const finishDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const viewport = viewportRef.current;
    if (!drag.active || !viewport) return;

    if (viewport.hasPointerCapture(drag.pointerId)) viewport.releasePointerCapture(drag.pointerId);
    drag.active = false;
    setIsDragging(false);
  };

  const preventDraggedClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!dragRef.current.didDrag) return;
    event.preventDefault();
    event.stopPropagation();
    dragRef.current.didDrag = false;
  };

  return (
    <section id="work" className="relative bg-[oklch(0.15_0_0)]">
      <div className="container pb-8 pt-24 md:pt-32">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-label mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-white/45">
              <span className="text-white/30">✦</span> (Selected) — Featured projects
            </p>
            <h2 className="font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-white md:text-7xl">
              The <span className="text-stroke">Work</span>
              <span className="relative mb-3 ml-4 inline-block align-middle text-2xl text-white/40 md:text-3xl">✦</span>
            </h2>
          </div>
          <p className="font-label max-w-[170px] text-[11px] uppercase leading-relaxed tracking-[0.15em] text-white/40">
            Drag left or right to browse the selected projects.
          </p>
        </div>
      </div>

      <div
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDragging}
        onPointerCancel={finishDragging}
        onClickCapture={preventDraggedClick}
        className={`cursor-grab overflow-x-auto select-none touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isDragging ? "cursor-grabbing" : ""}`}
      >
        <div
          className="flex w-max gap-12 px-[max(1rem,calc((100vw-1280px)/2+2rem))] pb-28 pt-10 md:pt-12"
        >
          {PROJECTS.map((p, i) => (
            <div
              key={p.index}
              className="reveal w-[86vw] max-w-[46rem] shrink-0 md:w-[46vw]"
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <SpotlightCard project={p} />
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
