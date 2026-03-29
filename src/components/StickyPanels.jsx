// import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import img1 from "./../public/img1.svg";
import img2 from "./../public/img2.svg";
import { useRef } from "react";
import img3 from "./../public/img3.svg";
import bottleImg from "../public/bottle1.png";

const StickyPanels = () => {
  const trackRef = useRef(null);
  const leaveRef = useRef(null);
  const isInView = useInView(leaveRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // ── Panel 2 slides in: progress 0 → 0.25 ──
  const p2Y = useTransform(scrollYProgress, [0, 0.25], ["100%", "0%"]);

  // ── Panel 3 slides in: progress 0.25 → 0.5 ──
  const p3Y = useTransform(scrollYProgress, [0.25, 0.5], ["100%", "0%"]);

  // ── Parallax drift ──
  const bg1Y = useTransform(scrollYProgress, [0, 0.25], ["0%", "-6%"]);
  const bg2Y = useTransform(scrollYProgress, [0.25, 0.5], ["0%", "-6%"]);

  // ── LeaveNoTrace panel slides up over img3: progress 0.65 → 0.85 ──
  const leaveY = useTransform(scrollYProgress, [0.65, 0.85], ["100%", "0%"]);

  return (
    <>
      <div ref={trackRef} style={{ height: "500vh", position: "relative" }}>

        {/* ── Sticky viewport ── */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >

          {/* ── PANEL 1 ── */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden" }}>
            <motion.img
              src={img1}
              alt="Panel 1"
              style={{
                width: "100%",
                height: "110%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
                y: bg1Y,
              }}
            />
          </div>

          {/* ── PANEL 2 ── */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              overflow: "hidden",
              y: p2Y,
              boxShadow: "0 -24px 60px 0 rgba(0,0,0,0.6)",
            }}
          >
            <motion.img
              src={img2}
              alt="Panel 2"
              style={{
                width: "100%",
                height: "110%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
                y: bg2Y,
              }}
            />
          </motion.div>

          {/* ── PANEL 3 — img3 stays as background behind LeaveNoTrace ── */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 3,
              overflow: "hidden",
              y: p3Y,
              boxShadow: "0 -24px 60px 0 rgba(0,0,0,0.6)",
            }}
          >
            <img
              src={img3}
              alt="Panel 3"
              style={{
                width: "100%",
                height: "110%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
          </motion.div>

          {/* ── LEAVE NO TRACE — slides up over img3 ── */}
          <motion.section

            id="leave-no-trace"
            ref={leaveRef}
            style={{
              
              position: "absolute",
              inset: 0,
              zIndex: 4,
              y: leaveY,
              boxShadow: "0 -24px 60px 0 rgba(0,0,0,0.6)",
            }}
            className="min-h-screen bg-[#f0ece4] flex flex-col items-center justify-center px-4 py-24 bg-background"
          >
            <div className="relative w-full max-w-[1200px] mx-auto">

              {/* "Leave" - slides up */}
              <motion.div
              style={{
             fontFamily: "'Playfair Display', serif",}}
                initial={{ y: 120, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 120, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-center mb-[-2vw]"
              >
                <h2 className="font-display text-[clamp(5rem,12vw,14rem)] leading-[0.85] text-foreground italic">
                  Leave
                </h2>
              </motion.div>

              {/* Middle row: "No" + Image + "Trace" */}
              <div className="flex items-center justify-center relative">

                {/* "No" */}
                <motion.span
                 style={{
                  fontFamily: "'Playfair Display', serif",}}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                  className="font-display text-[clamp(5rem,12vw,14rem)] leading-[0.85] text-foreground italic relative z-10"
                >
                  No
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
                  style={{
                    fontFamily: "'Playfair Display', serif",}}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                  className="font-display text-[clamp(5rem,12vw,14rem)] leading-[0.85] text-foreground italic relative z-10"
                >
                  Trace
                </motion.span>
              </div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="mt-20 max-w-sm  text-center font-mono text-xs tracking-[0.15em] uppercase leading-relaxed text-foreground"
            >
              Our commitment extends beyond purity, it's a matter of responsibility.
              We use recycled materials, upcycled fruits, and design processes that
              respect the land that inspires us.
            </motion.p>
          </motion.section>

        </div>
      </div>
    </>
  );
};

export default StickyPanels;