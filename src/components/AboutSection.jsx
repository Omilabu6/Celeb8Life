import { useRef } from "react";
import TiltCard from "./TiltCard";
import { motion, useInView } from "framer-motion";
import { useParallax } from "../hooks/useParallax";
import { FadeUp, CountUp, LineReveal, RevealText } from "./Reveal";
import aboutHero from "../public/advert.jpeg";
import video2 from "../public/video2.mp4"
import VideoScaleOnScroll from "../components/VideoScaleOnScroll"
import celebr8Card from "../public/celebr8-card.jpeg";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, { once: true, margin: "-100px" });
  const imageOffset = useParallax(sectionRef, 0.15);
  const textOffset = useParallax(sectionRef, 0.08);

  return (
      <section
      ref={sectionRef}
      id="about"
      className="relative  md:pt-0 pt-20 bg-background overflow-hidden"
    >
      {/* ── Full-bleed cinematic opening ── */}
      <div className="relative h-[35vh] md:h-[85vh] overflow-hidden">

        {/* Dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

        {/* Centered statement */}
        <div className="absolute inset-0 pt-20 md:pt-52 flex items-start md:items-center justify-center px-4 md:px-8">
          <div className="text-center w-full max-w-4xl mx-auto">
            <FadeUp>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "1.25rem"
              }}>
                <div style={{ width: 28, height: 1, background: "rgba(240, 236, 228, 0.7)" }} />
                <p style={{
                  color: "rgba(240, 236, 228, 0.7)",
                  fontSize: "0.5rem",
                  letterSpacing: "0.5em",
                  textTransform: "uppercase",
                  fontWeight: 300,
                  fontFamily: "sans-serif",
                  margin: 0
                }}>
                  Enter the Ritual
                </p>
                <div style={{ width: 28, height: 1, background: "rgba(240, 236, 228, 0.7)" }} />
              </div>
            </FadeUp>

            <h2
              className="text-foreground text-[#C9A84C] leading-[1.05] mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 8vw, 3rem)",
                fontWeight: 300,
                paddingLeft: "1rem",
                paddingRight: "1rem",
              }}
            >
              <RevealText text="A ceremony" />
              <br />
              <RevealText text="that" delay={0.15} />
              <RevealText text="moves" delay={0.25} className="italic text-gold" />
              <RevealText text=" the palate." delay={0.35} />
            </h2>
          </div>
        </div>
      </div>

      {/* ── Content block ── */}
      <div className="relative max-w-7xl  mx-auto px-5 md:px-16 py-0 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-8">

          {/* Left column — Text + Video */}
          <div
            className="lg:col-span-5 lg:col-start-1"
            style={{ transform: `translateY(${textOffset}px)`, willChange: "transform" }}
          >
            <FadeUp>
              <p className="text-muted-foreground text-[#f0ece4] text-lg md:text-xl leading-[1.9] mb-6 font-light">
                The Tasting Room is not a bar. It is a private ceremony where
                whisky becomes the language of discovery guided by hosts who
                have spent years making the art of tasting feel like play.
              </p>
            </FadeUp>

            {/* ── Video section ── */}
            <div className="relative max-w-7xl  mx-auto pt-12 md:pt-80">
              <FadeUp>
                <VideoScaleOnScroll>
                  <div className="relative rounded-2xl aspect-video overflow-hidden bg-card">
                    <video
                      className="w-full rounded-2xl h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={aboutHero}
                    >
                      <source src={video2} type="video/mp4" className="rounded-2xl" />
                    </video>
                  </div>
                </VideoScaleOnScroll>
              </FadeUp>
            </div>
          </div>

          {/* Right column — Celebr8 Card */}
          <div
            ref={cardRef}
            className="lg:col-span-6 hidden lg:col-start-7 relative md:flex justify-center lg:block"
          >
            <TiltCard maxTilt={6} glare>
              <motion.div
                className="relative mt-0 md:mt-20"
                initial={{ opacity: 0, y: 60, rotateX: 8 }}
                animate={isCardInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ perspective: "1200px" }}
              >
                {/* Ambient glow behind card */}
                <div className="absolute -inset-8 bg-gold/5 blur-3xl rounded-full" />

                <div className="relative overflow-hidden group">
                  <img
                    src={celebr8Card}
                    alt="Celebr8 Lyfe — Engraved bottles are forever"
                    className="w-full max-w-[500px] rounded-2xl h-auto object-cover mx-auto"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </TiltCard>
          </div>

        </div>
      </div>
    </section>
  );
}