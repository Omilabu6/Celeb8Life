// src/hooks/useParallax.js
import { useState, useEffect } from "react";

export function useParallax(ref, speed = 0.1) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;

      // Distance of section center from viewport center
      const distanceFromCenter = sectionCenter - viewportCenter;

      setOffset(distanceFromCenter * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, speed]);

  return offset;
}