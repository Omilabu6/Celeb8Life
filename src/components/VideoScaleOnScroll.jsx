import { useRef, useEffect, useState } from "react";

function VideoScaleOnScroll({ children }) {
  const ref = useRef(null);
  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const videoHeight = rect.height;

      // How far the user has scrolled into the video from the top
      const scrolledInto = window.innerHeight - rect.top;

      // Trigger threshold: 30% of video height
      const threshold = videoHeight * 0.5;

      if (scrolledInto <= 0) {
        setScale(0.8);
     } else if (scrolledInto >= threshold) {
        setScale(1); // was 0.9
        } else {
        const progress = scrolledInto / threshold;
        setScale(0.8 + progress * 0.2); // was 0.8 + progress * 0.1
        }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} style={{ transform: `scale(${scale})`, transition: "transform 0.1s ease-out " }}>
      {children}
    </div>
  );
}
export default  VideoScaleOnScroll