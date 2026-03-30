import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
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
        <Discover/>
        <ScrollShowcase />
        <StickyPanels/>
        <ContactSection />
        <Footer/>
      </div>
    </div>
  );
}
