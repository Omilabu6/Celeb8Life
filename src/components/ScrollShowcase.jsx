import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealText , FadeUp} from "./Reveal";
import donJulio from "./../assets/bottles/don-julio.jpg"
import johnnieWalker from "./../assets/bottles/johnnie-walker.jpg";
import tanqueray from "./../assets/bottles/tanqueray.jpg";
import ciroc from "./../assets/bottles/ciroc.jpg";
import baileys from "./../assets/bottles/baileys.jpg";
import smirnoff from "./../assets/bottles/smirnoff.jpg";

const slides = [
  {
    image: donJulio,
    category: "Architecture",
    title: "Sculpted Silence",
  },
  {
    image: johnnieWalker,
    category: "Technology",
    title: "Solea Laser",
  },
  {
    image: tanqueray,
    category: "Automotive",
    title: "Engineered Desire",
  },
  {
    image: ciroc ,
    category: "Horology",
    title: "Time, Perfected",
  },
  {
    image:baileys,
    category: "Fashion",
    title: "The Silhouette",
    items: ["Avant-garde cuts", "Structured drama", "Editorial edge"],
  },
{
    image:smirnoff,
    category: "Marine",
    title: "Horizon Bound",
  },
];

const SLIDE_COUNT = slides.length;

// ─── SlideImage ───────────────────────────────────────────────────────────────
function SlideImage({ slide, index, scrollYProgress }) {
  const segmentSize = 1 / SLIDE_COUNT;
  const start = index * segmentSize;

  const y = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1]
      : [start - segmentSize * 0.3, start + segmentSize * 0.3],
    index === 0 ? ["0%", "0%"] : ["100%", "0%"]
  );

  const scale = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.5],
    [1.05, 1]
  );

  return (
    <motion.div className="absolute inset-0" style={{ y, zIndex: index }}>
      <motion.img
        src={slide.image}
        alt={slide.title}
        className="w-full h-full object-cover"
        loading={index === 0 ? undefined : "lazy"}
        width={960}
        height={1200}
        style={{ scale }}
      />
    </motion.div>
  );
}

