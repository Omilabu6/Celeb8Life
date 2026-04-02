import { useRef , useState} from "react";
import { useParallax } from "../hooks/useParallax";
import { FadeUp, LineReveal } from "./Reveal";
import logo from "./../public/logo.svg"
import Footer from "./Footer";


export default function ContactSection() {
  const sectionRef = useRef(null);
   const [email, setEmail] = useState("");
  const bgWordOffset = useParallax(sectionRef, 0.08);
  const scrollOffset = useParallax(sectionRef, 0.24);
  const textOffset = useParallax(sectionRef, 0.4);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="light"
      id="contact"
      className="relative min-h-screen pt-32 bg-[#f0ece4] flex items-center flex-col justify-center overflow-hidden "
    >
       <div
          style={{
            transform: ` translateY(${scrollOffset}px)`,
            willChange: "transform",
          }}
        >
         <div
        className=" pt-20 flex justify-center pointer-events-none overflow-hidden"
        style={{ transform: `translateY(${bgWordOffset}px)`, willChange: "transform" }}
      >
        <img
        src={logo}
        alt=""
        className="select-none w-[150vw] md:w-[50vw]"
        style={{ 
          opacity: 0.8,
          filter: "invert(0) brightness(0.5) saturate(0)", // nuke it to black
        }}
      />
     </div>
    </div>
      <div className="w-full px-6 pt-52 flex flex-col gap-10 md:flex-row md:justify-between md:items-start md:gap-0">

      {/* Left: Stay in touch */}
      <div className="flex flex-col gap-4">
        <p
          className="text-xs tracking-widest uppercase font-semibold"
          style={{ color: "#5a5147" }}
        >
          Stay in Touch
        </p>
        <p
          className="text-xs tracking-widest uppercase"
          style={{ color: "#5a5147" }}
        >
          Sign up for new releases, collaborations and events.
        </p>
        <div className="flex items-stretch border border-current" style={{ color: "#5a5147" }}>
          <input
            type="email"
            placeholder="YOUR EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent px-4 py-3 text-xs tracking-widest uppercase outline-none placeholder-current w-full md:w-56"
            style={{ color: "#5a5147" }}
          />
          <button
            className="px-5 py-3 text-xs tracking-widest uppercase font-semibold border-l border-current hover:bg-stone-300 transition-colors duration-200"
            style={{ color: "#5a5147", borderColor: "#5a5147" }}
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Right: Follow us */}
      <div className="flex flex-col gap-3 md:text-right">
        <p
          className="text-xs tracking-widest uppercase font-semibold"
          style={{ color: "#5a5147" }}
        >
          Follow Us
        </p>
        <div className="flex flex-col gap-2">
          {["Facebook", "Instagram"].map((platform) => (
            <a
              key={platform}
              href="#"
              className="text-xs tracking-widest uppercase border-b border-current pb-0.5 hover:opacity-60 transition-opacity duration-200"
              style={{ color: "#5a5147" }}
            >
              {platform}
            </a>
          ))}
        </div>
      </div>

</div>
      
    </section>
  );
}
