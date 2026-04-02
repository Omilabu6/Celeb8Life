import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import bottleImg from "../public/bottle1.png";

const StickyPanels = () => {
  const leaveRef = useRef(null);
  const isInView = useInView(leaveRef, { once: false, amount: 0.3 });

  return (
    <motion.section
      id="leave-no-trace"
      ref={leaveRef}
      className="min-h-screen bg-[#f0ece4]   flex flex-col items-center justify-center px-4 py-32 "
    >
      <div className="relative w-full max-w-[1200px] mx-auto">

        {/* "Leave" - slides up */}
        <motion.div
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ y: 120, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 120, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-[-2vw]"
        >
          <h2 className="font-display text-[clamp(5rem,12vw,14rem)] leading-[0.85] text-foreground italic">
           Crafted
          </h2>
        </motion.div>

        {/* Middle row: "No" + Image + "Trace" */}
        <div className="flex items-center justify-center relative">

          {/* "No" */}
          <motion.span
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="font-display text-[clamp(5rem,12vw,14rem)] leading-[0.85] text-foreground italic relative z-10"
          >
            To
          </motion.span>

          {/* Bottle image expanding between words */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={
              isInView
                ? { width: "clamp(140px,20vw,200px)", opacity: 1 }
                : { width: 0, opacity: 0 }
            }
            transition={{
              width: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 },
              opacity: { duration: 0.5, delay: 0.35 },
            }}
            className="h-[clamp(150px,20vw,200px)] translate-y-10 flex-shrink-0 overflow-hidden relative z-0"
          >
            <img
              src={bottleImg}
              alt="Bottle"
              className="w-full h-full object-cover"
              width={800}
              height={600}
            />
          </motion.div>

          {/* "Trace" */}
          <motion.span
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="font-display text-[clamp(5rem,12vw,14rem)] leading-[0.85] text-foreground italic relative ml-3 z-10"
          >
            Be Felt
          </motion.span>
        </div>
      </div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: 0.75 }}
        className="mt-20 max-w-sm text-center font-mono text-xs tracking-[0.15em] uppercase leading-relaxed text-foreground"
      >
        This isn’t just a collection — it’s a curated experience. Each selection is designed to be explored, understood, and remembered.
        </motion.p>
    </motion.section>
  );
};

export default StickyPanels;