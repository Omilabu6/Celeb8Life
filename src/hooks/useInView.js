import { useEffect, useRef, useState } from "react";

/**
 * useInView - Returns true once the element enters the viewport.
 * Used to trigger "reveal" animations when content scrolls into view.
 *
 * @param {object} options
 * @param {number} options.threshold - 0..1, how much of the element must be visible (default 0.15)
 * @param {string} options.rootMargin - CSS margin to expand/shrink the viewport trigger zone
 * @param {boolean} options.once - if true, stays true after first trigger (default true)
 */
export function useInView({ threshold = 0.15, rootMargin = "0px", once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
