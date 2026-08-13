/* NOIR KINETIC — hero: staggered line-rise headline, interactive
   Developer ↔ Weekend mode switcher swapping the two profile photos with a
   sliding pill, tilt-on-hover, and parallax. Tagline stays clipped brand voice. */
import { useEffect, useRef, useState } from "react";
import { useMouseParallax } from "@/hooks/useKinetic";
import FluidHeroBg from "@/components/FluidHeroBg";

type Mode = "dev" | "weekend";

const IMG_DEV = "/manus-storage/andre-profile-img-without_6e47e8ca.webp";
const IMG_WEEKEND = "/manus-storage/andre-profile-img-with_3f7bf32d.webp";

function ModeSwitch({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
}) {
  return (
    <div
      className="font-label relative inline-flex w-fit items-center border border-white/20 bg-black/40 p-1 backdrop-blur-sm"
      role="tablist"
      aria-label="Andre mode"
    >
      {/* sliding pill */}
      <span
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white transition-all duration-500 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] ${
          mode === "dev" ? "left-1" : "left-[calc(50%+0px)]"
        }`}
        aria-hidden="true"
      />
      {(
        [
          { key: "dev", label: "✦ Developer" },
          { key: "weekend", label: "Weekend ✦" },
        ] as const
      ).map((opt) => (
        <button
          key={opt.key}
          role="tab"
          aria-selected={mode === opt.key}
          data-cursor
          onClick={() => onChange(opt.key)}
          className={`relative z-10 px-4 py-2 text-[10px] uppercase tracking-[0.25em] transition-colors duration-300 md:px-5 ${
            mode === opt.key ? "text-black" : "text-white/60 hover:text-white"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function Hero() {
  const [mode, setMode] = useState<Mode>("dev");
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const portraitWrapRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useMouseParallax(22);

  /* slight tilt of the portrait card toward the pointer */
  useEffect(() => {
    const wrap = portraitWrapRef.current;
    if (!wrap) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: py * -6, y: px * 6 });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    wrap.addEventListener("mousemove", onMove as EventListener);
    wrap.addEventListener("mouseleave", onLeave as EventListener);
    return () => {
      wrap.removeEventListener("mousemove", onMove as EventListener);
      wrap.removeEventListener("mouseleave", onLeave as EventListener);
    };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden">
      {/* WebGL fluid/smoke layer behind everything, pointer-reactive */}
      <FluidHeroBg />

      {/* giant background index number */}
      <div
        className="font-display pointer-events-none select-none absolute -right-6 -top-10 text-[28rem] font-black leading-none text-white/[0.04] md:text-[34rem]"
        aria-hidden="true"
      >
        01
      </div>

      <div className="container relative z-10 flex min-h-screen flex-col justify-center pb-28 pt-28 md:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          {/* LEFT: type stack */}
          <div>
            {/* mode switcher */}
            <div className="line-rise mb-6">
              <ModeSwitch mode={mode} onChange={setMode} />
            </div>

            <p className="font-label mb-6 line-rise flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-white/50 md:text-xs" style={{ "--line-delay": "60ms" } as React.CSSProperties}>
              <span className="inline-block h-px w-10 bg-white/30" />
              (Portfolio) — Frontend Developer · Website &amp; Graphic Designer
            </p>

            <h1 className="font-display leading-[0.88] tracking-tight">
              <span className="line-rise block text-[15vw] font-black uppercase text-white md:text-[8.5rem]" style={{ "--line-delay": "120ms" } as React.CSSProperties}>
                Andre
              </span>
              <span className="line-rise block text-[15vw] font-black uppercase text-stroke md:text-[8.5rem]" style={{ "--line-delay": "240ms" } as React.CSSProperties}>
                Astika<span className="text-white/40">✦</span>
              </span>
            </h1>

            {/* mode-aware taglines */}
            <p
              key={mode}
              className="mt-8 max-w-xl animate-[fade-up_0.5s_cubic-bezier(0.23,1,0.32,1)_both] text-base leading-relaxed text-white/60 md:text-lg"
            >
              {mode === "dev" ? (
                <>
                  Interfaces that don't wait to be noticed. I design and build
                  websites, branding, and visual systems — pixel-precise,
                  deadline-obsessed, zero fluff.
                </>
              ) : (
                <>
                  Off the clock, on the move. Same pixel discipline — looser
                  frames, better coffee. The weekend edition of the same
                  craftsman.
                </>
              )}
            </p>

            <div className="line-rise mt-10 flex flex-wrap items-center gap-4" style={{ "--line-delay": "420ms" } as React.CSSProperties}>
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

            <div className="line-rise mt-14 flex flex-wrap gap-x-8 gap-y-2 text-white/40" style={{ "--line-delay": "540ms" } as React.CSSProperties}>
              <span className="font-label text-[11px] uppercase tracking-[0.25em]">✦ 3+ yrs shipping</span>
              <span className="font-label text-[11px] uppercase tracking-[0.25em]">✦ 10–20 projects / yr</span>
              <span className="font-label text-[11px] uppercase tracking-[0.25em]">✦ Denpasar, Bali</span>
            </div>
          </div>

          {/* RIGHT: interactive portrait with mode swap */}
          <div className="hidden lg:block">
            <div ref={portraitWrapRef} className="relative justify-self-end">
              {/* parallax container + tilt */}
              <div
                ref={parallaxRef}
                className="relative transition-transform duration-300 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)]"
                style={{
                  willChange: "transform",
                  transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
              >
                <div
                  className="relative h-[62vh] w-auto cursor-pointer overflow-hidden transition-shadow duration-500 hover:shadow-[0_0_60px_oklch(1_0_0/0.06)]"
                  style={{ clipPath: "polygon(14% 0, 100% 2%, 100% 100%, 0 97%)" }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  role="img"
                  aria-label={hovered ? "Andre Astika — hover to meet Weekend mode" : "Andre Astika"}
                >
                  <img
                    key={mode}
                    src={hovered ? IMG_WEEKEND : IMG_DEV}
                    alt={hovered ? "Andre Astika — Weekend mode (cap & shades)" : "Andre Astika — Developer mode"}
                    className="h-full w-auto animate-[photo-in_0.7s_cubic-bezier(0.23,1,0.32,1)_both] object-cover object-top"
                    style={{ filter: "grayscale(100%) contrast(1.05)" }}
                  />
                  {/* hover hint label */}
                  <span
                    className={`font-label pointer-events-none absolute left-0 right-0 bottom-0 translate-y-full bg-black/80 px-4 py-2 text-center text-[9px] uppercase tracking-[0.3em] text-white/70 backdrop-blur-sm transition-transform duration-500 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0 ${
                      hovered ? "translate-y-0" : ""
                    }`}
                  >
                    {hovered ? "(Hover) — Weekend mode ✦" : "Hover me — Weekend mode →"}
                  </span>
                  {/* scan-line overlay for dev mode */}
                  <span
                    className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                      mode === "dev" ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, oklch(1 0 0 / 4%) 0px, oklch(1 0 0 / 4%) 1px, transparent 1px, transparent 4px)",
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* mode badge */}
                <span
                  key={`badge-${hovered ? "weekend" : mode}`}
                  className="font-label pointer-events-none absolute -bottom-4 left-4 animate-[fade-up_0.5s_cubic-bezier(0.23,1,0.32,1)_both] border border-white/25 bg-black/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/70 backdrop-blur-sm"
                >
                  {hovered ? "(Mode) — Weekend · Bali, ID" : mode === "dev" ? "(Mode) — Developer · Bali, ID" : "(Mode) — Weekend · Bali, ID"}
                </span>

                {/* corner crosshair */}
                <span className="absolute -left-6 -top-6 text-xl text-white/25" aria-hidden="true">
                  ✦
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
