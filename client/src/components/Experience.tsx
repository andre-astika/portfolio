/* NOIR KINETIC — about + experience: split layout with CV portrait, mono timeline,
   and skills chips echoing the CV's pill style (inverted grayscale). */
import { AndrePhoto } from "@/components/AndrePhoto";

export const ABOUT_SUMMARY =
  "Frontend Web Developer with 3+ years of experience, transitioning from an Expert Traditional WordPress Developer to a Modern Next.js Specialist. Highly proficient in building high-performance, responsive web applications using Front-End Architecture, modern JavaScript (React.js, Next.js), strictly typed with TypeScript, and styled with HTML, CSS, and Tailwind CSS. Experienced in handling two primary modern architectures: Headless WordPress (utilizing PHP/MySQL backend for content entry and fetching data via GraphQL) and fully static sites driven by MDX content. Retains deep expertise in traditional WordPress development while actively implementing UI/UX principles, Technical/On-Page SEO best practices, and asset optimization for maximum page load speed. Adept at troubleshooting, bug fixing, and leveraging AI technologies (ChatGPT, Gemini, Claude) for workflow automation. Proven ability to work independently or within a team to maintain website security, optimize performance, and deliver comprehensive technical documentation.";

export const EXPERIENCE = [
  {
    period: "Jul 2026 — Present",
    role: "Frontend Web Developer (Headless CMS & Next.js)",
    company: "Jupitr Agency",
    points: [
      "Develop and optimise responsive frontend applications with JavaScript, React.js, Next.js, TypeScript (TSX), and Tailwind CSS.",
      "Engineer Headless WordPress architecture by connecting Next.js applications to PHP/MySQL content systems through GraphQL.",
      "Build high-performance static pages with MDX for scalable content management, page-load speed, and overall system performance.",
      "Manage troubleshooting, bug fixing, testing, deployment, AI-assisted workflow automation, and team technical documentation.",
    ],
  },
  {
    period: "Jan 2026 — Jun 2026",
    role: "Quality Assurance",
    company: "Jupitr Agency",
    points: [
      "Managed maintenance, development, and optimisation checks for digital products against UI/UX and responsive-design standards.",
      "Built custom internal tools to identify layout anomalies and performance bottlenecks during troubleshooting.",
      "Partnered with the development team to isolate bugs, track fixes, and integrate solutions into internal systems.",
      "Designed and maintained the create-check-approval SOP and user guidelines for a consistent QA workflow.",
    ],
  },
  {
    period: "Oct 2024 — Jan 2026",
    role: "Lead Frontend WordPress Developer",
    company: "Jupitr Agency",
    points: [
      "Led the frontend team in building, maintaining, and optimising 10+ web projects annually for client business operations.",
      "Managed independent and collaborative tasks while ensuring features met operational, performance, and security standards.",
      "Conducted code reviews and mentored junior developers in frontend architecture, modern practices, and effective bug resolution.",
      "Translated technical challenges and international stakeholder needs into actionable technical requirements.",
    ],
  },
  {
    period: "Feb 2024 — Sep 2024",
    role: "Senior Frontend WordPress Developer",
    company: "Cabaretti Website Design and Development",
    points: [
      "Managed frontend workflows, delegated tasks, and led delivery for international agency clients based in San Diego, California.",
      "Maintained enterprise-level responsive WordPress websites using PHP, MySQL, HTML, and CSS.",
      "Oversaw database interactions, security protocols, and website performance to maintain strong client-side stability.",
      "Provided senior technical troubleshooting for critical backend and frontend issues.",
    ],
  },
  {
    period: "Dec 2022 — Feb 2024",
    role: "Junior Frontend WordPress Developer",
    company: "Cabaretti Website Design and Development",
    points: [
      "Built custom WordPress websites with WP Bakery, Elementor, Divi, Gutenberg, and custom plugin implementations.",
      "Applied technical SEO: WebP image optimisation below 200KB, alt text, and meta-title and description configuration.",
      "Worked with international teams to translate website designs into clean, responsive, mobile-friendly code.",
      "Handled day-to-day maintenance, performance checks, and routine bug fixes across client web properties.",
    ],
  },
  {
    period: "2022 — Present",
    role: "Freelance Website Designer & Developer, Graphic Designer",
    company: "Self-employed",
    points: [
      "Design and develop customised, responsive websites for clients, including wedding and event platforms, with strong UI/UX and frontend performance.",
      "Produce branded digital assets including logos, banners, flyers, and invitation cards using Adobe Photoshop.",
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
  labelPosition: "bottom-bar",
  sparklePlacement: "top-right",
} as const;

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden">
      <div className="container px-6 py-12 md:py-32 lg:px-8">
        <div className="grid gap-2 md:grid-cols-[0.8fr_1.22fr] md:gap-14 lg:grid-cols-[0.8fr_1.2fr]">
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
              {ABOUT_SUMMARY}
            </p>

            <div className="reveal mt-8 inline-block md:mt-10" style={{ "--reveal-delay": "220ms" } as React.CSSProperties}>
              <div className="relative h-[42vh] w-auto md:h-[46vh]">
                <AndrePhoto
                  className="relative h-full w-auto"
                  imgClassName="h-full w-auto"
                  label="(About) — Behind the pixels"
                  {...ABOUT_PORTRAIT_OPTIONS}
                />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 md:mt-12">
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
                  className="reveal group relative grid gap-2 border-b border-white/5 py-6 md:grid-cols-[1fr_6fr] md:gap-6 md:py-8"
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
