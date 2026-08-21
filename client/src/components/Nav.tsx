/* NOIR KINETIC — top nav: mono labels, crosshair logo, scroll-aware blur bar. */
import { useEffect, useState } from "react";
import { useMagnetic } from "@/hooks/useKinetic";

export const NAV_BRAND_MARK = "✦";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#philosophy", label: "Philosophy" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ctaRef = useMagnetic(0.3);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[oklch(0.13_0_0/0.8)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        <a
          href="#top"
          data-cursor
          data-cursor-label="TOP"
          aria-label="Back to top"
          className="font-display inline-flex items-center justify-center text-2xl leading-none text-white md:text-3xl"
        >
          <span aria-hidden="true">{NAV_BRAND_MARK}</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor
              className="font-label relative text-[11px] uppercase tracking-[0.25em] text-white/60 transition-colors duration-200 hover:text-white"
            >
              <span className="text-white/30 mr-1.5">{String(i + 1).padStart(2, "0")}</span>
              {l.label}
            </a>
          ))}
        </nav>

        <a
          ref={ctaRef}
          href="#contact"
          data-cursor
          data-cursor-label="GO"
          className="font-label group inline-flex items-center gap-2 border border-white/25 bg-white/0 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-white transition-all duration-200 hover:bg-white hover:text-black active:scale-[0.97]"
        >
          Let's talk
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </header>
  );
}
