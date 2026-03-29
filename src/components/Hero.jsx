import { useRef } from "react";
import { useParallax } from "../hooks/useParallax";
import arrow from "./../public/arrow.svg";
import video from "./../public/video.mp4";

export default function Hero() {
  const sectionRef = useRef(null);

  // smaller values = more subtle depth
  const titleOffset = useParallax(sectionRef, 0.08);
  const subtitleOffset = useParallax(sectionRef, 0.16);
  const scrollOffset = useParallax(sectionRef, 0.24);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative w-full h-[130vh] overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-55"
        autoPlay
        muted
        loop
        playsInline
        src={video}
      />

      {/* Parallax Content */}
      <div className="relative -mt-32 z-10 px-6 select-none pointer-events-none">
        {/* Title */}
        <div
          style={{
            transform: ` translateY(${scrollOffset}px)`,
            willChange: "transform",
          }}
        >
          <h1
            className=" leading-[0.9] mb-0"
            style={{
                color: "white",
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(4rem, 14vw, 8rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
            }}
          >
            THE <em className="text-[#C9A84C]">ART </em>OF  WHISKEY
          </h1>
        </div>

        {/* Description */}
        <div
          className="absolute right-10"
          style={{
            transform: `translateY(${subtitleOffset}px)`,
            willChange: "transform",
          }}
        >
          <div className="text-[#9f916a] font-medium backdrop-blur-md rounded-2xl bg-black/10 p-3 text-[11px] w-[400px] tracking-[0.1em] shadow-2xl uppercase">
            <p>
              An intimate tasting room where the world's finest whiskies become
              the language of extraordinary evenings. Eight seats. One world.
            </p>
            <p className="mt-1">
              A quiet space for refined moments, where every pour tells a story
              and every conversation lingers.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 pointer-events-none"
        style={{
          transform: `translateX(-50%) translateY(${scrollOffset}px)`,
          willChange: "transform",
        }}
      >
        <span className="text-white/25 text-[9px] tracking-[0.5em] uppercase">
          Scroll
        </span>
        <div className="flex justify-center">
          <div className="animate-bounce text-white/70 text-xl">
            <img src={arrow} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}