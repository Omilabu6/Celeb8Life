import { useRef, useEffect, useState } from "react";
import bottle1 from "./../public/bottle1.png"
import bottle2 from "./../public/bottle2.png"
import bottle3 from "./../public/bottle3.png"
import bottle4 from "./../public/bottle4.png"


function norm(val, min, max) {
  return Math.max(0, Math.min(1, (val - min) / (max - min)));
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}

const SET_1 = {
  topRight: {
    img:bottle1,
  },
  bottomRight: {
    img:bottle2,
  },
};

const SET_2 = {
  topLeft: {
    img: bottle3,
  },
  bottomLeft: {
    img:bottle4,
  },
};

const rotateMap = {
  "top-right":    -4,
  "bottom-right":  3,
  "top-left":      4,
  "bottom-left":  -3,
};

function Card({ data, progress, enterAt, peakAt, exitAt, doneAt, position }) {
  const enterP = norm(progress, enterAt, peakAt);
  const exitP  = norm(progress, exitAt,  doneAt);

  const isRight = position.includes("right");
  const isTop   = position.includes("top");

  const xEnter = isRight ? lerp(140, 0, enterP) : lerp(-140, 0, enterP);
  const yEnter = isTop   ? lerp(-30, 0, enterP) : lerp(30, 0, enterP);

  const xExit = isRight ? lerp(0, 120, exitP) : lerp(0, -120, exitP);
  const yExit = isTop   ? lerp(0, -24, exitP) : lerp(0, 24, exitP);

  const x = exitP > 0 ? xExit : xEnter;
  const y = exitP > 0 ? yExit : yEnter;

  const opacity =
    exitP > 0 ? lerp(1, 0, exitP) : lerp(0, 1, enterP);

  const scale =
    exitP > 0 ? lerp(1, 0.97, exitP) : lerp(0.95, 1, enterP);

  // Tilt: exaggerated on enter/exit, settles to base angle at peak
  const baseTilt   = rotateMap[position];
  const tiltEnter  = lerp(baseTilt * 2.5, baseTilt, enterP);
  const tiltExit   = lerp(baseTilt, baseTilt * 2, exitP);
  const rotate     = exitP > 0 ? tiltExit : tiltEnter;

  const posStyle = {
    "top-right":    { top: "8vh",    right: "3vw" },
    "bottom-right": { bottom: "8vh", right: "3vw" },
    "top-left":     { top: "8vh",    left: "3vw"  },
    "bottom-left":  { bottom: "8vh", left: "3vw"  },
  }[position];

  return (
    <div
      className="absolute w-64 pointer-events-none"
      style={{
        ...posStyle,
        transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`,
        opacity,
        willChange: "transform, opacity",
        zIndex: 20,
      }}
    >
      <div
        className="overflow-hidden border"
        style={{ borderRadius: "3px" }}
      >
        <div className="relative h-[300px] overflow-hidden">
          <img
            src={data.img}
            alt=""
            className="w-full rounded-2xl  h-full object-cover "
          />
        </div>
      </div>
    </div>
  );
}

export default function WaterBornSection() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const scrolled    = -el.getBoundingClientRect().top;
      const totalScroll = el.offsetHeight - window.innerHeight;
      setProgress(Math.max(0, Math.min(1, scrolled / totalScroll)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const titleY  = lerp(0, -50, progress);
  const bgScale = 1 + progress * 0.035;

  return (
    <div ref={containerRef} className="relative " style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0d0b08]">

        <div
          className="absolute bg-[#f0ece4] inset-0 pointer-events-none"
          style={{ transform: `scale(${bgScale})`, willChange: "transform" }}
        />

        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundSize: "160px" }}
        />

        <div
          className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none"
          style={{ transform: `translateY(${titleY}px)`, willChange: "transform" }}
        >
          <div className="text-amber-400/35 text-[9px] tracking-[0.75em] uppercase font-light mb-7">
            The Tasting Room
          </div>

          <h2
            className="text-center w-[500px]  italic leading-none mb-5"
            style={{
             fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(4.5rem, 13vw, 3rem)",
              fontWeight: 300,
              color: "#C9A84C",
              letterSpacing: "-0.025em",
            }}
          >
            We return to the essence <br /> of <br /> Whiskey
          </h2>

          <p className="text-black text-[10px] tracking-[0.4em] uppercase font-medium text-center leading-loose">
            NO SHORTCUT · NO EXCESS
          </p>

          <div className="flex items-center gap-4 mt-8">
            <p className="text-black w-[340px] text-[10px] tracking-[0.1em] uppercase font-medium text-center">
              In a world of noise, we choose intention.
              Every pour, every note, every moment is curated with care.
              It's not about more
              it's about precision, depth, and the quiet confidence of doing things right.
              We remove what isn't necessary,
              and let the experience speak for itself.
            </p>
          </div>
        </div>

        {/* SET 1 */}
        <Card
          data={SET_1.topRight}
          progress={progress}
          enterAt={0.15} peakAt={0.27}
          exitAt={0.42}  doneAt={0.54}
          position="top-left"
        />
        <Card
          data={SET_1.bottomRight}
          progress={progress}
          enterAt={0.19} peakAt={0.30}
          exitAt={0.42}  doneAt={0.54}
          position="bottom-right"
        />

        {/* SET 2 */}
        <Card
          data={SET_2.topLeft}
          progress={progress}
          enterAt={0.58} peakAt={0.69}
          exitAt={0.78}  doneAt={0.88}
          position="top-right"
        />
        <Card
          data={SET_2.bottomLeft}
          progress={progress}
          enterAt={0.62} peakAt={0.72}
          exitAt={0.78}  doneAt={0.88}
          position="bottom-left"
        />

        {/* Scroll progress bar */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-px h-28 bg-white/5 pointer-events-none">
          <div
            className="w-full bg-amber-400/35"
            style={{ height: `${progress * 100}%`, transition: "height 0.05s linear" }}
          />
        </div>
      </div>
    </div>
  );
}