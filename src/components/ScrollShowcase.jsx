// src/components/ScrollShowcase.tsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealText, FadeUp } from "./Reveal";
import donJulio from "./../assets/bottles/don-julio.jpg"
import johnnieWalker from "./../assets/bottles/johnnie-walker.jpg";
import tanqueray from "./../assets/bottles/tanqueray.jpg";
import ciroc from "./../assets/bottles/ciroc.jpg";
import baileys from "./../assets/bottles/baileys.jpg";
import smirnoff from "./../assets/bottles/smirnoff.jpg";

const placeholderImage = "/placeholder.svg";

const slides = [
  { image: donJulio, category: "Tequila", title: "Refined Agave" },
  { image: johnnieWalker, category: "Whisky", title: "A Journey in Every Step" },
  { image: tanqueray, category: "Gin", title: "Crisp Botanical Balance" },
  { image:   ciroc, category: "Vodka", title: "Distilled Elegance" },
  { image: baileys, category: "Cream Liqueur", title: "Smooth Indulgence" },
  { image:  smirnoff, category: "Vodka", title: "Pure & Timeless" },
];

const SLIDE_COUNT = slides.length;

function SlideImage({ slide, index, scrollYProgress }) {
  const segmentSize = 1 / SLIDE_COUNT;
  const start = index * segmentSize;
  const y = useTransform(scrollYProgress, index === 0 ? [0, 1] : [start - segmentSize * 0.3, start + segmentSize * 0.3], index === 0 ? ["0%", "0%"] : ["100%", "0%"]);
  const scale = useTransform(scrollYProgress, [start, start + segmentSize * 0.5], [1.05, 1]);

  return (
    <motion.div className="absolute inset-0" style={{ y, zIndex: index }}>
      <motion.img src={slide.image} alt={slide.title} className="w-full h-full object-cover" loading={index === 0 ? undefined : "lazy"} width={960} height={1200} style={{ scale }} />
    </motion.div>
  );
}

