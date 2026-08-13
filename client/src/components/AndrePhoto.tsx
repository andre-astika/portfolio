/* NOIR KINETIC — site-wide Andre photo swap: a shared hover state so that
   hovering ANY Andre portrait on the page flips EVERY Andre portrait to
   Weekend mode (cap & glasses). The same provider also owns the site-wide
   Developer dark / Weekend light theme. */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export const IMG_ANDRE_DEV = "/manus-storage/andre-profile-img-without_6e47e8ca.webp";
export const IMG_ANDRE_WEEKEND = "/manus-storage/andre-profile-img-with_3f7bf32d.webp";

type WeekendCtx = { weekend: boolean; setWeekend: (next: boolean) => void };
const Ctx = createContext<WeekendCtx>({ weekend: false, setWeekend: () => undefined });

export function AndrePhotoProvider({ children }: { children: ReactNode }) {
  const [weekend, setWeekend] = useState(false);
  // keyboard: press "W" anywhere to toggle Weekend mode site-wide
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "w" || e.key === "W") && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        setWeekend((w) => !w);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return <Ctx.Provider value={useMemo(() => ({ weekend, setWeekend }), [weekend])}>{children}</Ctx.Provider>;
}

export function useSiteWeekend() {
  return useContext(Ctx);
}

/**
 * Shared weekend flip: hovering one portrait flips all portraits on the page.
 * Consumers can pass `flip` to keep their own hover state only.
 */
export function useWeekend(flip: boolean) {
  const { weekend } = useContext(Ctx);
  return weekend || flip;
}

/**
 * <AndrePhoto /> — drop-in portrait that flips to Weekend on hover (page-wide),
 * with blur-dissolve transition, mono mode label and corner crosshair.
 */
export function AndrePhoto({
  className = "",
  imgClassName = "",
  label,
  style,
  tilt = false,
  clipPath = "polygon(0 0, calc(100% - 3rem) 0, 100% 3rem, 100% 100%, 0 100%)",
}: {
  className?: string;
  imgClassName?: string;
  label?: string;
  style?: React.CSSProperties;
  tilt?: boolean;
  clipPath?: string;
}) {
  const [flip, setFlip] = useState(false);
  const showWeekend = useWeekend(flip);
  const ref = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const wrap = ref.current;
    if (!wrap || !tilt) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setTiltStyle({
        transform: `perspective(900px) rotateX(${py * -6}deg) rotateY(${px * 6}deg)`,
        willChange: "transform",
      });
    };
    const onLeave = () => setTiltStyle({});
    wrap.addEventListener("mousemove", onMove as EventListener);
    wrap.addEventListener("mouseleave", onLeave as EventListener);
    return () => {
      wrap.removeEventListener("mousemove", onMove as EventListener);
      wrap.removeEventListener("mouseleave", onLeave as EventListener);
    };
  }, [tilt]);

  return (
    <div
      ref={ref}
      className={`group relative select-none ${className}`}
      onPointerEnter={() => setFlip(true)}
      onPointerLeave={() => setFlip(false)}
      style={style}
    >
      {/* sharp accent frame: thin offset outline echoing the clipped corner */}
      <div
        className="pointer-events-none absolute inset-0 translate-x-2 translate-y-2 border border-white/15 transition-colors duration-500 group-hover:border-white/35"
        style={{ clipPath: "polygon(0 0, calc(100% - 3rem) 0, 100% 3rem, 100% 100%, 0 100%)" }}
        aria-hidden="true"
      />
      <div className="relative overflow-hidden" style={{ clipPath }}>
        <img
          key={showWeekend ? "weekend" : "dev"}
          src={showWeekend ? IMG_ANDRE_WEEKEND : IMG_ANDRE_DEV}
          alt={showWeekend ? "Andre Astika — Weekend mode (cap & shades)" : "Andre Astika — Developer mode"}
          className={`h-full w-auto animate-[photo-in_0.7s_cubic-bezier(0.23,1,0.32,1)_both] object-cover object-top ${imgClassName}`}
          style={{ filter: "grayscale(100%) contrast(1.05)" }}
          draggable={false}
        />
        {/* hover hint */}
        <span
          className={`font-label pointer-events-none absolute inset-x-0 bottom-0 bg-black/80 px-4 py-2 text-center text-[9px] uppercase tracking-[0.3em] text-white/70 backdrop-blur-sm transition-transform duration-500 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] ${
            flip ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {showWeekend ? "(Hover) — Weekend mode ✦" : "Hover me — Weekend mode →"}
        </span>
        {/* scanlines in dev mode */}
        <span
          className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
            showWeekend ? "opacity-0" : "opacity-100"
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
        key={showWeekend ? "wk" : "dv"}
        className="font-label pointer-events-none absolute -bottom-4 left-4 animate-[fade-up_0.5s_cubic-bezier(0.23,1,0.32,1)_both] border border-white/25 bg-black/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/70 backdrop-blur-sm"
      >
        {label ?? (showWeekend ? "(Mode) — Weekend · Bali, ID" : "(Mode) — Developer · Bali, ID")}
      </span>
      {/* corner crosshair */}
      <span className="font-display pointer-events-none absolute -left-6 -top-6 text-xl text-white/25" aria-hidden="true">
        ✦
      </span>
    </div>
  );
}
