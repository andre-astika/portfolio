/* NOIR KINETIC — contact + footer: giant CTA type, mono contact grid, socials,
   and closing marquee. Crosshair logo mark as favicon anchor. */
import { useMagnetic } from "@/hooks/useKinetic";

export const FOOTER_BRAND_MARK = "✦";
export const FOOTER_COPYRIGHT = "© 2026 Andre Astika — Denpasar, Bali";

const SOCIALS = [
  { label: "Email", href: "mailto:en.andre.st@gmail.com", value: "en.andre.st@gmail.com" },
  { label: "Web", href: "https://andre.jupitragency.com", value: "andre.jupitragency.com", external: true },
  { label: "Phone", href: "tel:+628814823595", value: "0881 482 3595" },
  { label: "Location", href: "#contact", value: "Denpasar, Bali — Indonesia" },
];

export default function Contact() {
  const ctaRef = useMagnetic(0.25);

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="container py-24 md:py-36">
        <p className="reveal font-label mb-4 text-[11px] uppercase tracking-[0.35em] text-white/45">
          (Contact) — Available for new projects
        </p>
        <h2 className="reveal font-display text-[13vw] font-extrabold uppercase leading-[0.9] tracking-tight text-white md:text-[7.5rem]">
          Let's build
          <br />
          <span className="text-stroke">something bold.</span>
        </h2>

        <div className="mt-12 flex flex-wrap gap-4">
          <a
            ref={ctaRef}
            href="mailto:en.andre.st@gmail.com?subject=New%20project%20with%20Andre"
            data-cursor
            data-cursor-label="MAIL"
            className="font-label group inline-flex items-center gap-3 bg-white px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-black transition-all duration-200 hover:bg-transparent hover:text-white active:scale-[0.97]"
          >
            Start a project
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="tel:+628814823595"
            data-cursor
            className="font-label inline-flex items-center gap-3 px-3 py-4 text-xs uppercase tracking-[0.25em] text-white/70 transition-colors duration-200 hover:text-white"
          >
            Or call me
          </a>
        </div>

        {/* contact grid */}
        <div className="mt-20 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.external ? "_blank" : undefined}
              rel={s.external ? "noopener noreferrer" : undefined}
              data-cursor
              className="spotlight group flex flex-col gap-4 bg-[oklch(0.13_0_0)] p-8 transition-colors duration-300 hover:bg-[oklch(0.17_0_0)]"
            >
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40">
                {s.label}
              </span>
              <span className="text-sm text-white/80 transition-colors duration-300 group-hover:text-white md:text-base">
                {s.value}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* closing marquee */}
      <div className="border-t border-white/10 bg-[oklch(0.11_0_0)] py-10 md:py-14">
        <div className="flex items-center justify-between px-6 md:px-12">
          <span className="font-display text-2xl leading-none text-white" aria-hidden="true">
            {FOOTER_BRAND_MARK}
          </span>
          <span className="font-label text-right text-[9px] uppercase tracking-[0.18em] text-white/40 sm:text-[10px] sm:tracking-[0.3em]">
            {FOOTER_COPYRIGHT}
          </span>
        </div>
      </div>
    </section>
  );
}
