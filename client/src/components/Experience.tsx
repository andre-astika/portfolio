/* NOIR KINETIC — about + experience: split layout with CV portrait, mono timeline,
   and skills chips echoing the CV's pill style (inverted grayscale). */
import { AndrePhoto } from "@/components/AndrePhoto";

export const EXPERIENCE = [
  {
    period: "Jul 2026 — Present",
    role: "Frontend Developer — Headless CMS & Next.js",
    company: "Jupitr Agency",
    points: [
      "Site structure & styling with WordPress + CSS and Next.js (TypeScript/JSX) with MDX and Tailwind.",
      "Headless Next.js sites integrated with GraphQL + WordPress, and Next.js with Sanity CMS.",
      "Fullstack-leaning involvement with a strong frontend foundation; AI-assisted research without compromising code quality.",
    ],
  },
  {
    period: "Jan 2026 — Jun 2026",
    role: "Quality Assurance",
    company: "Jupitr Agency",
    points: [
      "Designed the create-check-approval SOP for QA documentation.",
      "Built custom tools for comparing developed websites against design references.",
    ],
  },
  {
    period: "Oct 2024 — Jan 2026",
    role: "Lead WordPress Frontend Developer",
    company: "Jupitr Agency",
    points: [
      "Lead the frontend development team — managed workflow and delegated tasks.",
      "Handled 10–20 projects annually for international agency clients, each with distinct performance challenges and case studies.",
    ],
  },
  {
    period: "Feb 2024 — Sep 2024",
    role: "Senior Frontend WordPress Developer",
    company: "Cabaretti Website Design and Development",
    points: [
      "Lead frontend development for international clients with distinct performance challenges and case studies.",
    ],
  },
  {
    period: "Dec 2022 — Feb 2024",
    role: "Junior Frontend WordPress Developer",
    company: "Cabaretti Website Design and Development",
    points: [
      "Built WordPress sites across WP Bakery, Elementor, Divi, and Gutenberg plus custom plugins.",
      "Worked directly with an international team and clients (company based in San Diego, California, USA).",
    ],
  },
  {
    period: "2022 — Present",
    role: "Freelance Graphic Designer, Website Designer & Developer",
    company: "Independent",
    points: [
      "Delivered flyers, banners, logos, invitation cards, and websites for various clients, including wedding event websites.",
    ],
  },
];

const SKILLS = [
  "WordPress CMS",
  "WP Bakery · Elementor · Divi · Gutenberg",
  "Custom Plugin Development",
  "HTML / CSS / JavaScript",
  "Next.js (TypeScript, JSX, MDX)",
  "Headless CMS (GraphQL, Sanity)",
  "Frontend Architecture",
  "UI / UX Sense",
  "Responsive Web Design",
  "QA Process & Tooling",
  "AI-assisted Development Workflow",
  "Adobe Photoshop (Advanced)",
];

export const ABOUT_PORTRAIT_OPTIONS = {
  hoverFlip: false,
  labelPosition: "chest",
  sparklePlacement: "top-right",
} as const;

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden">
      <div className="container py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          {/* LEFT: about + portrait */}
          <div className="reveal lg:sticky lg:top-32 lg:self-start">
            <p className="font-label mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-white/45">
              <span className="text-white/30">✦</span> (About) — Behind the pixels
            </p>
            <h2 className="font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-white md:text-7xl">
              Design.
              <br />
              <span className="text-stroke">Build.</span>
              <br />
              Ship.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-white/60 md:text-base">
              3+ years in the craft. I turn ideas into websites, brands, and visual systems that
              perform — not decorate. I've owned QA processes end to end (SOPs, custom tooling)
              and run my own freelance practice since 2022, working across time zones with
              international clients and teams.
            </p>

            <div className="reveal mt-10 inline-block" style={{ "--reveal-delay": "220ms" } as React.CSSProperties}>
              <div className="relative h-[42vh] w-auto md:h-[46vh]">
                <AndrePhoto
                  className="relative h-full w-auto"
                  imgClassName="h-full w-auto"
                  label="(About) — Behind the pixels"
                  {...ABOUT_PORTRAIT_OPTIONS}
                />
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-2">
              {SKILLS.map((s) => (
                <span
                  key={s}
                  className="font-label border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-white/70 transition-colors duration-200 hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT: experience list */}
          <div>
            <div className="flex flex-col">
              {EXPERIENCE.map((e, i) => (
                <div
                  key={i}
                  className="reveal group relative grid gap-2 border-b border-white/5 py-8 md:grid-cols-[1fr_6fr] md:gap-6"
                  style={{ "--reveal-delay": `${Math.min(i * 70, 300)}ms` } as React.CSSProperties}
                >
                  <span className="font-label text-[10px] uppercase leading-relaxed tracking-[0.2em] text-white/40">
                    {e.period}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white md:text-xl">
                      {e.role}
                    </h3>
                    <p className="mt-3 font-sans text-base not-italic text-white/50">{e.company}</p>
                    <ul className="mt-3 space-y-1.5">
                      {e.points.map((p, j) => (
                        <li key={j} className="flex gap-2.5 text-sm leading-relaxed text-white/55">
                          <span className="mt-0 text-white/30">✦</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
