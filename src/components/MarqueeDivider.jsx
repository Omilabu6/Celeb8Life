import Marquee from "./Marquee";

const services = [
  "Curated Tastings",
  "Private Sessions",
  "Whisky Flights",
  "Guided Experiences",
  "Flavor Discovery",
  "Group Tastings",
  "Signature Moments",
  "Luxury Evenings"
];

export default function MarqueeDivider({ theme = "dark" }) {
  const isDark = theme === "dark";
  return (
    <div
      data-nav-theme={theme}
      className={`py-6 border-y overflow-hidden ${
        isDark
          ? "bg-[#0a0a0a] border-white/8 text-white/30"
          : "bg-[#f0ece4] border-black/8 text-black/30"
      }`}
    >
      <Marquee
        items={services}
        speed={40}
        direction="left"
        className={`text-[11px] tracking-[0.4em] uppercase font-light`}
      />
    </div>
  );
}
