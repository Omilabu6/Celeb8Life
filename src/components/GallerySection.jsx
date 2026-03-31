import { useRef } from "react";
import { useParallax } from "../hooks/useParallax";
import { FadeUp, RevealText } from "./Reveal";
import TiltCard from "./TiltCard";
import drink from "./../public/drink.png";
import tasting from "./../public/tasting.jpg";
import Marquee from "./Marquee";

const gallery = [
  {
    src: drink,
    label: "03",
    number: "1",
    title: "The Social Tasting",
    subtext:
      "Three curated whisky flights, a host who makes it fun, and a private table for your group. Whisky as the enabler of great conversation.",
    button: "Book your Experience",
  },
  {
    src: tasting,
    label: "04",
    number: "2",
    title: "The Connoisseur Tasting",
    subtext:
      "Four expressions, a repeat round, and a host who goes deeper into the craft. For groups where every guest already loves whisky.",
    button: "Book your Experience",
  },
];

function ExperienceCard({
  item,
  cardSpeed = 0.2,
  textSpeed = 0.12,
  imageSpeed = 0.28,
  offsetTop = 0,
}) {
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  const cardY = useParallax(cardRef, cardSpeed);
  const textY = useParallax(textRef, textSpeed);
  const imageY = useParallax(imageRef, imageSpeed);

  return (
    <div
      ref={cardRef}
      style={{
        transform: `translateY(${cardY + offsetTop}px)`,
        willChange: "transform",
      }}
      className="w-full md:w-[46%]"
    >
      <div
        ref={textRef}
        className=" px-6 w-[500px] h-[400px] py-6 rounded-2xl"
        style={{
          transform: `translateY(${textY}px)`,
          willChange: "transform",
        }}
      >
        <FadeUp delay={0.08}>
          <h3
            className="text-[#C9A84C] mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2rem)",
              fontWeight: 300,
              lineHeight: 1,
            }}
          >
            {item.title}
          </h3>
        </FadeUp>

        <FadeUp delay={0.12}>
          <p className="text-[#C9A84C]/65 text-sm md:text-base leading-7 max-w-[34rem]">
            {item.subtext}
          </p>
        </FadeUp>

        <FadeUp delay={0.16}>
          <button className="mt-6 border border-[#C9A84C] text-[#C9A84C] px-6 py-3 text-[11px] tracking-[0.25em] uppercase hover:bg-[#C9A84C] hover:text-black transition-colors duration-500">
            {item.button}
          </button>
        </FadeUp>
      </div>

    
    </div>
  );
}

function GallerySection() {
  const sectionRef = useRef(null);
  const titleOffset = useParallax(sectionRef, 0.3);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      id="studio"
      className="relative overflow-hidden"
    >
      <Marquee
        items={[
          "Most Requested",
          "Signature Experiences",
          "Curated Selections",
          "Our Finest",
        ]}
        speed={50}
        direction="right"
        separator="◇"
        className="py-4 border-b border-white/5 text-white/15 text-[10px] tracking-[0.5em] uppercase font-light"
      />
      <div className="py-32 px-8 md:px-16">
        <div
          className="mb-24"
          style={{
            transform: `translateY(${titleOffset}px)`,
            willChange: "transform",
          }}
        >
          <div className=" inset-0 pt-52 flex items-center justify-center px-8">
                <div className="text-center max-w-4xl">
                  <FadeUp>
                    <p className="text-white text-[10px] tracking-[0.6em] uppercase mb-6 font-light">
                     Choose Your Experience
                    </p>
                  </FadeUp>
                  <h2
                  className="text-foreground text-[#C9A84C]  leading-[1.05] pb-44 "
                  style={{
                    
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(2.8rem, 6vw, 3rem)",
                    fontWeight: 300,
                  }}
                >
                  <RevealText text="Whether relaxed or refined, " />
                  <br />
                  <RevealText text=" every" delay={0.15} />
                  <RevealText text="session" delay={0.25} className="italic text-gold" />
                  <RevealText text="is crafted with intention." delay={0.35} />
                </h2>
                </div>
              </div>
        </div>

        {/* Side-by-side staggered layout */}
        <div className="relative h-[120vh]  flex flex-col md:flex-row md:items-start md:gap-16 space-y-14 md:space-y-0">
          {/* Card 1 — Social Tasting, sits at the top */}
          <ExperienceCard
            item={gallery[0]}
            cardSpeed={0.12}
            textSpeed={0.08}
            imageSpeed={0.22}
            offsetTop={0}
          />

          {/* Card 2 — Connoisseur Tasting, shifted down so it sits beside but below */}
         
        <div className=" right-0 bottom-0 absolute  "> <ExperienceCard
            item={gallery[1]}
            cardSpeed={0.18}
            textSpeed={0.1}
            imageSpeed={0.22}
          />
          </div>
        </div>
      </div>
    </section>
  );
}

export default GallerySection;