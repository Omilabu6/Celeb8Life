import { useState } from "react";
import { motion } from "framer-motion";
import donJulio from "./../assets/bottles/don-julio.jpg"
import johnnieWalker from "./../assets/bottles/johnnie-walker.jpg";
import tanqueray from "./../assets/bottles/tanqueray.jpg";
import ciroc from "./../assets/bottles/ciroc.jpg";
import baileys from "./../assets/bottles/baileys.jpg";
import smirnoff from "./../assets/bottles/smirnoff.jpg";
import donJulioSolo from "./../assets/bottles/don-julio-solo.png";
import johnnieWalkerSolo from "./../assets/bottles/johnnie-walker-solo.png";
import tanqueraySolo from "./../assets/bottles/tanqueray-solo.png";
import cirocSolo from "./../assets/bottles/ciroc-solo.png";
import baileysSolo from "./../assets/bottles/baileys-solo.png";
import smirnoffSolo from "./../assets/bottles/smirnoff-solo.png";
import eightSvg from "../public/eight.svg";

// ─── BottleCard ───────────────────────────────────────────────────────────────

const BottleCard = ({ name, subtitle, sceneImage, soloImage }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full aspect-[4/5] cursor-pointer overflow-hidden bg-background"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Base Layer: Grayscale bottle & SVG (visible before hover) ── */}
      <div className="absolute inset-0 z-10 bg-black flex items-center justify-center pointer-events-none">
        {/* Decorative SVG rings */}
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
          width="220"
          height="220"
          viewBox="0 0 220 220"
          fill="none"
        >
          <circle cx="110" cy="110" r="100" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
          <circle cx="110" cy="110" r="70" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeDasharray="4 6" />
        </svg>

        {/* Eight SVG background */}
        <img
          src={eightSvg}
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70"
          style={{ width: "90%", height: "90%", objectFit: "contain" }}
        />

        {/* Grayscale solo bottle */}
        <img
          src={soloImage}
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 w-auto object-contain grayscale"
          style={{
            height: "80%",
            transform: "translateX(-50%) translateY(-50%)",
            opacity: 0.85,
          }}
        />

        {/* Brand name at top */}
        <div className="absolute top-5 md:top-7 left-0 right-0 flex justify-center">
          <span
            className="text-base md:text-xl font-light tracking-[0.3em] uppercase text-muted-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {name}
          </span>
        </div>

        {/* Subtitle at bottom */}
        <div className="absolute bottom-5 md:bottom-7 left-0 right-0 flex justify-center">
          <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-muted-foreground/60">
            {subtitle}
          </span>
        </div>
      </div>

      {/* ── Revealing Layer: Colorful Scene & Text (expands outward on hover) ── */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          clipPath: hovered ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)",
          WebkitClipPath: hovered ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)",
          transition: "clip-path 0.85s cubic-bezier(0.76, 0, 0.24, 1), -webkit-clip-path 0.85s cubic-bezier(0.76, 0, 0.24, 1)"
        }}
      >
        <img
          src={sceneImage}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* Hover text overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col items-end justify-end p-6"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.45, delay: hovered ? 0.3 : 0 }}
        >
          {/* Gold accent line */}
          <motion.div
            className="w-8 h-px mb-3"
            style={{ backgroundColor: "hsl(var(--primary))" }}
            initial={{ scaleX: 0, originX: 1 }}
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.4, delay: hovered ? 0.45 : 0 }}
          />
          <h3
            className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase text-white drop-shadow-lg text-right"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {name}
          </h3>
          <p className="text-xs md:text-sm tracking-[0.18em] uppercase text-white/70 mt-1 drop-shadow-lg text-right">
            {subtitle}
          </p>
        </motion.div>
      </div>

      {/* ── Persistent border overlay ── */}
      <div className="absolute inset-0 z-30 pointer-events-none border border-border/40" />

      {/* ── Gold corner accents on hover ── */}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="absolute top-3 left-3 w-4 h-4 border-t border-l" style={{ borderColor: "hsl(var(--primary))" }} />
        <span className="absolute top-3 right-3 w-4 h-4 border-t border-r" style={{ borderColor: "hsl(var(--primary))" }} />
        <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l" style={{ borderColor: "hsl(var(--primary))" }} />
        <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r" style={{ borderColor: "hsl(var(--primary))" }} />
      </motion.div>
    </div>
  );
};

// ─── Brands data ──────────────────────────────────────────────────────────────

const brands = [
  { name: "Don Julio",      subtitle: "Premium Tequila",        sceneImage: donJulio,      soloImage: donJulioSolo },
  { name: "Johnnie Walker", subtitle: "Blended Scotch Whisky",  sceneImage: johnnieWalker, soloImage: johnnieWalkerSolo },
  { name: "Tanqueray",      subtitle: "London Dry Gin",         sceneImage: tanqueray,     soloImage: tanqueraySolo },
  { name: "Cîroc",          subtitle: "Ultra-Premium Vodka",    sceneImage: ciroc,         soloImage: cirocSolo },
  { name: "Baileys",        subtitle: "Irish Cream Liqueur",    sceneImage: baileys,       soloImage: baileysSolo },
  { name: "Smirnoff",       subtitle: "Premium Vodka",          sceneImage: smirnoff,      soloImage: smirnoffSolo },
];

const getOutwardOffset = (index) => {
  const col = index % 3;
  if (col === 0) return { x: -60, y: 0 };
  if (col === 2) return { x: 60, y: 0 };
  return { x: 0, y: 0 };
};

const getDelay = (index) => {
  const col = index % 3;
  return col === 1 ? 0 : 0.15;
};

// ─── BrandsSection ────────────────────────────────────────────────────────────

const BrandsSection = () => {
  return (
    <section className="min-h-screen bg-background py-16 md:py-24 px-4 md:px-8">
      <motion.div
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1
          className="text-4xl md:text-6xl text-[#C9A84C] font-light tracking-[0.15em] uppercase"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Our{" "}
          <span className="text-primary font-semibold">Brands</span>
        </h1>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
        {brands.map((brand, i) => {
          const offset = getOutwardOffset(i);
          const delay = getDelay(i);
          return (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, x: offset.x, y: offset.y }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay, ease: "easeOut" }}
            >
              <BottleCard {...brand} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default BrandsSection;