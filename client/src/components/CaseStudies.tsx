/* NOIR KINETIC — case study previews: asymmetric editorial cards with hover
   spotlight, mono meta, and staggered reveal. */
const CASES = [
  {
    index: "CS/01",
    category: "Typography",
    title: "The Power of Typography in Visual Design",
    excerpt:
      "Uncover the significance of typography in visual design and learn how to leverage its power to effectively communicate messages and evoke emotions.",
    read: "5 min read",
  },
  {
    index: "CS/02",
    category: "User Experience",
    title: "Designing for User Experience",
    excerpt:
      "Explore the realm of UX design and discover how to craft interfaces that are not only aesthetically pleasing but intuitive and engaging.",
    read: "4 min read",
  },
  {
    index: "CS/03",
    category: "Color Theory",
    title: "Mastering the Art of Color Theory",
    excerpt:
      "Dive into the fascinating world of color theory and learn how to create captivating visual designs by understanding the principles of color harmonies.",
    read: "6 min read",
  },
];

function CaseCard({ c, i }: { c: (typeof CASES)[number]; i: number }) {
  return (
    <article
      className="spotlight group relative flex h-full flex-col overflow-hidden border border-white/10 bg-[oklch(0.19_0_0)] p-8 transition-colors duration-300 hover:border-white/30 md:p-10"
      style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
    >
      <div className="mb-8 flex items-center justify-between">
        <span className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40">{c.index}</span>
        <span className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40">{c.read}</span>
      </div>
      <p className="font-label mb-3 text-[10px] uppercase tracking-[0.3em] text-white/55">{c.category}</p>
      <h3 className="font-display mb-4 text-xl font-bold uppercase leading-snug tracking-tight text-white md:text-2xl">
        {c.title}
      </h3>
      <p className="mb-10 text-sm leading-relaxed text-white/55">{c.excerpt}</p>
      <div className="mt-auto flex items-center gap-2 text-white/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">
        <span className="font-label text-[11px] uppercase tracking-[0.25em]">Read study</span>
        <span>→</span>
      </div>
      {/* oversized ghost number */}
      <span
        className="font-display pointer-events-none absolute -right-12 -bottom-12 select-none text-[7rem] font-black leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.38)] transition-colors duration-300 group-hover:[-webkit-text-stroke-color:rgba(255,255,255,0.58)]"
        aria-hidden="true"
      >
        {String(i + 1).padStart(2, "0")}
      </span>
    </article>
  );
}

export default function CaseStudies() {
  return (
    <section id="case-studies" className="relative overflow-hidden">
      <div className="container py-24 md:py-32">
        <div className="reveal mb-14 max-w-2xl">
          <p className="font-label mb-4 text-[11px] uppercase tracking-[0.35em] text-white/45">
            (Thinking) — Case study previews
          </p>
          <h2 className="font-display text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
            How I <span className="text-stroke">think</span>
            <span className="relative mb-3 ml-4 inline-block align-middle text-2xl text-white/40 md:text-3xl">✦</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {CASES.map((c, i) => (
            <div key={c.index} className="reveal h-full">
              <CaseCard c={c} i={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
