

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import pourSceneImg from "../assets/pour-scene.jpg";

const TASTING_NOTES = [
  {
    title: "SMOKY",
    description:
      "Deep, layered, and unmistakably bold. Smoky expressions carry notes of peat, charred wood, and a lingering warmth that unfolds with every sip.",
    position: "bottom-right",
  },
  {
    title: "SWEET",
    description:
      "Smooth, rich, and inviting. Sweet notes reveal hints of honey, vanilla, and caramel, creating a balanced warmth that lingers gently on the palate.",
    position: "top-left",
  },
  {
    title: "SPICY",
    description:
      "Warm, vibrant, and full of character. Spicy notes bring hints of pepper, cinnamon, and subtle heat that add depth and intensity to every sip.",
    position: "bottom-right",
  },
  {
    title: "FRUITY",
    description:
      "Bright, vibrant, and expressive. Fruity notes bring hints of citrus, orchard fruits, and subtle sweetness, adding a lively character to every sip.",
    position: "top-left",
  },
];

const POSITION_CLASSES = {
  "top-left": "left-[8%] top-[12%] text-left items-start",
  "bottom-right": "right-[8%] bottom-[12%] text-right items-end",
};

const TIMINGS = [
  { fadeIn: 0.05, peak: 0.12, fadeOut: 0.18, end: 0.24 },
  { fadeIn: 0.26, peak: 0.33, fadeOut: 0.42, end: 0.48 },
  { fadeIn: 0.50, peak: 0.57, fadeOut: 0.66, end: 0.72 },
  { fadeIn: 0.74, peak: 0.81, fadeOut: 0.88, end: 0.93 },
];

function TastingNote({ note, index, scrollYProgress }) {
  const { fadeIn, peak, fadeOut, end } = TIMINGS[index];
  const isBottom = note.position === "bottom-right";

  const opacity = useTransform(
    scrollYProgress,
    [fadeIn, peak, fadeOut, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [fadeIn, peak, fadeOut, end],
    isBottom ? [30, 0, 0, -30] : [-30, 0, 0, 30]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute z-30 w-[38%] flex flex-col gap-2 pointer-events-none ${POSITION_CLASSES[note.position]}`}
    >
      <h3 className="text-2xl font-semibold tracking-widest" style={{ color: '#C9A84C' }}>
        {note.title}
      </h3>
      <p className="text-sm md:text-base max-w-sm leading-relaxed font-light" style={{ color: 'rgba(240, 236, 228, 1)' }}>
        {note.description}
      </p>
    </motion.div>
  );
}

export default function PourSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [1, 1.4, 1.4, 1.1]
  );
  const imgX = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    ["0%", "-5%", "-5%", "0%"]
  );
  const imgY = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    ["0%", "-8%", "-8%", "0%"]
  );

  const vignetteOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.96, 1],
    [0.2, 0.7, 0.7, 0.2]
  );

  return (
    <div ref={containerRef} className="relative" style={{ height: "900vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Pour scene image with zoom */}
        <motion.div
          className="absolute inset-0"
          style={{ scale, x: imgX, y: imgY }}
        >
          <img
            src={pourSceneImg}
            alt="Premium whisky being poured into a crystal glass"
            className="w-full h-full object-cover"
            width={1920}
            height={1280}
          />
        </motion.div>

        {/* Dark vignette */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: vignetteOpacity,
            background:
              "radial-gradient(ellipse at center, transparent 25%, black 85%)",
          }}
        />

        {/* Subtle amber glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background:
              "radial-gradient(circle at 55% 45%, rgba(212,175,55,0.15) 0%, transparent 60%)",
          }}
        />

        {/* Tasting notes one by one */}
        {TASTING_NOTES.map((note, i) => (
          <TastingNote
            key={note.title}
            note={note}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}
