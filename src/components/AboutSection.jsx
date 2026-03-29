import { useRef } from "react";
import { useParallax } from "../hooks/useParallax";
import advert from "./../public/advert.jpeg"
import { FadeUp, CountUp, LineReveal } from "./Reveal";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const imageOffset = useParallax(sectionRef, 0.25);
  const textOffset = useParallax(sectionRef, 0.45);
  const bgOffset = useParallax(sectionRef, 0.05);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      id="about"
      className="relative bg-[#0a0a0a] overflow-hidden py-40"
    >
     

      <div className="relative max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Left: Image */}
          <div
            style={{ transform: `translateY(${imageOffset}px)`, willChange: "transform" }}
          >
            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={advert}
                  alt="About"
                  className="w-full h-full object-cover opacity-75"
                />
                {/* Year badge */}
                <div className="absolute bottom-0 right-0 bg-white px-7 py-5">
                  <div
                    className="text-black text-3xl font-light"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <CountUp to={42} suffix="+" />
                  </div>
                  <div className="text-black/40 text-[9px] tracking-[0.35em] uppercase mt-1">
                    Projects
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div
            className="text-white"
            style={{ transform: `translateY(${textOffset}px)`, willChange: "transform" }}
          >
            <FadeUp>
              <div className="text-white/25 text-[10px] tracking-[0.55em] uppercase mb-8 font-light">
                About the Experience
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2
                className="text-white leading-[1.05] mb-8"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.5rem, 4.5vw, 5.5rem)",
                  fontWeight: 300,
                }}
              >
                A ceremony
                <br />
                that <em>moves</em> the palate.
              </h2>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p className="text-white/45 text-sm leading-relaxed mb-5 font-light">
                The Tasting Room is not a bar. It is a private ceremony where
                whisky becomes the language of discovery — guided by hosts who
                have spent years making the art of tasting feel like play.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-white/25 text-sm leading-relaxed mb-14 font-light">
                Come as guests. Leave as initiates. Every session is limited to
                eight seats, every flight curated from over 41 premium expressions.
              </p>
            </FadeUp>

            {/* Stats row */}
            <FadeUp delay={0.25}>
              <LineReveal className="text-white/10 mb-8" />
              <div className="grid grid-cols-3 gap-8">
                {[
                  { to: 3, suffix: "–4", label: "Flights per session" },
                  { to: 8, suffix: "", label: "Maximum guests" },
                  { to: 41, suffix: "+", label: "Expressions in cellar" },
                ].map(({ to, suffix, label }) => (
                  <div key={label}>
                    <div
                      className="text-4xl font-light text-white mb-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      <CountUp to={to} suffix={suffix} />
                    </div>
                    <div className="text-white/25 text-[9px] tracking-[0.35em] uppercase">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
