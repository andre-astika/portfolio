/* NOIR KINETIC — testimonial carousel: Embla-based crossfade slide with progress
   bar and prev/next controls; quotes from collaborators on the current portfolio. */
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { toast } from "sonner";

const TESTIMONIALS = [
  {
    quote:
      "Andre is an exceptionally talented designer who consistently exceeded our expectations. His ability to blend creativity and functionality resulted in visually stunning designs that perfectly captured our brand's essence.",
    name: "Agency Client",
    role: "Brand & Website Project",
  },
  {
    quote:
      "Working with Andre was a game-changer for our business. His keen eye for detail and deep understanding of user experience resulted in designs that not only looked great but also enhanced the overall usability of our product.",
    name: "Agency Client",
    role: "UX & Product Design",
  },
  {
    quote:
      "His professionalism, responsiveness, and dedication to delivering high-quality work exceeded our expectations. We would highly recommend him to anyone in need of a talented and reliable designer.",
    name: "Agency Client",
    role: "Web Development",
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [active, setActive] = useState(0);

  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActive(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const comingSoon = () => toast("Case studies are coming soon — for now, let's talk about your project.");

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[oklch(0.15_0_0)]">
      <div
        className="font-display pointer-events-none select-none absolute -left-4 bottom-4 text-[16rem] font-black leading-none text-white/[0.04]"
        aria-hidden="true"
      >
        06
      </div>

      <div className="container py-24 md:py-32">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="reveal">
            <p className="font-label mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-white/45">
              <span className="text-white/30">✦</span> (Voices) — From collaborators
            </p>
            <h2 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-7xl">
              Kind
              <br />
              <span className="text-stroke">words</span>
              <span className="ml-4 inline-block text-2xl text-white/40 md:text-3xl">✦</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              data-cursor
              aria-label="Previous testimonial"
              className="border border-white/25 p-3 text-white transition-all duration-200 hover:bg-white hover:text-black active:scale-[0.95]"
            >
              ←
            </button>
            <button
              onClick={scrollNext}
              data-cursor
              aria-label="Next testimonial"
              className="border border-white/25 p-3 text-white transition-all duration-200 hover:bg-white hover:text-black active:scale-[0.95]"
            >
              →
            </button>
          </div>
        </div>

        <div className="reveal relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="w-full shrink-0 px-2 md:px-10">
                  <blockquote className="max-w-3xl">
                    <span className="font-serif-accent mb-6 block text-6xl leading-none text-white/20" aria-hidden="true">
                      “
                    </span>
                    <p className="font-serif-accent text-2xl leading-relaxed text-white/85 md:text-4xl">
                      {t.quote}
                    </p>
                    <footer className="mt-8 flex items-center gap-4">
                      <span className="h-px w-10 bg-white/30" />
                      <div>
                        <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white">
                          {t.name}
                        </p>
                        <p className="font-label mt-1 text-[10px] uppercase tracking-[0.25em] text-white/45">
                          {t.role}
                        </p>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>

          {/* dots + progress */}
          <div className="mt-12 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10">
              <div
                className="h-px bg-white/70 transition-[width] duration-500 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)]"
                style={{ width: `${((active + 1) / TESTIMONIALS.length) * 100}%` }}
              />
            </div>
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40">
              {String(active + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={comingSoon}
            data-cursor
            data-cursor-label="SOON"
            className="font-label group inline-flex items-center gap-3 border border-white/25 px-6 py-3.5 text-xs uppercase tracking-[0.25em] text-white/80 transition-all duration-200 hover:bg-white hover:text-black active:scale-[0.97]"
          >
            Read full case studies
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
