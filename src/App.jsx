import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { FadeUp, RevealText } from "./components/Reveal";
import MarqueeDivider from "./components/MarqueeDivider";
import ParallaxSection from "./components/ParallaxSection";
import AboutSection from "./components/AboutSection";
import GallerySection from "./components/GallerySection"
import ContactSection from "./components/ContactSection";
import WaterBornSection from "./components/WatertunSection";
import Discover from "./components/Discover";
import { Sticker } from "lucide-react";
import StickyPanels from "./components/StickyPanels";
import Footer from "./components/Footer";
import ScrollShowcase from "./components/ScrollShowcase"

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setLoaded(true);
        setTimeout(() => setCurtainOpen(true), 200);
      }, 2400);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <div className="relative">
      <Cursor />
      <Loader loaded={loaded} curtainOpen={curtainOpen} />

      <div
        style={{
          opacity: curtainOpen ? 1 : 0,
          transition: "opacity 0.8s ease 0.5s",
        }}
      >
        <Navbar />
        <Hero />
        <ParallaxSection />
        <WaterBornSection/>
        <MarqueeDivider theme="light" />
        <AboutSection />
        <GallerySection/>
        <div>
          <div className="text-center mx-auto py-48 max-w-4xl">
            <FadeUp>
              <p className="text-white text-[10px] tracking-[0.6em] uppercase mb-6 font-light">
                Discover Your Flavor
              </p>
            </FadeUp>
            <h2
            className="text-foreground text-[#C9A84C]  leading-[1.05] mb-20"
            style={{
              
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.8rem, 6vw, 3rem)",
              fontWeight: 300,
            }}
          >
            <RevealText text="From smoky to " />
            <br />
            <RevealText text="sweet" delay={0.15} />
            <RevealText text="every" delay={0.25} className="italic text-gold" />
            <RevealText text="note  is intentional" delay={0.35} />
          </h2>
          </div>
           <Discover/>
        </div>
       
        <ScrollShowcase />
        <StickyPanels/>
        <ContactSection />
        <Footer/>
      </div>
    </div>
  );
}
