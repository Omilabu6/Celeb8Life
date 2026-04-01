 import ScrollVelocity from '../components/ScrollVelocity';
  
const footerData = [
  {
    heading: "Experiences",
    links: ["Social Tasting", "Connoisseur Group", "Monthly Sessions"],
  },
  {
    heading: "Information",
    links: ["About Us", "How It Works", "Cancellation Policy"],
  },
  {
    heading: "Contact",
    links: ["WhatsApp", "Email Us"],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#f0ece4] pl-6 sm:px-10 md:px-14 pt-14 md:pt-20 pb-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 max-w-6xl mx-auto">

        {/* Brand column */}
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <h2
            className="text-[#c9b46a] text-3xl leading-tight"
            style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}
          >
            The Tasting Room
          </h2>
          <p className="text-[#6b6b63] text-sm font-serif leading-relaxed mt-2 max-w-xs">
            A private whisky experience by Celebr8 Lyfe Reserve. Lagos, Nigeria.
            For those who understand that the finest moments in life are meant to
            be savoured — not rushed.
          </p>
        </div>

        {/* Nav columns */}
        {footerData.map((col) => (
          <div key={col.heading} className="mx-auto">
            <h4 className="text-[#c9b46a] text-xs font-bold tracking-widest uppercase mb-5  font-sans">
              {col.heading}
            </h4>
            <ul className="space-y-4">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[#6b6b63] text-sm font-serif hover:text-[#c9b46a] transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className='pt-24'>
        <ScrollVelocity
          texts={['Celeb8 Life • Curated Experiences • Every Pour Matters •']} 
          velocity={70}
          className="custom-scroll-text"
        />
      </div>
      {/* Bottom bar */}
      <div className="mt-32 pt-6  flex flex-col sm:flex-row justify-between items-center gap-2 text-[9px] tracking-[0.35em] uppercase font-light text-[#6b6b63]">
        <span>© 2026 Celeb8Life</span>
        <span>All Rights Reserved</span>
      </div>
    </footer>
  );
}