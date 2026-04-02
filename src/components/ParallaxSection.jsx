import { useRef, useState, useEffect } from "react";
import { useParallax } from "../hooks/useParallax";
import { FadeUp, RevealText, LineReveal } from "./Reveal";
import TiltCard from "./TiltCard";
import beach from "./../public/beach.jpg"
import logo from "./../public/logo.svg"

const projects = [
  {
    id: "01",
    title: "Axiom",
    category: "Brand Identity",
    year: "2024",
    src: beach,
    speed: 0.25,
    size: "large",
  },
 
 
];

function ProjectCard({ project }) {
  const ref = useRef(null);
  const [scale, setScale] = useState(0.9);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;

      // When top of card hits 30vh from bottom → start scaling
      // When card is fully in view → scale = 1
      const triggerStart = windowH * 0.3; // 30vh from bottom = start
      const triggerEnd = 0;               // top of card at top of viewport = done

      const progress = 1 - Math.max(0, Math.min(1, (rect.top - triggerEnd) / (triggerStart - triggerEnd)));
      const newScale = 0.9 + progress * 0.1;

      setScale(newScale);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="w-[90%] h-[60vh] md:h-screen mx-auto"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "center center",
        willChange: "transform",
        transition: "transform 0.1s linear",
      }}
    >
      <TiltCard maxTilt={8} glare={true} className="group w-full h-full cursor-pointer">
        <div className="overflow-hidden bg-black/5 w-full h-full">
          <img
            src={project.src}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </TiltCard>
    </div>
  );
}

export default function ParallaxSection() {
  const sectionRef = useRef(null);
  const bgWordOffset = useParallax(sectionRef, 0.08);
  const titleOffset = useParallax(sectionRef, 0.35);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="light"
      id="work"
      className="relative  bg-[#f0ece4] overflow-hidden pt-32 md:pb-48 "
    >
      {/* Giant background word */}
      <div
        className="absolute  top-0 left-0 right-0 flex justify-center pointer-events-none overflow-hidden"
        style={{ transform: `translateY(${bgWordOffset}px)`, willChange: "transform" }}
      >
        <img
        src={logo}
        alt=""
        className="select-none w-[150vw] md:w-[50vw]"
        style={{ 
          opacity: 0.04,
          filter: "invert(0) brightness(0) saturate(0)", // nuke it to black
        }}
      />
      </div>

      <div className="max-w-7xl mx-auto  text-center  md:px-16">
        {/* Section header */}
        <div
          className="mb-24"
          style={{ transform: `translateY(${titleOffset}px)`, willChange: "transform" }}
        >
          <FadeUp delay={0.1}>
            <h2
              className="text-black text-center  leading-[0.95]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(3.5rem, 8vw, 9rem)",
                fontWeight: 300,
              }}
            >
              Where fine Whiskey 
              <br />
              meets Unforgetable
              <em> Moment</em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2} className="mt-8 flex items-center justify-center text-center ">
            <p className="text-black/45 text-sm max-w-sm leading-relaxed font-light">
              Intimate tasting sessions for groups who seek more than a drink a story in every glass, a memory in every pour.
            </p>
          </FadeUp>
          
        </div>
         

        {/* Project grid */}
        <div className="">
          {/* Large card — left */}
          <div className="">
            <ProjectCard project={projects[0]} />
          </div>
        </div>
      </div>
    </section>
  );
}
