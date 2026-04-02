import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [label, setLabel] = useState("");

  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      setHidden(false);
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    // Animate the ring with lerp (smooth lag)
    const animateRing = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animateRing);
    };
    rafRef.current = requestAnimationFrame(animateRing);

    // Detect hoverable elements
    const handleHoverOn = (e) => {
      const el = e.currentTarget;
      setHovered(true);
      setLabel(el.dataset.cursorLabel || "");
    };
    const handleHoverOff = () => {
      setHovered(false);
      setLabel("");
    };

    const hoverEls = document.querySelectorAll("a, button, [data-cursor]");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverOn);
      el.addEventListener("mouseleave", handleHoverOff);
    });

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(rafRef.current);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverOn);
        el.removeEventListener("mouseleave", handleHoverOff);
      });
    };
  }, []);

  return (
    <>
      {/* Dot cursor — snaps instantly */}
      <div
        ref={dotRef}
        className="fixed hidden md:block top-0 left-0 z-[99999] pointer-events-none mix-blend-difference"
        style={{
          width: clicked ? "6px" : "6px",
          height: clicked ? "6px" : "6px",
          marginLeft: "-3px",
          marginTop: "-3px",
          borderRadius: "50%",
          background: "white",
          opacity: hidden ? 0 : 1,
          transition: "opacity 0.2s",
          willChange: "transform",
        }}
      />

      {/* Ring cursor — lags behind with lerp */}
      <div
        ref={ringRef}
        className="fixed top-0 hidden md:block left-0 z-[99998] pointer-events-none mix-blend-difference flex items-center justify-center"
        style={{
          width: hovered ? "60px" : clicked ? "24px" : "36px",
          height: hovered ? "60px" : clicked ? "24px" : "36px",
          marginLeft: hovered ? "-30px" : clicked ? "-12px" : "-18px",
          marginTop: hovered ? "-30px" : clicked ? "-12px" : "-18px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.8)",
          opacity: hidden ? 0 : 1,
          transition: "width 0.3s cubic-bezier(0.76,0,0.24,1), height 0.3s cubic-bezier(0.76,0,0.24,1), margin 0.3s cubic-bezier(0.76,0,0.24,1), opacity 0.2s",
          willChange: "transform",
        }}
      >
        {label && (
          <span
            className="text-white text-[9px] tracking-[0.2em] uppercase font-light"
            style={{ mixBlendMode: "difference" }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  );
}
