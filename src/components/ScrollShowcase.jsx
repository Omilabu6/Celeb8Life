
// src/components/ScrollShowcase.jsx
import { useRef, useState, useEffect } from "react";
import donJulio from "./../assets/bottles/don-julio.jpg";
import johnnieWalker from "./../assets/bottles/johnnie-walker.jpg";
import tanqueray from "./../assets/bottles/tanqueray.jpg";
import ciroc from "./../assets/bottles/ciroc.jpg";
import baileys from "./../assets/bottles/baileys.jpg";
import smirnoff from "./../assets/bottles/smirnoff.jpg";

// ─── Animation Helpers ────────────────────────────────────────────────────────

export function RevealText({ text, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: "-10%" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      <span
        className="inline-block"
        style={{
          transform: visible ? "translateY(0%)" : "translateY(100%)",
          transition: `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        }}
      >
        {text}
      </span>
    </span>
  );
}

export function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: "-10%" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const slides = [
  { image: donJulio,      category: "Tequila",       title: "Refined Agave" },
  { image: johnnieWalker, category: "Whisky",         title: "A Journey in Every Step" },
  { image: tanqueray,     category: "Gin",            title: "Crisp Botanical Balance" },
  { image: ciroc,         category: "Vodka",          title: "Distilled Elegance" },
  { image: baileys,       category: "Cream Liqueur",  title: "Smooth Indulgence" },
  { image: smirnoff,      category: "Vodka",          title: "Pure & Timeless" },
];

const SLIDE_COUNT = slides.length;

// ─── Sub-components ───────────────────────────────────────────────────────────

function SlideImage({ slide, index, activeIndex, progress }) {
  const segSize = 1 / SLIDE_COUNT;

  function getStyle() {
    if (index === 0) return { transform: "translateY(0%)", zIndex: index };
    const start = index * segSize;
    const localP = Math.max(0, Math.min(1,
      (progress - (start - segSize * 0.3)) / (segSize * 0.6)
    ));
    return { transform: `translateY(${100 - localP * 100}%)`, zIndex: index };
  }

  return (
    <div className="absolute inset-0" style={getStyle()}>
      <img
        src={slide.image}
        alt={slide.title}
        className="w-full h-full object-cover"
        loading={index === 0 ? undefined : "lazy"}
        width={960}
        height={1200}
      />
    </div>
  );
}

function SlideText({ slide, index, activeIndex, segProgress }) {
  function getStyle() {
    const isActive = index === activeIndex;
    const isPrev   = index < activeIndex;

    if (isActive) {
      const yVal = segProgress > 0.85 ? `${-((segProgress - 0.85) / 0.15) * 60}%` : "0%";
      const op   = segProgress > 0.85 ? 1 - (segProgress - 0.85) / 0.15 : 1;
      return { transform: `translateY(${yVal})`, opacity: op, zIndex: SLIDE_COUNT + 1 };
    }
    if (isPrev) return { transform: "translateY(-60%)", opacity: 0, zIndex: 0 };

    // Next slides
    if (index === activeIndex + 1 && segProgress > 0.85) {
      const t = (segProgress - 0.85) / 0.15;
      return { transform: `translateY(${60 - t * 60}%)`, opacity: t, zIndex: SLIDE_COUNT + 1 };
    }
    return { transform: "translateY(60%)", opacity: 0, zIndex: 0 };
  }

  const numStr   = String(index + 1).padStart(2, "0");
  const totalStr = String(SLIDE_COUNT).padStart(2, "0");

  return (
    <div
      className="absolute inset-0 flex flex-col justify-center"
      style={{
        ...getStyle(),
        transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease",
      }}
    >
      <p className="font-body tracking-[0.05em] text-charcoal mb-6"
         style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}>
        <span className="font-normal">{numStr}</span>
        <span className="text-muted-foreground text-[0.85em]"> / {totalStr}</span>
      </p>
      <div className="border-t border-black/20 pt-3 mb-3">
        <p className="font-body text-muted-foreground tracking-[0.12em] uppercase mb-0"
           style={{ fontSize: "clamp(0.7rem, 1vw, 0.85rem)" }}>
          {slide.category}
        </p>
      </div>
      <h2
        className="font-body font-normal text-charcoal"
        style={{
          fontSize: "clamp(2.2rem, 4.5vw, 3rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          margin: "0 0 clamp(1.5rem, 3vh, 2.5rem) 0",
        }}
      >
        {slide.title}
      </h2>
    </div>
  );
}

function SlideNumber({ index, activeIndex }) {
  const numStr   = String(index + 1).padStart(2, "0");
  const totalStr = String(SLIDE_COUNT).padStart(2, "0");

  return (
    <div
      className="absolute top-0 left-0 whitespace-nowrap"
      style={{
        opacity: index === activeIndex ? 1 : 0,
        transition: "opacity 0.4s ease",
        zIndex: index,
      }}
    >
     
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function ScrollShowcase() {
  const containerRef = useRef(null);
  const [progress, setProgress]     = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect  = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p     = Math.max(0, Math.min(1, -rect.top / total));
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const segSize     = 1 / SLIDE_COUNT;
  const activeIndex = Math.min(SLIDE_COUNT - 1, Math.floor(progress / segSize));
  const segProgress = (progress - activeIndex * segSize) / segSize;

  return (
    <div className="bg-[#f0ece4]">
      {/* ── Hero ── */}
      <div className="pt-36 text-center ">
        <FadeUp>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", marginBottom: "2rem" }}>
                <div style={{ width: 48, height: 1, background: "rgba(0, 0, 0, 0.7)" }} />
                <p style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "0.5rem", letterSpacing: "0.6em", textTransform: "uppercase", fontWeight: 300, fontFamily: "sans-serif", margin: 0 }}>
                 Our Collection
                </p>
                <div style={{ width: 48, height: 1, background: "rgba(0, 0, 0, 0.7)" }} />
              </div>
           </FadeUp>
        <h2
          className="text-[#C9A84C] leading-[1.05] mb-15"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 6vw, 3rem)",
            fontWeight: 300,
          }}
        >
          <RevealText text="A curation" /><br />
          <RevealText text="that" delay={0.15} />{" "}
          <RevealText text="elevates" delay={0.25} className="italic" />{" "}
          <RevealText text="every sip." delay={0.35} />
        </h2>
      </div>

      {/* ── Scroll Showcase ── */}
      {/* ── Scroll Showcase ── */}
<section
  ref={containerRef}
  className="relative"
  style={{ height: `${SLIDE_COUNT * 100}vh` }}
>
  <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-background">

    {/* Sidebar counter — hidden on mobile */}
    <div className="absolute left-[clamp(1.5rem,3vw,3rem)] top-1/2 -translate-y-1/2 z-10 pointer-events-none hidden md:block">
      <div className="relative h-32 w-20">
        {slides.map((_, i) => (
          <SlideNumber key={i} index={i} activeIndex={activeIndex} />
        ))}
      </div>
    </div>

    {/* Mobile counter — top-left pill, only visible on mobile */}
    <div className="absolute top-6 left-4 z-10 pointer-events-none flex md:hidden">
      <div className="relative h-10 w-12">
        {slides.map((_, i) => (
          <SlideNumber key={i} index={i} activeIndex={activeIndex} />
        ))}
      </div>
    </div>

    {/* Layout — stacked on mobile, two-column on desktop */}
    <div
      className="
        grid w-full items-center
        grid-cols-1 gap-6 px-4 py-8
        md:grid-cols-2 md:gap-[clamp(2rem,4vw,5rem)]
      "
      style={{
        padding: undefined, // cleared so Tailwind classes take over on mobile
      }}
    >
      {/* ↑ Re-apply the desktop padding inline only on md+ via a wrapper */}
      {/* Image stack */}
      <div
        className="
          relative w-full bg-secondary overflow-hidden rounded
          max-h-[45vh]
          md:max-h-[72vh]
        "
        style={{ aspectRatio: "3/4" }}
      >
        {slides.map((slide, i) => (
          <SlideImage
            key={i}
            slide={slide}
            index={i}
            activeIndex={activeIndex}
            progress={progress}
          />
        ))}
      </div>

      {/* Text stack */}
      <div className="relative h-[30vh] md:h-[65vh] overflow-hidden">
        {slides.map((slide, i) => (
          <SlideText
            key={i}
            slide={slide}
            index={i}
            activeIndex={activeIndex}
            segProgress={segProgress}
          />
        ))}
      </div>
    </div>
  </div>
</section>
    </div>
  );
}