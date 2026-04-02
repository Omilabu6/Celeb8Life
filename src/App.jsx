import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
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
import HomePage from "./components/HomePage";

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
        <HomePage />
        <div className="bg-[#f0ece4]">
          <ParallaxSection />
          <WaterBornSection/>
        </div>
        <MarqueeDivider theme="light" />
        <AboutSection />
        <GallerySection/>
        <div>
          <div className="text-center mx-auto py-8 md:py-48 max-w-4xl">
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
                    Discover Your Flavour
                  </p>
                  <div style={{ width: 32, height: 1, background: "rgba(240, 236, 228, 0.7)" }} />
                </div>
              </FadeUp>
            <h2
            className="text-foreground text-[#C9A84C]  leading-[1.05] mb-20"
            style={{
              
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 8vw, 3rem)",
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
        
        <div className="bg-[#f0ece4] ">
        <ScrollShowcase />
        <StickyPanels/>
        <ContactSection />
        <Footer/>
       </div>
      </div>
    </div>
  );
}
