/*
  NOIR KINETIC — Hero interaction layer.
  Full-bleed monochrome before/after photography with a soft, pointer-following
  brush reveal. The base photo and body stay fixed; only the Weekend head area
  is painted in around the cursor so the hat and glasses are added without
  replacing the torso.
*/
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
} from "react";

export type LiquidHeroRevealHandle = {
  move: (clientX: number, clientY: number) => void;
  setActive: (active: boolean) => void;
};

type LiquidHeroRevealProps = {
  baseSrc: string;
  revealSrc: string;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const LiquidHeroReveal = forwardRef<
  LiquidHeroRevealHandle,
  LiquidHeroRevealProps
>(function LiquidHeroReveal({ baseSrc, revealSrc }, ref) {
  const rootRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0.78, y: 0.46 });
  const currentRef = useRef({ x: 0.78, y: 0.46 });
  const activeRef = useRef(false);
  const [active, setActiveState] = useState(false);

  useImperativeHandle(ref, () => ({
    move(clientX, clientY) {
      const root = rootRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      targetRef.current = {
        x: clamp((clientX - rect.left) / rect.width, 0.04, 0.96),
        y: clamp((clientY - rect.top) / rect.height, 0.04, 0.96),
      };
      if (!activeRef.current) {
        activeRef.current = true;
        setActiveState(true);
      }
    },
    setActive(nextActive) {
      activeRef.current = nextActive;
      setActiveState(nextActive);
    },
  }));

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const stiffness = reduceMotion ? 1 : 0.16;

    const animate = () => {
      currentRef.current.x +=
        (targetRef.current.x - currentRef.current.x) * stiffness;
      currentRef.current.y +=
        (targetRef.current.y - currentRef.current.y) * stiffness;
      root.style.setProperty(
        "--liquid-x",
        `${currentRef.current.x * 100}%`,
      );
      root.style.setProperty(
        "--liquid-y",
        `${currentRef.current.y * 100}%`,
      );
      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      style={
        {
          "--liquid-x": "78%",
          "--liquid-y": "46%",
          "--liquid-radius": "clamp(10rem, 22vw, 24rem)",
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <img
        src={baseSrc}
        alt=""
        className="absolute inset-y-0 right-0 left-auto h-full w-full object-cover object-[66%_50%] opacity-50 grayscale-[0.15] contrast-[1.08] brightness-[0.78] md:w-[76%] md:object-center"
        draggable={false}
      />
      <img
        src={revealSrc}
        alt=""
        className={`absolute inset-y-0 right-0 left-auto h-full w-full object-cover object-[66%_50%] grayscale-[0.1] contrast-[1.2] brightness-[0.92] transition-[opacity,filter] duration-500 md:w-[76%] md:object-center ${active ? "opacity-100" : "opacity-0"}`}
        style={{
          // Keep the body on the base image; this ellipse contains only the head/accessory zone.
          clipPath: "ellipse(34% 35% at 56% 34%)",
          transform: active ? "translate(6px, -3px) scale(1.012)" : "translate(0, 0) scale(1)",
          transformOrigin: "56% 34%",
          WebkitMaskImage:
            "radial-gradient(circle var(--liquid-radius) at var(--liquid-x) var(--liquid-y), black 0%, black 30%, rgb(0 0 0 / 0.7) 48%, transparent 100%)",
          maskImage:
            "radial-gradient(circle var(--liquid-radius) at var(--liquid-x) var(--liquid-y), black 0%, black 30%, rgb(0 0 0 / 0.7) 48%, transparent 100%)",
        }}
        draggable={false}
      />
      <span className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.08_0_0/0.99)_0%,oklch(0.08_0_0/0.78)_39%,oklch(0.08_0_0/0.18)_73%,transparent_100%),linear-gradient(0deg,oklch(0.08_0_0/0.85)_0%,transparent_40%,oklch(0.08_0_0/0.34)_100%)]" />
      <span
        className={`absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 bg-white/10 shadow-[0_0_0_9px_rgb(255_255_255/0.06),0_0_36px_rgb(255_255_255/0.22)] backdrop-blur-[2px] transition-[opacity,transform] duration-300 ${active ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
        style={{ left: "var(--liquid-x)", top: "var(--liquid-y)" }}
      >
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </span>
    </div>
  );
});

export default LiquidHeroReveal;
