import { useEffect, useState } from "react";
import logo from "../public/logo.svg";

// ── Hero Section ──────────────────────────────
import arrow from "../public/arrow.png";
import video from "./../public/video.mp4";

// ── Parallax Section ─────────────────────────────
import beach from "./../public/beach.jpg"
import logo1 from "./../public/logo.svg"

// ── Waterturn Section ───────────────────────────
import bottle1 from "./../public/bottle1.png"
import bottle2 from "./../public/bottle2.png"
import bottle3 from "./../public/bottle3.png"
import bottle4 from "./../public/bottle4.png"

// ── About Section ──────────────────────────
import aboutHero from "../public/advert.jpeg";
import video2 from "../public/video2.mp4"
import celebr8Card from "../public/celebr8-card.jpeg";

// ── Discover Section ──────────────────────────────
import pourSceneImg from "../assets/pour-scene.jpg";

// ── ScrollShowcase Section ──────────────────────────────
import donJulio from "./../assets/bottles/don-julio.jpg";
import johnnieWalker from "./../assets/bottles/johnnie-walker.jpg";
import tanqueray from "./../assets/bottles/tanqueray.jpg";
import ciroc from "./../assets/bottles/ciroc.jpg";
import baileys from "./../assets/bottles/baileys.jpg";
import smirnoff from "./../assets/bottles/smirnoff.jpg";

// ─────────────────────────────────────────────
const MEDIA_ASSETS = [
  // Hero
  { type: "image", src: arrow },
  { type: "video", src: video },

  // ParallaxSection
  { type: "image", src: beach },
  { type: "image", src: logo1 },

  // Waterturn
  { type: "image", src: bottle1 },
  { type: "image", src: bottle2 },
  { type: "image", src: bottle3 },
   { type: "image", src: bottle4 },

  // About
  { type: "video", src: video2 },
  { type: "image", src: aboutHero },
  { type: "image", src: celebr8Card },

  // Discover
  { type: "image", src: pourSceneImg },

   // ScrollShowcase
  { type: "image", src: donJulio },
  { type: "image", src: johnnieWalker },
  { type: "image", src: tanqueray },
   { type: "image", src: baileys },
   { type: "image", src: ciroc },
   { type: "image", src: smirnoff },
];

// ─────────────────────────────────────────────

export default function Loader({ onComplete }) {
  const [counter, setCounter] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [slicePhase, setSlicePhase] = useState("idle"); // idle → dropping → splitting

  // ── Real asset loading ────────────────────────
  useEffect(() => {
    let loadedCount = 0;
    const total = MEDIA_ASSETS.length;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= total) {
        setLoaded(true);
      }
    };

    MEDIA_ASSETS.forEach(({ type, src }) => {
      if (type === "image") {
        const img = new Image();
        img.onload = checkAllLoaded;
        img.onerror = checkAllLoaded; // count errors so we never hang
        img.src = src;
      } else if (type === "video") {
        const vid = document.createElement("video");
        vid.preload = "auto";
        vid.oncanplaythrough = checkAllLoaded;
        vid.onerror = checkAllLoaded;
        vid.src = src;
        vid.load();
      }
    });

    // Fallback: force complete after 8s on slow connections
    const fallback = setTimeout(() => setLoaded(true), 8000);
    return () => clearTimeout(fallback);
  }, []);

  // ── Counter animation ─────────────────────────
  // Crawls to 90% on its own, jumps to 100 when truly loaded
  useEffect(() => {
    if (loaded) {
      setCounter(100);
      return;
    }

    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 90) return 90; // hold at 90 until real load
        return prev + Math.floor(Math.random() * 4) + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [loaded]);

  // ── Curtain animation sequence ────────────────
  useEffect(() => {
    if (!loaded) return;

    // Wait for counter to visually snap to 100, then animate
    const t1 = setTimeout(() => setSlicePhase("dropping"), 500);
    const t2 = setTimeout(() => setSlicePhase("splitting"), 1200);
    const t3 = setTimeout(() => onComplete?.(), 2400); // tell parent we're done

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [loaded]);

  const isSplitting = slicePhase === "splitting";

  return (
    <div
      className="fixed inset-0 z-[9999] flex overflow-hidden"
      style={{ pointerEvents: loaded ? "none" : "all" }}
    >
      {/* ── Left Curtain Panel ───────────────────── */}
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

      {/* ── Right Curtain Panel ──────────────────── */}
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

      {/* ── Center Logo — fades out when loaded ──── */}
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
            className="absolute top-0 left-0 h-full bg-white/60 transition-all duration-300"
            style={{ width: `${counter}%` }}
          />
        </div>
      </div>

      {/* ── Dropping line ────────────────────────── */}
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

      {/* ── Orange accent lines ──────────────────── */}
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