function SlideText({ slide, index, scrollYProgress }) {
  const segmentSize = 1 / SLIDE_COUNT;
  const start = index * segmentSize;
  const end = (index + 1) * segmentSize;
  const isFirst = index === 0;
  const isLast = index === SLIDE_COUNT - 1;
  const TRANS = segmentSize * 0.15;

  let yInput, yOutput;
  if (isFirst) { yInput = [0, end - TRANS, end]; yOutput = ["0%", "0%", "-60%"]; }
  else if (isLast) { yInput = [start, start + TRANS, 1]; yOutput = ["60%", "0%", "0%"]; }
  else { yInput = [start, start + TRANS, end - TRANS, end]; yOutput = ["60%", "0%", "0%", "-60%"]; }

  let opacityInput, opacityOutput;
  if (isFirst) { opacityInput = [0, end - TRANS, end]; opacityOutput = [1, 1, 0]; }
  else if (isLast) { opacityInput = [start, start + TRANS, 1]; opacityOutput = [0, 1, 1]; }
  else { opacityInput = [start, start + TRANS, end - TRANS, end]; opacityOutput = [0, 1, 1, 0]; }

  const TOP = SLIDE_COUNT + 1, BURIED = 0;
  let zInput, zOutput;
  if (isFirst) { zInput = [0, end - 0.001, end]; zOutput = [TOP, TOP, BURIED]; }
  else if (isLast) { zInput = [start - 0.001, start, 1]; zOutput = [BURIED, TOP, TOP]; }
  else { zInput = [start - 0.001, start, end - 0.001, end]; zOutput = [BURIED, TOP, TOP, BURIED]; }

  const y = useTransform(scrollYProgress, yInput, yOutput);
  const opacity = useTransform(scrollYProgress, opacityInput, opacityOutput);
  const zIndex = useTransform(scrollYProgress, zInput, zOutput);
  const numberStr = String(index + 1).padStart(2, "0");
  const totalStr = String(SLIDE_COUNT).padStart(2, "0");

  return (
    <motion.div className="absolute inset-0 flex flex-col justify-center" style={{ y, opacity, zIndex }}>
      <p className="font-body tracking-[0.05em] text-charcoal mb-6" style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}>
        <span className="font-normal">{numberStr}</span>
        <span className="text-muted-foreground text-[0.85em]"> / {totalStr}</span>
      </p>
      <div className="border-t border-border pt-3 mb-3">
        <p className="font-body text-muted-foreground tracking-[0.12em] uppercase mb-0" style={{ fontSize: "clamp(0.7rem, 1vw, 0.85rem)" }}>
          {slide.category}
        </p>
      </div>
      <h2 className="font-body font-normal text-charcoal" style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.01em", margin: "0 0 clamp(1.5rem, 3vh, 2.5rem) 0" }}>
        {slide.title}
      </h2>
      {slide.items && (
        <ul className="list-none p-0 m-0">
          {slide.items.map((item, i) => (
            <li key={item} className="border-b border-border" style={{ borderTop: i === 0 ? "1px solid hsl(var(--border))" : "none" }}>
              <div className="flex items-center justify-between" style={{ padding: "clamp(0.6rem, 1.2vh, 1rem) 0" }}>
                <span className="font-body font-normal tracking-tight transition-colors duration-200" style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)", color: i === 0 ? "hsl(var(--charcoal))" : "hsl(var(--muted-foreground))" }}>{item}</span>
                <span className="font-body tracking-[0.1em] uppercase cursor-pointer whitespace-nowrap ml-4" style={{ fontSize: "clamp(0.65rem, 0.9vw, 0.8rem)", color: i === 0 ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}>Learn More</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

function SlideNumber({ index, scrollYProgress }) {
  const segmentSize = 1 / SLIDE_COUNT;
  const start = index * segmentSize;
  const end = (index + 1) * segmentSize;
  const isFirst = index === 0;
  const isLast = index === SLIDE_COUNT - 1;
  const TRANS = segmentSize * 0.15;

  let opIn, opOut;
  if (isFirst) { opIn = [0, end - TRANS, end]; opOut = [1, 1, 0]; }
  else if (isLast) { opIn = [start, start + TRANS, 1]; opOut = [0, 1, 1]; }
  else { opIn = [start, start + TRANS, end - TRANS, end]; opOut = [0, 1, 1, 0]; }

  const opacity = useTransform(scrollYProgress, opIn, opOut);
  const num = String(index + 1).padStart(2, "0");
  const tot = String(SLIDE_COUNT).padStart(2, "0");

  return (
    <motion.div className="absolute top-0 left-0 whitespace-nowrap" style={{ opacity, zIndex: index }}>
      <span className="font-body font-normal text-charcoal tracking-tight" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>{num}</span>
      <span className="font-body text-muted-foreground ml-1" style={{ fontSize: "clamp(0.75rem, 1.1vw, 1rem)" }}>/ {tot}</span>
    </motion.div>
  );
}

export default function ScrollShowcase() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <>
      <div className="py-36 text-center bg-[#f0ece4]">
        <FadeUp>
          <p className="text-black text-[10px] tracking-[0.6em] uppercase mb-6 font-light">
            Choose Your Experience
          </p>
        </FadeUp>
        <h2
         className="text-foreground text-[#C9A84C]  leading-[1.05] mb-15"
          style={{
            
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.8rem, 6vw, 7rem)",
            fontWeight: 300,
          }}>
          <RevealText text="A ceremony" /><br />
          <RevealText text="that" delay={0.15} />{" "}
          <RevealText text="moves" delay={0.25} className="italic" />{" "}
          <RevealText text="the palate." delay={0.35} />
        </h2>
      </div>

      <section ref={containerRef} className="relative bg-[#f0ece4]" style={{ height: `${SLIDE_COUNT * 100}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-background">
          <div className="absolute left-[clamp(1.5rem,3vw,3rem)] top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div className="relative h-32 w-20">
              {slides.map((_, i) => <SlideNumber key={i} index={i} scrollYProgress={scrollYProgress} />)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[clamp(2rem,4vw,5rem)] w-full items-center" style={{ padding: "0 clamp(5rem, 10vw, 10rem) 0 clamp(5rem, 8vw, 8rem)" }}>
            <div className="relative w-full bg-secondary overflow-hidden rounded" style={{ aspectRatio: "3/4", maxHeight: "72vh" }}>
              {slides.map((slide, i) => <SlideImage key={i} slide={slide} index={i} scrollYProgress={scrollYProgress} />)}
            </div>
            <div className="relative h-[65vh] overflow-hidden">
              {slides.map((slide, i) => <SlideText key={i} slide={slide} index={i} scrollYProgress={scrollYProgress} />)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}