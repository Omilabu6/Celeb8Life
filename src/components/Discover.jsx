import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useParallax } from "../hooks/useParallax";
import john from "../public/john.png";
import CameraModal from "./app/CameraModal";
import { FadeUp } from "./Reveal";

const Discover = () => {
  const [cameraOpen, setCameraOpen] = useState(false);
  const sectionRef = useRef(null);
  const subtitleOffset = useParallax(sectionRef, 0.16);
  const titleOffset = useParallax(sectionRef, 0.3);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const animationStart = 0.38;
  const animationEnd = 0.58;

  const tlX = useTransform(scrollYProgress, [animationStart, animationEnd], [0, -100]);
  const tlY = useTransform(scrollYProgress, [animationStart, animationEnd], [0, -50]);
  const tlOpacity = useTransform(scrollYProgress, [animationStart, animationEnd], [1, 0]);
  const tlBlur = useTransform(scrollYProgress, [animationStart, animationEnd], [0, 10]);
  const tlFilter = useTransform(tlBlur, (v) => `blur(${v}px)`);

  const blX = useTransform(scrollYProgress, [animationStart, animationEnd], [0, -100]);
  const blY = useTransform(scrollYProgress, [animationStart, animationEnd], [0, 50]);
  const blOpacity = useTransform(scrollYProgress, [animationStart, animationEnd], [1, 0]);
  const blBlur = useTransform(scrollYProgress, [animationStart, animationEnd], [0, 10]);
  const blFilter = useTransform(blBlur, (v) => `blur(${v}px)`);

  const starsX = useTransform(scrollYProgress, [animationStart, animationEnd], [0, -100]);
  const starsOpacity = useTransform(scrollYProgress, [animationStart, animationEnd], [1, 0]);
  const starsBlur = useTransform(scrollYProgress, [animationStart, animationEnd], [0, 10]);
  const starsFilter = useTransform(starsBlur, (v) => `blur(${v}px)`);

  const trX = useTransform(scrollYProgress, [animationStart, animationEnd], [0, 100]);
  const trY = useTransform(scrollYProgress, [animationStart, animationEnd], [0, -50]);
  const trOpacity = useTransform(scrollYProgress, [animationStart, animationEnd], [1, 0]);
  const trBlur = useTransform(scrollYProgress, [animationStart, animationEnd], [0, 10]);
  const trFilter = useTransform(trBlur, (v) => `blur(${v}px)`);

  const brX = useTransform(scrollYProgress, [animationStart, animationEnd], [0, 100]);
  const brY = useTransform(scrollYProgress, [animationStart, animationEnd], [0, 50]);
  const brOpacity = useTransform(scrollYProgress, [animationStart, animationEnd], [1, 0]);
  const brBlur = useTransform(scrollYProgress, [animationStart, animationEnd], [0, 10]);
  const brFilter = useTransform(brBlur, (v) => `blur(${v}px)`);

  const phoneScale = useTransform(scrollYProgress, [animationStart, animationEnd], [1, 1.05]);

  return (
    <section ref={sectionRef} className="relative min-h-[200vh]">

      {/* Title */}
      <div
        className="mb-24"
        style={{
          transform: `translateY(${titleOffset}px)`,
          willChange: "transform",
        }}
      >
        <FadeUp delay={0.1}>
          <h2
            className="text-[#C9A84C] text-center"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 7vw, 8rem)",
              fontWeight: 300,
              lineHeight: 0.95,
            }}
          >
            Discover Your <em className="px-3">Palate</em>
          </h2>
        </FadeUp>
      </div>

      {/* Description */}
      <div
        style={{
          transform: `translateY(${subtitleOffset}px)`,
          willChange: "transform",
        }}
      >
        <div className="text-[#C9A84C] text-center mx-auto font-medium p-3 text-[13px] w-[500px] tracking-[0.1em]">
          <p>
            Whisky is more than a drink — it's a journey through layers of flavor and time.
            From deep, smoky finishes to smooth, lingering sweetness, every expression tells a story.
            Find where your taste lives, and let every pour reveal something new.
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mx-auto gap-10 mt-20 flex items-center justify-center">
        <FadeUp delay={0.16}>
          <button className="mt-6 border border-[#C9A84C] text-black px-6 py-3 text-[11px] tracking-[0.25em] uppercase rounded-sm hover:bg-black bg-[#C9A84C] hover:text-[#C9A84C] transition-colors duration-500">
            Book Experience
          </button>
        </FadeUp>
        <FadeUp delay={0.16}>
          <button className="mt-6 border border-[#C9A84C] text-[#C9A84C] px-6 py-3 text-[11px] tracking-[0.25em] uppercase rounded-sm hover:bg-[#C9A84C] hover:text-black transition-colors duration-500">
            Discover More
          </button>
        </FadeUp>
      </div>

      {/* Sticky Section */}
      <div className="sticky -top-16 overflow-hidden flex flex-col items-center justify-center pt-12 sm:pt-16 lg:pt-20">

        {/* Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-[#C9A84C]/20 to-transparent blur-[80px] rounded-full" />

        <div className="container relative z-10 mx-auto max-w-5xl px-5 h-full flex justify-center">
          <div className="relative w-full max-w-4xl mx-auto flex justify-center items-start min-h-[800px]">

            {/* JOHN IMAGE */}
            <motion.div
              style={{ scale: phoneScale }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 100,
                delay: 0.3,
              }}
              className="relative z-20 w-[240px] sm:w-[280px] lg:w-[320px]"
            >
              <motion.img
                src={john}
                alt="John Walker"
                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* SMOKY */}
            <motion.div style={{ x: tlX, y: tlY, opacity: tlOpacity, filter: tlFilter }} className="hidden sm:flex absolute z-10 top-[8%] left-0 lg:left-8 w-[300px]">
              <motion.div className="w-full rounded-[1.6rem] border border-white/15 bg-[rgba(20,8,3,0.55)] backdrop-blur-md p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                <span className="text-[#F6E7C8]" style={{ fontFamily: "'Playfair Display', serif" }}>SMOKY</span>
                <p className="text-[13px] leading-7 text-white/75 mt-2">
                  Each expression is selected for its depth of nose — from honeyed warmth to peated smoke. Every pour announces itself before the first sip.
                </p>
              </motion.div>
            </motion.div>

            {/* SPICY */}
            <motion.div style={{ x: blX, y: blY, opacity: blOpacity, filter: blFilter }} className="hidden sm:flex absolute w-[300px] z-30 top-[40%] left-4">
              <motion.div className="rounded-[1.6rem] border border-white/15 bg-[rgba(20,8,3,0.55)] backdrop-blur-md p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                <span className="text-[#F6E7C8]" style={{ fontFamily: "'Playfair Display', serif" }}>SPICY</span>
                <p className="text-[13px] leading-7 text-white/75 mt-2">
                  Time is the master blender. Layers of complexity are developed through years of quiet transformation in oak.
                </p>
              </motion.div>
            </motion.div>

            {/* SWEET */}
            <motion.div style={{ x: trX, y: trY, opacity: trOpacity, filter: trFilter }} className="hidden w-[300px] lg:block absolute z-10 top-[20%] right-[2%]">
              <motion.div className="rounded-[1.6rem] border border-white/15 bg-[rgba(20,8,3,0.55)] backdrop-blur-md p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                <span className="text-[#F6E7C8]" style={{ fontFamily: "'Playfair Display', serif" }}>SWEET</span>
                <p className="text-[13px] leading-7 text-white/75 mt-2">
                  From malted barley to pure spring water, every element is chosen for provenance and story.
                </p>
              </motion.div>
            </motion.div>

            {/* FRUITY */}
            <motion.div style={{ x: brX, y: brY, opacity: brOpacity, filter: brFilter }} className="hidden sm:flex absolute z-30 w-[300px] top-[60%] right-8">
              <motion.div className="rounded-[1.6rem] border border-white/15 bg-[rgba(20,8,3,0.55)] backdrop-blur-md p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                <span className="text-[#F6E7C8]" style={{ fontFamily: "'Playfair Display', serif" }}>FRUITY</span>
                <p className="text-[13px] leading-7 text-white/75 mt-2">
                  A rich amber warmth shaped by time in oak, speaking before words are ever needed.
                </p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>

      <CameraModal open={cameraOpen} onClose={() => setCameraOpen(false)} />

    </section>
  );
};

export default Discover;