// ─── SlideText ────────────────────────────────────────────────────────────────
function SlideText({ slide, index, scrollYProgress }) {
  const segmentSize = 1 / SLIDE_COUNT;
  const start = index * segmentSize;
  const end = (index + 1) * segmentSize;

  const isFirst = index === 0;
  const isLast = index === SLIDE_COUNT - 1;

  const ENTER_FRAC = 0.25;
  const EXIT_FRAC = 0.25;

  const inStart = start - segmentSize * ENTER_FRAC;
  const inEnd = start + segmentSize * ENTER_FRAC;
  const outStart = end - segmentSize * EXIT_FRAC;
  const outEnd = end + segmentSize * EXIT_FRAC;

  let yInput, yOutput;
  if (isFirst) {
    yInput = [0, outStart, outEnd];
    yOutput = ["0%", "0%", "-60%"];
  } else if (isLast) {
    yInput = [Math.max(0, inStart), inEnd, 1];
    yOutput = ["60%", "0%", "0%"];
  } else {
    const safeOutStart = Math.max(outStart, inEnd + 0.001);
    const safeOutEnd = Math.max(outEnd, safeOutStart + 0.001);
    yInput = [Math.max(0, inStart), inEnd, safeOutStart, safeOutEnd];
    yOutput = ["60%", "0%", "0%", "-60%"];
  }

  let opacityInput, opacityOutput;
  if (isFirst) {
    opacityInput = [0, outStart, outStart + 0.001];
    opacityOutput = [1, 1, 0];
  } else if (isLast) {
    opacityInput = [Math.max(0, inStart), inEnd, 1];
    opacityOutput = [0, 1, 1];
  } else {
    const safeOutStart = Math.max(outStart, inEnd + 0.001);
    const safeOutEnd = Math.max(outEnd, safeOutStart + 0.001);
    opacityInput = [Math.max(0, inStart), inEnd, safeOutStart, safeOutEnd];
    opacityOutput = [0, 1, 1, 0];
  }

  let zInput, zOutput;
  const TOP = SLIDE_COUNT + 1;
  const BURIED = 0;
  if (isFirst) {
    zInput = [0, outStart - 0.001, outEnd];
    zOutput = [TOP, TOP, BURIED];
  } else if (isLast) {
    zInput = [Math.max(0, inStart - 0.001), inStart, 1];
    zOutput = [BURIED, TOP, TOP];
  } else {
    const safeOutStart = Math.max(outStart, inEnd + 0.001);
    const safeOutEnd = Math.max(outEnd, safeOutStart + 0.001);
    zInput = [
      Math.max(0, inStart - 0.001),
      inStart,
      safeOutEnd - 0.001,
      safeOutEnd,
    ];
    zOutput = [BURIED, TOP, TOP, BURIED];
  }

  const y = useTransform(scrollYProgress, yInput, yOutput);
  const opacity = useTransform(scrollYProgress, opacityInput, opacityOutput);
  const zIndex = useTransform(scrollYProgress, zInput, zOutput);

  const numberStr = String(index + 1).padStart(2, "0");
  const totalStr = String(SLIDE_COUNT).padStart(2, "0");

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      style={{ y, opacity, zIndex }}
    >
      {/* Slide number — top of text pane */}
      <p
        style={{
          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
          fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
          color: "#1a1a1a",
          letterSpacing: "0.05em",
          marginBottom: "clamp(1.5rem, 3vh, 2.5rem)",
        }}
      >
        <span style={{ fontWeight: 400 }}>{numberStr}</span>
        <span style={{ color: "#999", fontSize: "0.85em" }}>
          {" "}
          / {totalStr}
        </span>
      </p>

      {/* Category + top rule */}
      <div style={{ borderTop: "1px solid #ccc", paddingTop: "0.75rem", marginBottom: "0.75rem" }}>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            fontSize: "clamp(0.7rem, 1vw, 0.85rem)",
            color: "#888",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 0,
          }}
        >
          {slide.category}
        </p>
      </div>

      {/* Title */}
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
          fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)",
          fontWeight: 400,
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          color: "#1a1a1a",
          margin: "0 0 clamp(1.5rem, 3vh, 2.5rem) 0",
        }}
      >
        {slide.title}
      </h2>

      {/* Items list — each with separator and "Learn More" */}
      {slide.items && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {slide.items.map((item, i) => (
            <li
              key={item}
              style={{
                borderTop: i === 0 ? "1px solid #ccc" : "none",
                borderBottom: "1px solid #ccc",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "clamp(0.6rem, 1.2vh, 1rem) 0",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                    fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
                    fontWeight: 400,
                    color: i === 0 ? "#1a1a1a" : "#bbb",
                    letterSpacing: "-0.01em",
                    transition: "color 0.2s",
                  }}
                >
                  {item}
                </span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                    fontSize: "clamp(0.65rem, 0.9vw, 0.8rem)",
                    color: i === 0 ? "#555" : "#ccc",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    marginLeft: "1rem",
                  }}
                >
                  Learn More
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

// ─── ScrollShowcase ───────────────────────────────────────────────────────────
export default function ScrollShowcase() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{
        height: `${SLIDE_COUNT * 100}vh`,
        background: "#f5f4f0",
      }}
    >
      <div className="py-36 text-center">
            <FadeUp>
            <p className="text-black text-center text-[10px] tracking-[0.6em] uppercase mb-6 font-medium">
                Choose Your Experience
            </p>
            </FadeUp>
        {/* Heading */}
        <h2
            className="text-center "
            style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.8rem, 6vw, 7rem)",
            fontWeight: 300,
            color: "#C9A84C",
            lineHeight: 1.05,
            }}
        >
            <RevealText text="A ceremony" />
            <br />
            <RevealText text="that" delay={0.15} />
            <RevealText text="moves" delay={0.25} className="italic" />
            <RevealText text=" the palate." delay={0.35} />
        </h2>
    </div>
      {/* Sticky viewport */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center"
        style={{ background: "#f5f4f0" }}
      >
        {/* Slide number — far left */}
        <div
          style={{
            position: "absolute",
            left: "clamp(1.5rem, 3vw, 3rem)",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <div style={{ position: "relative", height: "8rem", width: "5rem" }}>
            {slides.map((_, i) => {
              const segmentSize = 1 / SLIDE_COUNT;
              const start = i * segmentSize;
              const end = (i + 1) * segmentSize;
              const isFirst = i === 0;
              const isLast = i === SLIDE_COUNT - 1;
              const ENTER_FRAC = 0.25;
              const EXIT_FRAC = 0.25;
              const inStart = start - segmentSize * ENTER_FRAC;
              const inEnd = start + segmentSize * ENTER_FRAC;
              const outStart = end - segmentSize * EXIT_FRAC;
              const outEnd = end + segmentSize * EXIT_FRAC;

              let opIn, opOut;
              if (isFirst) {
                opIn = [0, outStart, outStart + 0.001];
                opOut = [1, 1, 0];
              } else if (isLast) {
                opIn = [Math.max(0, inStart), inEnd, 1];
                opOut = [0, 1, 1];
              } else {
                const s = Math.max(outStart, inEnd + 0.001);
                const e = Math.max(outEnd, s + 0.001);
                opIn = [Math.max(0, inStart), inEnd, s, e];
                opOut = [0, 1, 1, 0];
              }

              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(scrollYProgress, opIn, opOut);
              const num = String(i + 1).padStart(2, "0");
              const tot = String(SLIDE_COUNT).padStart(2, "0");

              return (
                <motion.div
                  key={i}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    opacity,
                    zIndex: i,
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                      fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                      fontWeight: 400,
                      color: "#1a1a1a",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {num}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                      fontSize: "clamp(0.75rem, 1.1vw, 1rem)",
                      color: "#999",
                      marginLeft: "0.3rem",
                    }}
                  >
                    / {tot}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Main grid: image + text */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 4vw, 5rem)",
            padding: "0 clamp(5rem, 10vw, 10rem) 0 clamp(5rem, 8vw, 8rem)",
            width: "100%",
            alignItems: "center",
          }}
        >
          {/* LEFT — Image */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "3/4",
              maxHeight: "72vh",
              overflow: "hidden",
              borderRadius: "0.25rem",
              background: "#ddd",
            }}
          >
            {slides.map((slide, i) => (
              <SlideImage
                key={i}
                slide={slide}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          {/* RIGHT — Text */}
          <div style={{ position: "relative", height: "65vh", overflow: "hidden" }}>
            {slides.map((slide, i) => (
              <SlideText
                key={i}
                slide={slide}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}