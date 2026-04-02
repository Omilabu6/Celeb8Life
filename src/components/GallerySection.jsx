import { useRef, useEffect, useState } from "react";

// ─── Utility ───────────────────────────────────────────────────────────────
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ─── Marquee ───────────────────────────────────────────────────────────────
function Marquee({ items, speed = 40, separator = "◇", className, direction = "left" }) {
  const content = items.join(` ${separator} `) + ` ${separator} `;
  const doubled = content + content;

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className="inline-block"
        style={{
          animation: `marqueeScroll ${speed}s linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {doubled}
      </div>
    </div>
  );
}

// ─── useParallax ───────────────────────────────────────────────────────────
function useParallax(ref, speed = 0.1) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(center * speed);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref, speed]);

  return offset;
}

// ─── FadeUp ────────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── RevealText ────────────────────────────────────────────────────────────
function RevealText({ text, delay = 0, className }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "bottom",
      }}
    >
      <span
        style={{
          display: "inline-block",
          transform: visible ? "translateY(0)" : "translateY(110%)",
          opacity: visible ? 1 : 0,
          transition: `transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s, opacity 0.5s ease ${delay}s`,
        }}
      >
        {text}&nbsp;
      </span>
    </span>
  );
}

// ─── Gallery data ──────────────────────────────────────────────────────────
const gallery = [
  {
    src: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=896&q=80",
    number: "01",
    title: "The Social Tasting",
    subtext:
      "Three curated whisky flights, a host who makes it fun, and a private table for your group. Whisky as the enabler of great conversation.",
    button: "Book your Experience",
  },
  {
    src: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=896&q=80",
    number: "02",
    title: "The Connoisseur Tasting",
    subtext:
      "Four expressions, a repeat round, and a host who goes deeper into the craft. For groups where every guest already loves whisky.",
    button: "Book your Experience",
  },
];

// ─── ExperienceCard ────────────────────────────────────────────────────────
function ExperienceCard({ item, index, cardSpeed = 0.1, imageSpeed = 0.18 }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  const cardY = useParallax(cardRef, cardSpeed);
  const imageY = useParallax(imageRef, imageSpeed);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      style={{
        transform: `translateY(${cardY}px)`,
        willChange: "transform",
        marginTop: isEven ? 0 : undefined,
      }}
      className={`group relative ${isEven ? "md:mt-0" : "md:mt-32"}`}
    >
      {/* Image container */}
      <div
        ref={imageRef}
        className="relative overflow-hidden"
        style={{ transform: `translateY(${imageY}px)`, willChange: "transform" }}
      >
        <FadeUp delay={0.1}>
          <span
            style={{
              display: "block",
              marginBottom: "1rem",
              color: "hsl(var(--gold, 45 60% 55%) / 0.3)",
              fontSize: "0.75rem",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              fontWeight: 300,
            }}
          >
            {item.number}
          </span>
        </FadeUp>

        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "3/4", maxHeight: "520px" }}
        >
          <img
            src={item.src}
            alt={item.title}
            loading="lazy"
            width={896}
            height={1152}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 1.5s ease-out",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
              opacity: 0.6,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* Text content */}
      <div style={{ marginTop: "2rem", maxWidth: "28rem" }}>
        <FadeUp delay={0.15}>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 3vw, 2rem)",
              fontWeight: 300,
              lineHeight: 1.2,
              marginBottom: "1rem",
              color: "#f0ece4",
            }}
          >
            {item.title}
          </h3>
        </FadeUp>

        <FadeUp delay={0.25}>
          <p
            style={{
              color: "#f0ece4",
              fontSize: "0.875rem",
              lineHeight: 1.75,
              marginBottom: "1.5rem",
            }}
          >
            {item.subtext}
          </p>
        </FadeUp>

        <FadeUp delay={0.35}>
          <BookButton label={item.button} />
        </FadeUp>
      </div>
    </div>
  );
}

// ─── BookButton ────────────────────────────────────────────────────────────
function BookButton({ label }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        border: `1px solid ${hovered ? "rgba(240, 236, 228, 0.9)" : "rgba(232,213,163,0.4)"}`,
        color: hovered ? "#1a1409" : "#e8d5a3",
        padding: "0.875rem 2rem",
        fontSize: "0.625rem",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        background: "none",
        cursor: "pointer",
        transition: "border-color 0.5s, color 0.5s, box-shadow 0.5s",
        boxShadow: hovered ? "0 0 30px rgba(232,213,163,0.15)" : "none",
      }}
    >
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#f0ece4",
          transform: hovered ? "translateX(0)" : "translateX(-101%)",
          transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
    </button>
  );
}

// ─── GallerySection ────────────────────────────────────────────────────────
export default function GallerySection() {
  const sectionRef = useRef(null);
  const titleOffset = useParallax(sectionRef, 0.15);

  return (
    <section
      ref={sectionRef}
      id="studio"
      style={{
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Playfair Display', serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&display=swap');
      `}</style>

     
     
      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "5rem 1.5rem",
          maxWidth: "80rem",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            marginBottom: "11rem",
            textAlign: "center",
            transform: `translateY(${titleOffset}px)`,
            willChange: "transform",
          }}
        >
           <FadeUp>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "1.5rem"
            }}>
              <div style={{ width: 32, height: 1, background: "rgba(240, 236, 228, 0.7)" }} />
              <p style={{
                color: "rgba(240, 236, 228, 0.7)",
                fontSize: "0.5rem",
                letterSpacing: "0.5em",
                textTransform: "uppercase",
                fontWeight: 300,
                fontFamily: "sans-serif",
                margin: 0
              }}>
                Choose Your Experience
              </p>
              <div style={{ width: 32, height: 1, background: "rgba(240, 236, 228, 0.7)" }} />
            </div>
          </FadeUp>


          <h2 style={{ color: "#C9A84C", lineHeight: 1.1, maxWidth: "48rem", margin: "0 auto", fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 300 }}>
            <RevealText text="Whether relaxed or refined," />
            <br />
            <RevealText text="every" delay={0.15} />
            <RevealText text="session" delay={0.25} className="italic" style={{ color: "#d4b483" }} />
            <RevealText text="is crafted" delay={0.3} />
            <br />
            <RevealText text="with intention." delay={0.4} />
          </h2>

         
        </div>
        

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            justifyContent: "center",
            alignItems:"center",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "4rem",
            padding:"0em 5em"
          }}
        >
          {gallery.map((item, i) => (
            <ExperienceCard
              key={item.number}
              item={item}
              index={i}
              cardSpeed={i === 0 ? 0.08 : 0.14}
              imageSpeed={i === 0 ? 0.15 : 0.2}
            />
          ))}
        </div>

       
      </div>
    </section>
  );
}