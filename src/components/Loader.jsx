import { useEffect, useState } from "react";
import logo from "../public/logo.svg";

export default function Loader({ loaded, curtainOpen }) {
  const [counter, setCounter] = useState(0);
  const [slicePhase, setSlicePhase] = useState("idle"); // idle → dropping → splitting → done

  // Counter animation
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

  // Trigger slice sequence when `loaded` becomes true
  useEffect(() => {
    if (!loaded) return;

    // 1. Start dropping line after logo fades (400ms fade + small buffer)
    const t1 = setTimeout(() => setSlicePhase("dropping"), 500);

    // 2. Switch to splitting (curtains open) after line finishes dropping
    const t2 = setTimeout(() => setSlicePhase("splitting"), 500 + 700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [loaded]);

  // if (curtainOpen) return null;

  const isSplitting = slicePhase === "splitting";

  return (
    <div
      className="fixed inset-0 z-[9999] flex overflow-hidden"
      style={{ pointerEvents: loaded ? "none" : "all" }}
    >
      {/* Left Curtain Panel */}
      <div
        className="relative w-1/2 h-full bg-[#0a0a0a] flex items-center justify-end overflow-hidden"
        style={{
          transform: isSplitting ? "translateX(-100%)" : "translateX(0)",
          transition: isSplitting
            ? "transform 1.2s cubic-bezier(0.76, 0, 0.24, 1)"
            : "none",
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${(i + 1) * 12.5}%`,
              background:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.03), transparent)",
            }}
          />
        ))}
        <div className="pr-8 flex flex-col items-end">
          
          <div
            className="text-white text-6xl font-thin tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {Math.min(counter, 100)}
            <span className="text-white/30 text-2xl">%</span>
          </div>
        </div>
      </div>

      {/* Right Curtain Panel */}
      <div
        className="relative w-1/2 h-full bg-[#0a0a0a] flex items-center justify-start overflow-hidden"
        style={{
          transform: isSplitting ? "translateX(100%)" : "translateX(0)",
          transition: isSplitting
            ? "transform 1.2s cubic-bezier(0.76, 0, 0.24, 1)"
            : "none",
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${(i + 1) * 12.5}%`,
              background:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.03), transparent)",
            }}
          />
        ))}
        <div className="pl-8">
          <div
            className="text-white/10 text-[120px] font-black leading-none select-none"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            8
          </div>
        </div>
      </div>

      {/* Center Logo / Brand — fades out when loaded */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
        style={{
          opacity: loaded ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      >
        <div className="mb-6">
          <img src={logo} alt="" />
        </div>
        <div className="w-48 h-px bg-white/10 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-white/60 transition-all duration-100"
            style={{ width: `${counter}%` }}
          />
        </div>
      </div>

      {/* Dropping line — vertical black line that falls from top */}
      {slicePhase === "dropping" && (
        <div
          className="absolute left-1/2 bg-white z-50"
          style={{
            width: "2px",
            marginLeft: "-1px",
            top: 0,
            height: 0,
            animation: "dropLineDown 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        />
      )}

      {/* Orange accent lines that follow the curtains out */}
      {isSplitting && (
        <>
          <div
            className="absolute top-0 bottom-0 bg-orange-500 z-40"
            style={{
              left: "calc(50% - 1px)",
              width: "2px",
              transform: "translateX(-100vw)",
              transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <div
            className="absolute top-0 bottom-0 bg-orange-500 z-40"
            style={{
              left: "calc(50% - 1px)",
              width: "2px",
              transform: "translateX(100vw)",
              transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </>
      )}

      <style>{`
        @keyframes dropLineDown {
          from { height: 0; }
          to { height: 100vh; }
        }
      `}</style>
    </div>
  );
}