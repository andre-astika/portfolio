/* NOIR KINETIC — custom cursor: lerp dot + label span over [data-cursor] elements. */
import { useCustomCursor } from "@/hooks/useKinetic";

export default function Cursor() {
  const { cursorRef, labelRef } = useCustomCursor();
  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-5 w-5 rounded-full border border-white/60 bg-white/5 backdrop-blur-[1px] transition-[border-color] md:block"
        style={{ willChange: "transform" }}
      >
        <span
          ref={labelRef}
          className="font-label absolute inset-0 flex items-center justify-center text-[8px] uppercase tracking-wider text-white"
        />
      </div>
    </>
  );
}
