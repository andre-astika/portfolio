/* NOIR KINETIC — infinite marquee ticker strips with crosshair separators. */
interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  className?: string;
}

export default function Marquee({ items, reverse, className = "" }: MarqueeProps) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className={`group overflow-hidden border-y border-white/10 py-4 ${className}`} aria-hidden="true">
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
        {row.map((item, i) => (
          <span
            key={i}
            className="font-display flex shrink-0 items-center whitespace-nowrap text-sm uppercase tracking-[0.35em] text-white/60"
          >
            {item}
            <span className="mx-8 text-white/30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
