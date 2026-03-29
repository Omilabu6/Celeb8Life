import { useRef } from "react";

/**
 * TiltCard — a 3D card that tilts toward the mouse cursor.
 *
 * HOW IT WORKS:
 * We track the mouse position relative to the card's center.
 * We convert that offset to rotation values (rotateX and rotateY).
 * CSS perspective makes the tilt look 3D.
 *
 * maxTilt controls how extreme the tilt angle is (degrees).
 * glare adds a moving light reflection effect.
 */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 15,
  glare = true,
  scale = 1.02,
}) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const rafRef = useRef(null);

  const handleMouseMove = (e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized offset from center: -1 to +1
      const normalX = (e.clientX - centerX) / (rect.width / 2);
      const normalY = (e.clientY - centerY) / (rect.height / 2);

      // Rotation: mouse right = tilt right (rotateY positive)
      //           mouse up = tilt back (rotateX negative)
      const rotY = normalX * maxTilt;
      const rotX = -normalY * maxTilt;

      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;

      if (glare && glareRef.current) {
        // Glare position: move light spot based on mouse
        const glareX = (normalX + 1) * 50; // 0-100%
        const glareY = (normalY + 1) * 50;
        glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;
        glareRef.current.style.opacity = "1";
      }
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)`;
    }
    if (glare && glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out",
        willChange: "transform",
      }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          style={{ opacity: 0, transition: "opacity 0.3s ease", zIndex: 10 }}
        />
      )}
    </div>
  );
}
