/* NOIR KINETIC — hero: left-anchored giant display type, line-rise stagger,
   cut-out portrait with mouse parallax, location meta, marquee underfold. */
import { useMouseParallax } from "@/hooks/useKinetic";

export default function Hero() {
  const portraitRef = useMouseParallax(22);

  return (
    <section id="top" className="relative overflow-hidden">
      {/* giant background index number */}
      <div
        className="font-display pointer-events-none select-none absolute -right-6 -top-10 text-[28rem] font-black leading-none text-white/[0.04] md:text-[34rem]"
        aria-hidden="true"
      >
        01
      </div>

      <div className="container relative z-10 flex min-h-screen flex-col justify-center pb-28 pt-28 md:pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          {/* LEFT: type stack */}
          <div>
            <p className="font-label mb-6 line-rise flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-white/50 md:text-xs">
              <span className="inline-block h-px w-10 bg-white/30" />
              (Portfolio) — Frontend Developer · Website &amp; Graphic Designer
            </p>

            <h1 className="font-display leading-[0.88] tracking-tight">
              <span className="line-rise block text-[15vw] font-black uppercase text-white md:text-[8.5rem]" style={{ "--line-delay": "80ms" } as React.CSSProperties}>
                Andre
              </span>
              <span className="line-rise block text-[15vw] font-black uppercase text-stroke md:text-[8.5rem]" style={{ "--line-delay": "200ms" } as React.CSSProperties}>
                Astika<span className="text-white/40">✦</span>
              </span>
            </h1>

            <p className="line-rise mt-8 max-w-xl text-base leading-relaxed text-white/60 md:text-lg" style={{ "--line-delay": "340ms" } as React.CSSProperties}>
              Interfaces that don't wait to be noticed. I design and build websites,
              branding, and visual systems — pixel-precise, deadline-obsessed,
              zero fluff. Shipped from Bali for clients worldwide.
            </p>

            <div className="line-rise mt-10 flex flex-wrap items-center gap-4" style={{ "--line-delay": "480ms" } as React.CSSProperties}>
              <a
                href="#work"
                data-cursor
                data-cursor-label="VIEW"
                className="font-label group inline-flex items-center gap-3 border border-white/25 bg-white px-6 py-3.5 text-xs font-medium uppercase tracking-[0.25em] text-black transition-all duration-200 hover:bg-transparent hover:text-white active:scale-[0.97]"
              >
                See the work
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#contact"
                data-cursor
                className="font-label inline-flex items-center gap-3 px-2 py-3.5 text-xs uppercase tracking-[0.25em] text-white/70 transition-colors duration-200 hover:text-white"
              >
                Start a project
              </a>
            </div>

            <div className="line-rise mt-14 flex flex-wrap gap-x-8 gap-y-2 text-white/40" style={{ "--line-delay": "600ms" } as React.CSSProperties}>
              <span className="font-label text-[11px] uppercase tracking-[0.25em]">✦ 3+ yrs shipping</span>
              <span className="font-label text-[11px] uppercase tracking-[0.25em]">✦ 10–20 projects / yr</span>
              <span className="font-label text-[11px] uppercase tracking-[0.25em]">✦ Denpasar, Bali</span>
            </div>
          </div>

          {/* RIGHT: cut-out portrait */}
          <div className="relative hidden justify-self-end lg:block">
            <div ref={portraitRef} className="relative" style={{ willChange: "transform" }}>
              <img
                src="/manus-storage/andre-profile-img-with_3f7bf32d.webp"
                alt="Andre Astika"
                className="h-[62vh] w-auto object-cover object-top"
                style={{
                  clipPath: "polygon(14% 0, 100% 2%, 100% 100%, 0 97%)",
                  filter: "grayscale(100%) contrast(1.05)",
                }}
              />
              <span className="font-label absolute -bottom-4 left-4 text-[10px] uppercase tracking-[0.3em] text-white/50">
                (Portrait) — Bali, ID
              </span>
              {/* crosshair tick at corner */}
              <span className="absolute -left-6 -top-6 text-xl text-white/25" aria-hidden="true">✦</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
