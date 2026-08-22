/* NOIR KINETIC — site-wide Andre photo swap. Portraits can either respond to
   hover or remain static while following the shared Developer / Weekend mode. */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { siteAsset } from "@/lib/siteAsset";

export const IMG_ANDRE_DEV = siteAsset("/manus-storage/andre-profile-img-without_6e47e8ca.webp");
export const IMG_ANDRE_WEEKEND = siteAsset("/manus-storage/andre-profile-img-with_3f7bf32d.webp");
export const BOTTOM_CAPTION_CLASS =
  "font-label pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-black/85 px-4 py-2 text-center text-[9px] uppercase tracking-[0.3em] text-white/70 backdrop-blur-sm";

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
 * <AndrePhoto /> — drop-in portrait with a mode-aware image, optional hover
 * flip, mono mode label, and corner sparkle.
 */
export function AndrePhoto({
  className = "",
  imgClassName = "",
  label,
  style,
  tilt = false,
  hoverFlip = true,
  labelPosition = "outside",
  sparklePlacement = "top-left",
  clipPath = "polygon(0 0, calc(100% - 3rem) 0, 100% 3rem, 100% 100%, 0 100%)",
}: {
  className?: string;
  imgClassName?: string;
  label?: string;
  style?: React.CSSProperties;
  tilt?: boolean;
  hoverFlip?: boolean;
  labelPosition?: "outside" | "chest" | "bottom-bar";
  sparklePlacement?: "top-left" | "top-right";
  clipPath?: string;
}) {
  const [flip, setFlip] = useState(false);
  const showWeekend = useWeekend(hoverFlip && flip);
  const ref = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [weekendReady, setWeekendReady] = useState(false);

  useEffect(() => {
    const weekendImage = new Image();
    const markReady = () => setWeekendReady(true);

    weekendImage.addEventListener("load", markReady);
    weekendImage.src = IMG_ANDRE_WEEKEND;
    if (weekendImage.complete && weekendImage.naturalWidth > 0) markReady();

    return () => weekendImage.removeEventListener("load", markReady);
  }, []);

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
      onPointerEnter={hoverFlip ? () => setFlip(true) : undefined}
      onPointerLeave={hoverFlip ? () => setFlip(false) : undefined}
      style={style}
    >
      {/* sharp accent frame: thin offset outline echoing the clipped corner */}
      <div
        className={`pointer-events-none absolute inset-0 translate-x-2 translate-y-2 border border-white/15 transition-colors duration-500 ${
          hoverFlip ? "group-hover:border-white/35" : ""
        }`}
        style={{ clipPath: "polygon(0 0, calc(100% - 3rem) 0, 100% 3rem, 100% 100%, 0 100%)" }}
        aria-hidden="true"
      />
      <div className="relative overflow-hidden" style={{ clipPath }}>
        <img
          src={IMG_ANDRE_DEV}
          alt="Andre Astika — Developer mode"
          className={`block h-full w-auto object-cover object-top ${imgClassName}`}
          style={{ filter: "grayscale(100%) contrast(1.05)" }}
          draggable={false}
        />
        <img
          src={IMG_ANDRE_WEEKEND}
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 h-full w-full max-w-none object-cover object-top transition-opacity duration-500 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] ${
            showWeekend && weekendReady ? "opacity-100" : "opacity-0"
          }`}
          style={{ filter: "grayscale(100%) contrast(1.05)" }}
          draggable={false}
        />
        {hoverFlip ? (
          <span
            className={`font-label pointer-events-none absolute inset-x-0 bottom-0 bg-black/80 px-4 py-2 text-center text-[9px] uppercase tracking-[0.3em] text-white/70 backdrop-blur-sm transition-transform duration-500 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] ${
              flip ? "translate-y-0" : "translate-y-full"
            }`}
          >
            {showWeekend ? "(Hover) — Weekend mode ✦" : "Hover me — Weekend mode →"}
          </span>
        ) : null}
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
        {labelPosition === "bottom-bar" ? (
          <span
            key={showWeekend ? "wk" : "dv"}
            className={`${BOTTOM_CAPTION_CLASS} animate-[fade-up_0.5s_cubic-bezier(0.23,1,0.32,1)_both]`}
          >
            {label ?? (showWeekend ? "(Mode) — Weekend · Bali, ID" : "(Mode) — Developer · Bali, ID")}
          </span>
        ) : null}
      </div>
      {/* portrait caption */}
      {labelPosition !== "bottom-bar" ? (
        <span
          key={showWeekend ? "wk" : "dv"}
          className={`font-label pointer-events-none absolute animate-[fade-up_0.5s_cubic-bezier(0.23,1,0.32,1)_both] border border-white/25 bg-black/85 uppercase text-white/70 backdrop-blur-sm ${
            labelPosition === "chest"
              ? "left-4 top-[68%] px-3 py-1.5 text-[10px] tracking-[0.3em]"
              : "-bottom-4 left-4 px-3 py-1.5 text-[10px] tracking-[0.3em]"
          }`}
        >
          {label ?? (showWeekend ? "(Mode) — Weekend · Bali, ID" : "(Mode) — Developer · Bali, ID")}
        </span>
      ) : null}
      {/* corner crosshair */}
      <span
        className={`font-display pointer-events-none absolute ${
          sparklePlacement === "top-right" ? "right-0 top-0 md:-right-4 md:-top-2" : "-left-6 -top-6"
        } text-xl text-white/25`}
        aria-hidden="true"
      >
        ✦
      </span>
    </div>
  );
}
