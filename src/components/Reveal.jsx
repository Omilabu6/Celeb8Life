import { useEffect, useState } from "react";
import { useInView } from "../hooks/useInView";

export function FadeUp({ children, delay = 0, duration = 0.8, className = "" }) {
  const [ref, inView] = useInView({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(40px)",
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export function FadeIn({ children, delay = 0, duration = 1, className = "" }) {
  const [ref, inView] = useInView({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transition: `opacity ${duration}s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export function RevealText({ text, className = "", delay = 0, tag: Tag = "span" }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden" style={{ marginRight: "0.25em" }}>
          <span
            className="inline-block"
            style={{
              transform: inView ? "translateY(0)" : "translateY(110%)",
              opacity: inView ? 1 : 0,
              transition: `transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * 0.06}s, opacity 0.6s ease ${delay + i * 0.06}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}

export function LineReveal({ className = "", delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  return (
    <div
      ref={ref}
      className={`h-px bg-current origin-left ${className}`}
      style={{
        transform: inView ? "scaleX(1)" : "scaleX(0)",
        transition: `transform 1.2s cubic-bezier(0.76, 0, 0.24, 1) ${delay}s`,
      }}
    />
  );
}

export function CountUp({ to, suffix = "", className = "" }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime = null;
    const duration = 1800;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
}
