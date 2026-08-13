/* NOIR KINETIC — design philosophy: huge serif accent line, parallax meta,
   three numbered principles on an asymmetric split. */
import { useMouseParallax } from "@/hooks/useKinetic";

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

  return (
    <section id="philosophy" className="relative overflow-hidden border-y border-white/10 bg-[oklch(0.11_0_0)]">
      <div className="container py-24 md:py-36">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          {/* LEFT: statement */}
          <div className="reveal md:sticky md:top-28 md:self-start">
            <p className="font-label mb-6 text-[11px] uppercase tracking-[0.35em] text-white/45">
              (Philosophy) — Design principles
            </p>
            <h2 className="font-serif-accent text-4xl font-medium italic leading-[1.15] text-white md:text-6xl">
              Design is what remains <span className="text-silver-gradient not-italic font-display">when nothing else can be taken away.</span>
            </h2>
            <div ref={floatRef} className="mt-10 flex items-center gap-3 text-white/40" style={{ willChange: "transform" }}>
              <span className="font-label text-[11px] uppercase tracking-[0.25em]">✦ Reduced to essentials</span>
            </div>
          </div>

          {/* RIGHT: numbered principles */}
          <div className="flex flex-col">
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.no}
                className="reveal group border-t border-white/10 py-10 transition-colors duration-300 first:border-t-0 hover:bg-white/[0.02]"
                style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
              >
                <div className="flex flex-wrap items-baseline gap-4">
                  <span className="font-label text-[11px] uppercase tracking-[0.3em] text-white/40">{p.no}</span>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-silver-gradient md:text-3xl">
                    {p.title}
                  </h3>
                </div>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">{p.text}</p>
              </div>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
