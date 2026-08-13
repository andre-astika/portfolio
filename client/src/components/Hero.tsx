/* NOIR KINETIC — hero: staggered line-rise headline, interactive
  Developer ↔ Weekend mode switcher with a sliding pill and clipped brand voice.
  The switch also changes the page-wide Developer dark / Weekend light palette.
   The portrait is intentionally omitted here so the cinematic background owns
   the hero; reusable Andre portraits remain available in About/Experience. */
import { useRef, type PointerEvent } from "react";
import { useSiteWeekend } from "@/components/AndrePhoto";
import FluidHeroBg from "@/components/FluidHeroBg";
import LiquidHeroReveal, {
  type LiquidHeroRevealHandle,
} from "@/components/LiquidHeroReveal";

const HERO_IMG_PLAIN = "/manus-storage/andre-profile-bg-img-without-acc-hd_a1951d13.webp";
const HERO_IMG_WEEKEND = "/manus-storage/andre-profile-bg-img-with-acc-hd_308df14c.webp";

type Mode = "dev" | "weekend";

function ModeSwitch({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
}) {
  return (
    <div
      className="mode-switch font-label relative inline-flex w-fit items-center border border-white/20 bg-black/40 p-1 backdrop-blur-sm"
      role="tablist"
      aria-label="Andre mode"
    >
      {/* sliding pill */}
      <span
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] transition-all duration-500 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] ${
          mode === "dev" ? "left-1 bg-white" : "left-[calc(50%+0px)] bg-black"
        }`}
        aria-hidden="true"
      />
      {(
        [
          { key: "dev", label: "✦ Developer Mode" },
          { key: "weekend", label: "Weekend Mode ✦" },
        ] as const
      ).map((opt) => (
        <button
          key={opt.key}
          role="tab"
          aria-selected={mode === opt.key}
          data-cursor
          onClick={() => onChange(opt.key)}
          className={`relative z-10 px-4 py-2 text-[10px] uppercase tracking-[0.25em] transition-colors duration-300 md:px-5 ${
            mode === opt.key
              ? mode === "weekend"
                ? "text-white"
                : "text-black"
              : "text-white/60 hover:text-white"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function Hero() {
  const { weekend, setWeekend } = useSiteWeekend();
  const mode: Mode = weekend ? "weekend" : "dev";
  const liquidRevealRef = useRef<LiquidHeroRevealHandle>(null);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    liquidRevealRef.current?.move(event.clientX, event.clientY);
  };

  return (
    <section
      id="top"
      className="hero-section relative overflow-hidden"
      onPointerMove={handlePointerMove}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") {
          liquidRevealRef.current?.setActive(true);
        }
      }}
      onPointerLeave={() => liquidRevealRef.current?.setActive(false)}
    >
      <LiquidHeroReveal
        ref={liquidRevealRef}
        mode={mode}
        baseSrc={weekend ? HERO_IMG_WEEKEND : HERO_IMG_PLAIN}
        revealSrc={weekend ? HERO_IMG_PLAIN : HERO_IMG_WEEKEND}
      />
      {/* WebGL fluid/smoke layer behind everything, pointer-reactive */}
      <FluidHeroBg />

      <div className="container relative z-10 flex min-h-screen flex-col justify-center pb-28 pt-28 md:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          {/* LEFT: type stack */}
          <div>
            {/* mode switcher */}
            <div className="line-rise mb-6">
            <ModeSwitch mode={mode} onChange={(nextMode) => setWeekend(nextMode === "weekend")} />
            </div>

            <p className="font-label mb-6 line-rise text-[11px] uppercase tracking-[0.35em] text-white/50 md:text-xs" style={{ "--line-delay": "60ms" } as React.CSSProperties}>
              Frontend Developer · Website &amp; Graphic Designer
            </p>

            <h1 className="font-display leading-[0.88] tracking-tight">
              <span className="line-rise block text-[18vw] font-black uppercase text-white sm:text-[5rem] md:text-[139px]" style={{ "--line-delay": "120ms" } as React.CSSProperties}>
                Andre
              </span>
              <span className="line-rise block text-[14vw] font-black uppercase text-stroke sm:text-[3.875rem] md:text-[108px]" style={{ "--line-delay": "240ms" } as React.CSSProperties}>
                <span className="inline-flex items-center whitespace-nowrap">
                  Astika
                  <span className="hero-astika-sparkle ml-2 inline-flex h-[0.72em] w-[0.72em] shrink-0 translate-y-[0.01em] items-center justify-center text-[0.92em] leading-none md:ml-3" aria-hidden="true">
                    ✦
                  </span>
                </span>
              </span>
            </h1>

            {/* mode-aware taglines */}
            <p
              key={mode}
              className="mt-8 w-full max-w-[700px] animate-[fade-up_0.5s_cubic-bezier(0.23,1,0.32,1)_both] text-base leading-relaxed text-white/60 md:text-lg"
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

        </div>
      </div>
    </section>
  );
}
