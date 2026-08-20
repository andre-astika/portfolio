/*
  NOIR KINETIC — Hero interaction layer.
  Full-bleed monochrome before/after photography with a soft, pointer-following
  brush reveal. The base photo stays visible; the Weekend photo is painted in
  only around the cursor, inspired by the supplied Lumora interaction prompt.
*/
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export type LiquidHeroRevealHandle = {
  move: (clientX: number, clientY: number) => void;
  setActive: (active: boolean) => void;
};

type LiquidHeroRevealProps = {
  baseSrc: string;
  revealSrc: string;
  mode?: "dev" | "weekend";
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const LiquidHeroReveal = forwardRef<
  LiquidHeroRevealHandle,
  LiquidHeroRevealProps
>(function LiquidHeroReveal({ baseSrc, revealSrc, mode = "dev" }, ref) {
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
          "--liquid-radius": "clamp(7rem, 15vw, 15rem)",
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <img
        key={baseSrc}
        src={baseSrc}
        alt=""
        className={`theme-aware-reveal-media theme-aware-reveal-base absolute inset-y-0 right-0 left-auto h-full w-full object-cover object-[58%_50%] grayscale-[0.15] contrast-[1.05] brightness-[0.72] transition-opacity duration-500 md:object-center ${mode === "weekend" ? "opacity-90" : "opacity-40"}`}
        draggable={false}
      />
      <img
        key={revealSrc}
        src={revealSrc}
        alt=""
        className={`theme-aware-reveal-media theme-aware-reveal-hover absolute inset-y-0 right-0 left-auto h-full w-full object-cover object-[58%_50%] grayscale-[0.15] contrast-[1.05] brightness-[0.72] transition-opacity duration-500 md:object-center ${active ? "opacity-60" : "opacity-0"}`}
        style={{
          WebkitMaskImage:
            "radial-gradient(circle var(--liquid-radius) at var(--liquid-x) var(--liquid-y), black 0%, black 30%, rgb(0 0 0 / 0.7) 48%, transparent 100%)",
          maskImage:
            "radial-gradient(circle var(--liquid-radius) at var(--liquid-x) var(--liquid-y), black 0%, black 30%, rgb(0 0 0 / 0.7) 48%, transparent 100%)",
        }}
        draggable={false}
      />
      <span className="liquid-reveal-vignette absolute inset-0 bg-[linear-gradient(90deg,oklch(0.08_0_0/0.99)_0%,oklch(0.08_0_0/0.78)_39%,oklch(0.08_0_0/0.18)_73%,transparent_100%),linear-gradient(0deg,oklch(0.08_0_0/0.85)_0%,transparent_40%,oklch(0.08_0_0/0.34)_100%)]" />
    </div>
  );
});

export default LiquidHeroReveal;
