import { useRef } from "react";
import { useParallax } from "../hooks/useParallax";
import { FadeUp } from "./Reveal";
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
              fontSize: "clamp(1.8rem, 3.5vw, 3.6rem)",
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

      <div
        ref={imageRef}
        className="-mt-10"
        style={{
          transform: `translateY(${imageY}px)`,
          willChange: "transform",
        }}
      >
        <TiltCard maxTilt={6} glare>
          <div className="overflow-hidden aspect-[4/5] group cursor-pointer">
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full rounded-2xl object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
            />
          </div>
        </TiltCard>
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
              Most
              <em className="px-3">Popular</em>
            </h2>
          </FadeUp>
        </div>

        {/* Side-by-side staggered layout */}
        <div className="relative pb-24 flex flex-col md:flex-row md:items-start md:gap-16 space-y-24 md:space-y-0">
          {/* Card 1 — Social Tasting, sits at the top */}
          <ExperienceCard
            item={gallery[0]}
            cardSpeed={0.12}
            textSpeed={0.08}
            imageSpeed={0.22}
            offsetTop={0}
          />

          {/* Card 2 — Connoisseur Tasting, shifted down so it sits beside but below */}
          <ExperienceCard
            item={gallery[1]}
            cardSpeed={0.18}
            textSpeed={0.1}
            imageSpeed={0.22}
            offsetTop={440}
          />
        </div>
      </div>
    </section>
  );
}

export default GallerySection;