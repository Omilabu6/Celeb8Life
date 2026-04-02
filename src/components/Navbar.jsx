import { useEffect, useRef, useState } from "react";
import logo from "./../public/logo.svg";
import line from "./../public/line.svg";

const leftLinks = ["Home", "About", "Experience"];
const rightLinks = ["FAQ", "Carving", "About Us"];
const allLinks = [...leftLinks, ...rightLinks];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (currentY > lastScrollY.current && currentY > 80) {
            setHidden(true);
          } else {
            setHidden(false);
          }
          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Montserrat:wght@400;500;600&display=swap');

        .nav-link-underline {
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 0.5px;
          background: #C9A84C;
          transition: width 0.3s ease;
        }
        .nav-link:hover .nav-link-underline { width: 100% !important; }
        .nav-link:hover { opacity: 0.65 !important; }

        /* Hamburger lines */
        .hb-line {
          display: block;
          width: 24px;
          height: 1.5px;
          background: #C9A84C;
          transition: transform 0.4s cubic-bezier(0.76,0,0.24,1),
                      opacity 0.3s ease,
                      width 0.4s cubic-bezier(0.76,0,0.24,1);
          transform-origin: center;
        }
        .hb-open .hb-top    { transform: translateY(6px) rotate(45deg); }
        .hb-open .hb-mid    { opacity: 0; width: 0; }
        .hb-open .hb-bot    { transform: translateY(-6px) rotate(-45deg); }

        /* Full-page overlay */
        .menu-overlay {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: #09080A;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 0 8vw;
          clip-path: inset(0 0 100% 0);
          transition: clip-path 0.75s cubic-bezier(0.76,0,0.24,1);
          pointer-events: none;
        }
        .menu-overlay.open {
          clip-path: inset(0 0 0% 0);
          pointer-events: all;
        }

        /* Staggered menu items */
        .menu-item {
          overflow: hidden;
          margin: 6px 0;
        }
        .menu-item-inner {
          display: block;
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 7vw, 5.5rem);
          font-weight: 300;
          color:#C9A84C;
          opacity:0.8;
          letter-spacing: 0.04em;
          text-decoration: none;
          text-transform: uppercase;
          line-height: 1.1;
          transform: translateY(110%);
          transition: transform 0.65s cubic-bezier(0.76,0,0.24,1),
                      color 0.3s ease;
        }
        .menu-overlay.open .menu-item-inner {
          transform: translateY(0);
        }
        .menu-overlay.open .menu-item:nth-child(1) .menu-item-inner { transition-delay: 0.08s; }
        .menu-overlay.open .menu-item:nth-child(2) .menu-item-inner { transition-delay: 0.13s; }
        .menu-overlay.open .menu-item:nth-child(3) .menu-item-inner { transition-delay: 0.18s; }
        .menu-overlay.open .menu-item:nth-child(4) .menu-item-inner { transition-delay: 0.23s; }
        .menu-overlay.open .menu-item:nth-child(5) .menu-item-inner { transition-delay: 0.28s; }
        .menu-overlay.open .menu-item:nth-child(6) .menu-item-inner { transition-delay: 0.33s; }

        /* Close items animate back */
        .menu-overlay:not(.open) .menu-item-inner {
          transition-delay: 0s !important;
        }

        .menu-item-inner:hover {
          color: #C9A84C !important;
          -webkit-text-stroke: 0px;
        }

        /* Gold line decoration in overlay */
        .overlay-line {
          width: 60px;
          height: 1px;
          background: #C9A84C;
          margin-bottom: 40px;
          opacity: 0;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.76,0,0.24,1) 0.05s,
                      opacity 0.3s ease 0.05s;
        }
        .menu-overlay.open .overlay-line {
          opacity: 1;
          transform: scaleX(1);
        }

        /* Overlay footer */
        .overlay-footer {
          position: absolute;
          bottom: 48px;
          left: 8vw;
          right: 8vw;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .menu-overlay.open .overlay-footer {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.45s;
        }
        .overlay-footer-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #C9A84C66;
        }

        /* Hamburger button */
        .hb-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4.5px;
          z-index: 1001;
          position: relative;
        }

        /* Desktop: hide hamburger */
        @media (min-width: 769px) {
          .hb-btn { display: none; }
          .desktop-links { display: flex !important; }
          .desktop-cta { display: flex !important; }
        }

        /* Mobile: hide desktop links */
        @media (max-width: 768px) {
          .desktop-links { display: none !important; }
          .desktop-cta { display: none !important; }
          .nav-logo { 
            position: relative !important;
            left: unset !important;
            transform: none !important;
            top: unset !important;
          }
        }

        /* Noise texture overlay */
        .menu-overlay::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.4;
        }
      `}</style>

      {/* Full-page mobile menu overlay */}
      <div className={`menu-overlay block md:hidden ${menuOpen ? "open" : ""}`}>
        <div className="overlay-line" />
        {allLinks.map((link) => (
          <div className="menu-item" key={link}>
            <a
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="menu-item-inner"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          </div>
        ))}
        <div className="overlay-footer">
          <span className="overlay-footer-text">© 2026 Celeb8Life</span>
          <span className="overlay-footer-text">All Rights Reserved</span>
        </div>
      </div>

      {/* Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          backdropFilter: menuOpen ? "none" : "blur(8px)",
          WebkitBackdropFilter: menuOpen ? "none" : "blur(8px)",
          padding: "14px 32px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transform: hidden && !menuOpen ? "translateY(-110%)" : "translateY(0)",
          transition: "transform 0.5s cubic-bezier(0.76,0,0.24,1)",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        {/* LEFT LINKS — desktop only */}
        <ul
          className="desktop-links"
          style={{
            gap: "36px",
            listStyle: "none",
            margin: 0,
            padding: 10,
            flex: 1,
          }}
        >
          {leftLinks.map((link) => (
            <li key={link}>
              <a
                className="nav-link"
                href={`#${link.toLowerCase()}`}
                style={{
                  color: "#C9A84C",
                  fontSize: "11px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  position: "relative",
                  paddingBottom: "2px",
                  transition: "opacity 0.3s ease",
                  fontWeight: 500,
                }}
              >
                {link}
                <span className="nav-link-underline" />
              </a>
            </li>
          ))}
        </ul>

          {/* CENTER LOGO */}
        <a
          href="#"
          className="nav-logo -ml-5"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: "10px",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              height: "50px",
              filter:
                "brightness(0) saturate(100%) invert(72%) sepia(40%) saturate(600%) hue-rotate(5deg) brightness(95%)",
            }}
          />
        </a>

        {/* RIGHT LINKS + CTA — desktop only */}
        <div
          className="desktop-cta"
          style={{
            alignItems: "center",
            gap: "28px",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          {rightLinks.map((link) => (
            <a
              className="nav-link"
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              style={{
                color: "#C9A84C",
                fontSize: "11px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                textDecoration: "none",
                position: "relative",
                paddingBottom: "2px",
                transition: "opacity 0.3s ease",
                fontWeight: 500,
              }}
            >
              {link}
              <span className="nav-link-underline" />
            </a>
          ))}
          <button
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 500,
              background: "#C9A84C",
              color: "#09080A",
              border: "none",
              padding: "8px 20px",
              cursor: "pointer",
              transition: "opacity 0.3s ease",
              whiteSpace: "nowrap",
              fontFamily: "'Montserrat', sans-serif",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Get in Touch
          </button>
        </div>
        <div className="absolute hidden md:block mt-14 px-10 left-0">
        <img src={line} alt="" className="w-[30rem]" />
       </div>
       <div className="absolute hidden md:block mt-14 px-10 right-0">
        <img src={line} alt="" className="w-[30rem]" />
       </div>

        {/* HAMBURGER — mobile only */}
        <button
          className={`hb-btn ${menuOpen ? "hb-open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{ marginLeft: "auto" }}
        >
          <span className="hb-line hb-top" />
          <span className="hb-line hb-mid" />
          <span className="hb-line hb-bot" />
        </button>
      </nav>
    </>
  );
}