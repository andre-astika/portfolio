/* NOIR KINETIC — design philosophy: sticky editorial statement with a measured
   reading-progress indicator and focus-aware numbered principles. */
import { useEffect, useRef, useState } from "react";
import { useMouseParallax } from "@/hooks/useKinetic";
import { getPhilosophyReadingProgress } from "@/lib/philosophyProgress";

export const PHILOSOPHY_PRIMARY_PHRASE = "Design is what remains";
export const PHILOSOPHY_REMAINDER = "when nothing else can be taken away.";
export const PHILOSOPHY_PRIMARY_CLASS = "font-display block text-4xl font-extrabold leading-[0.96] tracking-tight text-white sm:text-5xl md:text-6xl";
export const PHILOSOPHY_REMAINDER_CLASS = "font-display mt-3 block text-4xl font-extrabold leading-[0.96] tracking-tight text-white sm:text-5xl md:mt-5 md:text-6xl";

const PRINCIPLES = [
  {
    no: "P/01",
    title: "Function leads, form follows",
    text: "Every layout decision starts from the user's goal. Beauty is earned through clarity, not decoration.",
  },
  {
    no: "P/02",
    title: "Pixel discipline, always",
    text: "SOPs, QA tooling, and meticulous testing on every build. 10–20 projects a year taught me that consistency is a craft.",
  },
  {
    no: "P/03",
    title: "Design that ships",
    text: "A concept that never reaches production is a sketch. I design inside real constraints — code, CMS, deadline.",
  },
];

export default function Philosophy() {
  const floatRef = useMouseParallax(14);
  const principleRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observedPrinciples = principleRefs.current.filter(
      (principle): principle is HTMLDivElement => Boolean(principle),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!mostVisible) return;
        const nextIndex = Number(mostVisible.target.getAttribute("data-principle-index"));
        if (!Number.isNaN(nextIndex)) setActiveIndex(nextIndex);
      },
      { rootMargin: "-32% 0px -42% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    observedPrinciples.forEach((principle) => observer.observe(principle));
    return () => observer.disconnect();
  }, []);

  const readingProgress = getPhilosophyReadingProgress(activeIndex, PRINCIPLES.length);

  return (
    <section id="philosophy" className="relative overflow-hidden border-y border-white/10 bg-[oklch(0.11_0_0)]">
      <div className="container py-24 md:py-36">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          {/* LEFT: statement */}
          <div className="reveal md:sticky md:top-28 md:self-start">
            <p className="font-label mb-6 text-[11px] uppercase tracking-[0.35em] text-white/45">
              (Philosophy) — Design principles
            </p>
            <h2 aria-label={`${PHILOSOPHY_PRIMARY_PHRASE} ${PHILOSOPHY_REMAINDER}`}>
              <span className={PHILOSOPHY_PRIMARY_CLASS}>{PHILOSOPHY_PRIMARY_PHRASE}</span>
              <span className={PHILOSOPHY_REMAINDER_CLASS}>{PHILOSOPHY_REMAINDER}</span>
            </h2>
            <div ref={floatRef} className="mt-10 flex items-center gap-3 text-white/40" style={{ willChange: "transform" }}>
              <span className="font-label text-[11px] uppercase tracking-[0.25em]">✦ Reduced to essentials</span>
            </div>
            <div className="mt-8 max-w-44" aria-label={`Reading progress: principle ${activeIndex + 1} of ${PRINCIPLES.length}`}>
              <div className="mb-3 flex items-center justify-between font-label text-[9px] uppercase tracking-[0.24em] text-white/35">
                <span>Reading</span>
                <span>{String(activeIndex + 1).padStart(2, "0")} / {String(PRINCIPLES.length).padStart(2, "0")}</span>
              </div>
              <div className="h-px overflow-hidden bg-white/15" aria-hidden="true">
                <div
                  className="h-full origin-left bg-white/70 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)]"
                  style={{ transform: `scaleX(${readingProgress / 100})` }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT: numbered principles */}
          <div className="flex flex-col">
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.no}
                ref={(element) => {
                  principleRefs.current[i] = element;
                }}
                data-principle-index={i}
                aria-current={activeIndex === i ? "step" : undefined}
                className={`relative border-t py-10 transition-colors duration-500 first:border-t-0 ${
                  activeIndex === i
                    ? "border-white/30"
                    : "border-white/10"
                }`}
              >
                <div className="flex flex-wrap items-baseline gap-4">
                  <span className={`font-label text-[11px] uppercase tracking-[0.3em] transition-colors duration-300 ${activeIndex === i ? "text-white" : "text-white/45"}`}>{p.no}</span>
                  <h3 className={`font-display text-2xl font-bold uppercase tracking-tight transition-colors duration-300 md:text-3xl ${activeIndex === i ? "text-white" : "text-white/70"}`}>
                    {p.title}
                  </h3>
                </div>
                <p className={`mt-4 max-w-xl text-sm leading-relaxed transition-colors duration-300 md:text-base ${activeIndex === i ? "text-white" : "text-white/55"}`}>{p.text}</p>
              </div>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </div>

        <div className="reveal mt-14 flex items-center justify-between gap-6 border-t border-white/10 pt-7 md:mt-20">
          <p className="font-label text-[10px] uppercase tracking-[0.24em] text-white/40">Ready to make it real?</p>
          <a
            href="#contact"
            data-cursor
            className="font-label group inline-flex shrink-0 items-center gap-3 border border-white/25 px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-white/85 transition-all duration-200 hover:bg-white hover:text-black active:scale-[0.97]"
          >
            Start a project
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
