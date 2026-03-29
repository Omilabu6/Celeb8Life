import { useEffect, useState } from "react";

export default function Loader({ loaded, curtainOpen }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 4) + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  if (curtainOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex overflow-hidden"
      style={{ pointerEvents: loaded ? "none" : "all" }}
    >
      {/* Left Curtain Panel */}
      <div
        className="relative w-1/2 h-full bg-[#0a0a0a] flex items-center justify-end overflow-hidden"
        style={{
          transform: loaded ? "translateX(-100%)" : "translateX(0)",
          transition: loaded ? "transform 1.2s cubic-bezier(0.76, 0, 0.24, 1) 0.3s" : "none",
        }}
      >
        {/* Curtain texture lines */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${(i + 1) * 12.5}%`,
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.03), transparent)",
            }}
          />
        ))}
        <div className="pr-8 flex flex-col items-end">
          <div className="text-white/20 text-xs tracking-[0.4em] uppercase mb-3 font-light">
            Loading
          </div>
          <div className="text-white text-6xl font-thin tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            {Math.min(counter, 100)}
            <span className="text-white/30 text-2xl">%</span>
          </div>
        </div>
      </div>

      {/* Right Curtain Panel */}
      <div
        className="relative w-1/2 h-full bg-[#0a0a0a] flex items-center justify-start overflow-hidden"
        style={{
          transform: loaded ? "translateX(100%)" : "translateX(0)",
          transition: loaded ? "transform 1.2s cubic-bezier(0.76, 0, 0.24, 1) 0.3s" : "none",
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${(i + 1) * 12.5}%`,
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.03), transparent)",
            }}
          />
        ))}
        <div className="pl-8">
          <div
            className="text-white/10 text-[120px] font-black leading-none select-none"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            V
          </div>
        </div>
      </div>

      {/* Center Logo / Brand */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
        style={{
          opacity: loaded ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      >
        <div
          className="text-white text-3xl tracking-[0.6em] uppercase font-light mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          VOID
        </div>
        {/* Progress bar */}
        <div className="w-48 h-px bg-white/10 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-white/60 transition-all duration-100"
            style={{ width: `${counter}%` }}
          />
        </div>
      </div>
    </div>
  );
}
