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
      className="min-h-scree flex flex-col items-center justify-center px-4 py-0 md:py-32"
    >
      <div className="relative w-full max-w-[1200px] mx-auto">

        {/* "Crafted" - slides up */}
        <motion.div
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ y: 120, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 120, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-[-2vw]"
        >
          <h2 className="font-display text-[clamp(4rem,12vw,14rem)] leading-[0.85] text-foreground italic">
            Crafted
          </h2>
        </motion.div>

        {/* Middle row: "To" + Image + "Be Felt" */}
        {/* 
          Desktop: flex row (items side by side) — unchanged
          Mobile:  flex column (stacked), image between the two words
        */}
        <div className="flex flex-col items-center md:flex-row md:items-center md:justify-center relative">

          {/* "To" */}
          <motion.span
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="font-display text-[clamp(3rem,12vw,14rem)] md:mt-0 mt-3 leading-[0.85] text-foreground italic relative z-10"
          >
            To
          </motion.span>

          {/* Bottle image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ opacity: { duration: 0.5, delay: 0.35 } }}
            // Mobile: fixed visible size, no width animation (width anim looks broken stacked)
            // Desktop: width expands as original
            className="
              my-4 md:my-0
              w-[clamp(100px,40vw,160px)] md:w-0
              h-[clamp(110px,44vw,175px)] md:h-[clamp(150px,20vw,200px)]
              md:translate-y-10
              flex-shrink-0 overflow-hidden relative z-0
            "
          >
            {/* Desktop-only width animation wrapper */}
            <motion.div
              className="w-full h-full hidden md:block"
              initial={{ width: 0 }}
              animate={isInView ? { width: "clamp(140px,20vw,200px)" } : { width: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            >
              <img
                src={bottleImg}
                alt="Bottle"
                className="w-full h-full object-cover"
                width={800}
                height={600}
              />
            </motion.div>

            {/* Mobile-only image (no width animation, just fades in) */}
            <img
              src={bottleImg}
              alt="Bottle"
              className="w-full h-full object-cover block md:hidden"
              width={800}
              height={600}
            />
          </motion.div>

          {/* "Be Felt" */}
          <motion.span
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="font-display text-[clamp(3rem,12vw,14rem)] leading-[0.85] text-foreground italic relative md:ml-3 z-10"
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
        className="mt-12 md:mt-20 max-w-sm text-center font-mono text-xs tracking-[0.15em] uppercase leading-relaxed text-foreground px-6 md:px-0"
      >
        This isn't just a collection — it's a curated experience. Each selection is designed to be explored, understood, and remembered.
      </motion.p>
    </motion.section>
  );
};

export default StickyPanels;