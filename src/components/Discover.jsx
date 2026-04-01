import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import pourSceneImg from "./../assets/pour-scene.jpg";

const NOTE_PAIRS = [
  [
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
  ],
  [
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
  ],
];

const POSITION_CLASSES = {
  "top-left":     "left-[8%] top-[12%] text-left items-start",
  "bottom-right": "right-[8%] bottom-[12%] text-right items-end",
};

const PAIR_TIMINGS = [
  { fadeIn: 0.18, peak: 0.22, fadeOut: 0.38, end: 0.44 },
  { fadeIn: 0.52, peak: 0.58, fadeOut: 0.74, end: 0.82 },
];

function NotePair({ pair, index, scrollYProgress }) {
  const { fadeIn, peak, fadeOut, end } = PAIR_TIMINGS[index];

  const opacity = useTransform(
    scrollYProgress,
    [fadeIn, peak, fadeOut, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [fadeIn, peak, fadeOut, end],
    [40, 0, 0, -30]
  );

  return (
    <>
      {pair.map((note) => (
        <motion.div
          key={note.title}
          style={{ opacity, y }}
          className={`absolute w-[38%] flex flex-col gap-2 pointer-events-none ${POSITION_CLASSES[note.position]}`}
        >
          <h3 className="font-display text-2xl font-semibold tracking-widest text-[#C9A84C] ">
            {note.title}
          </h3>
          <p className="font-body text-sm md:text-base max-w-sm leading-relaxed font-light text-white">
            {note.description}
          </p>
        </motion.div>
      ))}
    </>
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
    [0, 0.18, 0.82, 1],
    [1, 1.4, 1.4, 1.1]
  );
  const imgX = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    ["0%", "-5%", "-5%", "0%"]
  );
  const imgY = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    ["0%", "-8%", "-8%", "0%"]
  );

  const vignetteOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.44, 0.52, 0.82, 1],
    [0.25, 0.65, 0.65, 0.65, 0.65, 0.25]
  );

  return (
    <div ref={containerRef} className="relative" style={{ height: "700vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
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

        {/* Dark vignette overlay */}
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

        {/* Tasting note pairs */}
        {NOTE_PAIRS.map((pair, i) => (
          <NotePair
            key={i}
            pair={pair}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}