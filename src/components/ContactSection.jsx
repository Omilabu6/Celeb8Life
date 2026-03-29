import { useRef } from "react";
import { useParallax } from "../hooks/useParallax";
import { FadeUp, LineReveal } from "./Reveal";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const bgOffset = useParallax(sectionRef, 0.08);
  const textOffset = useParallax(sectionRef, 0.4);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="light"
      id="contact"
      className="relative min-h-screen bg-[#f0ece4] flex items-center justify-center overflow-hidden py-40"
    >
      {/* Giant background word */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ transform: `translateY(${bgOffset}px)`, willChange: "transform" }}
      >
        <span
          className="text-[22vw] font-black text-black/[0.03] select-none leading-none"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          HELLO
        </span>
      </div>

      <div
        className="relative text-center px-6 z-10"
        style={{ transform: `translateY(${textOffset}px)`, willChange: "transform" }}
      >
        <FadeUp>
          <div className="text-black/30 text-[10px] tracking-[0.55em] uppercase mb-10 font-light">
            Let's connect
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <a
            href="mailto:hello@void.studio"
            className="block text-black leading-[0.95] mb-12 hover:opacity-50 transition-opacity duration-400 group"
            data-cursor-label="EMAIL"
            data-cursor
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 7vw, 9rem)",
              fontWeight: 300,
            }}
          >
            hello
            <span className="italic">@void</span>
            <br />
            .studio
          </a>
        </FadeUp>

        <FadeUp delay={0.2}>
          <LineReveal className="text-black/15 mb-8 max-w-xs mx-auto" />
          <div className="flex items-center justify-center gap-10 text-black/30 text-[10px] tracking-[0.35em] uppercase font-light">
            {["Instagram", "Twitter", "LinkedIn", "Dribbble"].map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-black transition-colors duration-200"
                data-cursor
              >
                {link}
              </a>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8 md:px-16 text-black/20 text-[9px] tracking-[0.35em] uppercase font-light">
        <span>© 2024 Void Studio</span>
        <span>All Rights Reserved</span>
      </div>
    </section>
  );
}
