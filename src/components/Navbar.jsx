import { useEffect, useRef, useState } from "react";
import logo from "./../public/logo.svg";
import line from "./../public/line.svg";


const leftLinks = ["Home", "About", "Experience"];
const rightLinks = ["FAQ", "Carving", "About Us"];





export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [textColor, setTextColor] = useState("white");
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const heroHeight = window.innerHeight;

          if (currentY > lastScrollY.current && currentY > 80) {
            setHidden(true);
          } else {
            setHidden(false);
          }

          setPastHero(currentY > heroHeight * 0.85);
          detectBackgroundColor();

          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const detectBackgroundColor = () => {
    const sections = document.querySelectorAll("[data-nav-theme]");
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 80 && rect.bottom >= 80) {
        const theme = section.getAttribute("data-nav-theme");
        setTextColor(theme === "dark" ? "white" : "black");
        return;
      }
    }
    setTextColor("white");
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        padding: "14px 32px 22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transform: hidden ? "translateY(-110%)" : "translateY(0)",
        transition: "transform 0.5s cubic-bezier(0.76,0,0.24,1)",
        borderBottom: "none",
      }}
    >
      {/* LEFT LINKS */}
      <ul
        style={{
          display: "flex",
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
             className="font-medium "
              href={`#${link.toLowerCase()}`}
              style={{
                color: "#C9A84C",
                fontSize: "11px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                textDecoration: "none",
                position: "relative",
                paddingBottom: "2px",
                transition: "color 0.3s ease, opacity 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.65")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              {link}
              {/* Underline hover */}
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: 0,
                  height: "0.5px",
                  background: "#C9A84C",
                  transition: "width 0.3s ease",
                }}
                className="nav-underline"
              />
            </a>
          </li>
        ))}
      </ul>

      {/* CENTER LOGO */}
      <a
        href="#"
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

      {/* RIGHT LINKS + CTA */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "28px",
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        {rightLinks.map((link) => (
          <a
          className="font-medium"
            key={link}
            href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
            style={{
              color: "#C9A84C",
              fontSize: "11px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.65")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            {link}
          </a>
        ))}

        {/* CTA Button */}
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
            transition: "background 0.3s ease, opacity 0.3s ease",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Get in Touch
        </button>
      </div>
      <div className="absolute  mt-14 px-10 left-0">
        <img src={line} alt="" className="w-[30rem]" />
       </div>
       <div className="absolute mt-14 px-10 right-0">
        <img src={line} alt="" className="w-[30rem]" />
       </div>

      {/* Inline style for hover underline effect */}
      <style>{`
        nav a:hover .nav-underline { width: 100% !important; }
      `}</style>
    </nav>
  );
}