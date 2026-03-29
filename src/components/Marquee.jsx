/**
 * Marquee — infinitely scrolling horizontal text ticker.
 * speed controls how fast it moves (px/s equivalent via animation duration).
 * direction: "left" | "right"
 */
export default function Marquee({
  items = [],
  speed = 30,
  direction = "left",
  className = "",
  separator = "·",
}) {
  const list = [...items, ...items, ...items, ...items]; // duplicate for seamless loop

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="inline-flex items-center gap-8"
        style={{
          animation: `marquee${direction === "right" ? "Right" : "Left"} ${speed}s linear infinite`,
          willChange: "transform",
        }}
      >
        {list.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-8 shrink-0">
            <span>{item}</span>
            <span className="opacity-30">{separator}</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
