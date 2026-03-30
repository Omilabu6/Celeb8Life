import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import john from "./../public/john.png";
import { FadeUp, RevealText } from "./Reveal";
import CameraModal from "./app/CameraModal";

const HeroSection = () => {
  const [cameraOpen, setCameraOpen] = useState(false);
  const fileInputRef = useRef(null);
  const sectionRef = useRef(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const animationStart = 0.38;
  const animationEnd = 0.58;
  const holdPoint = animationStart + (animationEnd - animationStart) * 0.5;
  const blurStart = animationStart + (animationEnd - animationStart) * 0.88;

  // Top Left Card
  const tlX = useTransform(scrollYProgress, [animationStart, holdPoint, animationEnd], [0, 0, -300]);
  const tlY = useTransform(scrollYProgress, [animationStart, holdPoint, animationEnd], [0, 0, -150]);
  const tlBlur = useTransform(scrollYProgress, [animationStart, holdPoint, blurStart, animationEnd], [0, 0, 0, 14]);
  const tlFilter = useTransform(tlBlur, (v) => `blur(${v}px)`);

  // Bottom Left Card
  const blX = useTransform(scrollYProgress, [animationStart, holdPoint, animationEnd], [0, 0, -300]);
  const blY = useTransform(scrollYProgress, [animationStart, holdPoint, animationEnd], [0, 0, 150]);
  const blBlur = useTransform(scrollYProgress, [animationStart, holdPoint, blurStart, animationEnd], [0, 0, 0, 14]);
  const blFilter = useTransform(blBlur, (v) => `blur(${v}px)`);

  // Top Right Card
  const trX = useTransform(scrollYProgress, [animationStart, holdPoint, animationEnd], [0, 0, 300]);
  const trY = useTransform(scrollYProgress, [animationStart, holdPoint, animationEnd], [0, 0, -150]);
  const trBlur = useTransform(scrollYProgress, [animationStart, holdPoint, blurStart, animationEnd], [0, 0, 0, 14]);
  const trFilter = useTransform(trBlur, (v) => `blur(${v}px)`);

  // Bottom Right Card
  const brX = useTransform(scrollYProgress, [animationStart, holdPoint, animationEnd], [0, 0, 300]);
  const brY = useTransform(scrollYProgress, [animationStart, holdPoint, animationEnd], [0, 0, 150]);
  const brBlur = useTransform(scrollYProgress, [animationStart, holdPoint, blurStart, animationEnd], [0, 0, 0, 14]);
  const brFilter = useTransform(brBlur, (v) => `blur(${v}px)`);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        sessionStorage.setItem("nutrify_pending_scan", reader.result);
        navigate("/app");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = (imageDataUrl) => {
    sessionStorage.setItem("nutrify_pending_scan", imageDataUrl);
    navigate("/app");
  };

  const CardInner = ({ color, label, description, initial, delay }) => (
    <motion.div
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      transition={{ type: "spring", delay }}
      className="w-full bg-white/5 backdrop-blur-xl rounded-[2rem] p-5 flex flex-col gap-3 border border-white/10 shadow-[0_0_30px_rgba(255,200,100,0.05)]"
    >
      <span className={`text-[11px] font-semibold tracking-[0.2em] ${color} uppercase`}>
        {label}
      </span>
      <p className="text-[13px] leading-relaxed text-white/70">{description}</p>
    </motion.div>
  );

  return (
    <section ref={sectionRef} className="relative text-white">
      <div className="sticky -top-16 overflow-hidden flex flex-col items-center pt-24 sm:pt-28 lg:pt-32 min-h-screen">

        {/* Decorative rings */}
        <div className="absolute top-[62%] lg:top-[68%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] border border-white/20 rounded-full pointer-events-none" />
        <div className="absolute top-[62%] lg:top-[68%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] sm:w-[1200px] sm:h-[1200px] border border-white/10 rounded-full pointer-events-none" />
        <div className="absolute top-[62%] lg:top-[68%] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] sm:w-[1700px] sm:h-[1700px] border border-white/5 rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-orange-300/20 to-transparent blur-[80px] rounded-full pointer-events-none" />

        <div className="container relative z-10 mx-auto max-w-5xl px-5 h-full flex flex-col items-center text-center">

          {/* Heading */}
          <div className="text-center pb-20 max-w-4xl">
            <FadeUp>
              <p className="text-white text-[10px] tracking-[0.6em] uppercase mb-6 font-light">
                Discover Your Flavor
              </p>
            </FadeUp>
            <h2
            className="text-foreground text-[#C9A84C]  leading-[1.05] mb-15"
            style={{
              
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.8rem, 6vw, 4rem)",
              fontWeight: 300,
            }}
          >
            <RevealText text="From smoky to sweet, " />
            <br />
            <RevealText text="every note is intentional." delay={0.15} />
            <RevealText text="session" delay={0.25} className="italic text-gold" />
            <RevealText text="is crafted with intention." delay={0.35} />
          </h2>
          </div>
          {/* Bottle + Cards layout — all centered together */}
          <div className="relative w-full max-w-4xl mx-auto flex justify-center items-start min-h-[700px] sm:min-h-[760px] lg:min-h-[820px]">

            {/* Bottle — centered */}
            <div className="relative z-20 w-[200px] sm:w-[240px] lg:w-[280px]">
              <img src={john} alt="John bottle" className="w-full h-auto object-contain" />
            </div>

            {/* TOP LEFT — Smoky */}
            <motion.div
              style={{ x: tlX, y: tlY, filter: tlFilter }}
              className="hidden sm:flex absolute z-10 top-[8%] left-[2%] lg:left-[4%] w-48"
            >
              <CardInner
                color="text-amber-300"
                label="Smoky"
                description="Deep, layered, and unmistakably bold. Smoky expressions carry notes of peat, charred wood, and a lingering warmth that unfolds with every sip."
                initial={{ opacity: 0, x: -40, y: 20 }}
                delay={0.6}
              />
            </motion.div>

            {/* BOTTOM LEFT — Spicy */}
            <motion.div
              style={{ x: blX, y: blY, filter: blFilter }}
              className="hidden sm:flex absolute z-30 top-[55%] left-[2%] lg:left-[4%] w-48"
            >
              <CardInner
                color="text-orange-300"
                label="Spicy"
                description="Warm, vibrant, and full of character. Spicy notes bring hints of pepper, cinnamon, and subtle heat that add depth and intensity to every sip."
                initial={{ opacity: 0, scale: 0.8 }}
                delay={0.8}
              />
            </motion.div>

            {/* TOP RIGHT — Sweet */}
            <motion.div
              style={{ x: trX, y: trY, filter: trFilter }}
              className="hidden sm:flex absolute z-10 top-[8%] right-[2%] lg:right-[4%] w-48"
            >
              <CardInner
                color="text-amber-300"
                label="Sweet"
                description="Smooth, rich, and inviting. Sweet notes reveal hints of honey, vanilla, and caramel, creating a balanced warmth that lingers gently on the palate."
                initial={{ opacity: 0, scale: 0.8 }}
                delay={1.0}
              />
            </motion.div>

            {/* BOTTOM RIGHT — Fruity */}
            <motion.div
              style={{ x: brX, y: brY, filter: brFilter }}
              className="hidden sm:flex absolute z-30 top-[55%] right-[2%] lg:right-[4%] w-48"
            >
              <CardInner
                color="text-rose-300"
                label="Fruity"
                description="Bright, vibrant, and expressive. Fruity notes bring hints of citrus, orchard fruits, and subtle sweetness, adding a lively character to every sip."
                initial={{ opacity: 0, scale: 0.8 }}
                delay={0.9}
              />
            </motion.div>

          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      <CameraModal
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onCapture={handleCapture}
      />
    </section>
  );
};

export default HeroSection;