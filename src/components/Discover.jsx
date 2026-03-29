// import { useState, useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { useParallax } from "../hooks/useParallax";
// import john from "../public/john.png";
// import CameraModal from "./app/CameraModal";
// import { FadeUp } from "./Reveal";

// const Discover = () => {
//   const [cameraOpen, setCameraOpen] = useState(false);
//   const sectionRef = useRef(null);
//   const subtitleOffset = useParallax(sectionRef, 0.16);
//   const titleOffset = useParallax(sectionRef, 0.3);

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end start"],
//   });

//   const animationStart = 0.38;
//   const animationEnd = 0.58;

//   // Top Left Card
//   const tlX = useTransform(scrollYProgress, [animationStart, animationEnd], [0, -300]);
//   const tlY = useTransform(scrollYProgress, [animationStart, animationEnd], [0, -150]);
//   const tlOpacity = useTransform(scrollYProgress, [animationStart, animationEnd], [1, 0]);
//   const tlBlur = useTransform(scrollYProgress, [animationStart, animationEnd], [0, 14]);
//   const tlFilter = useTransform(tlBlur, (v) => `blur(${v}px)`);

//   // Bottom Left Card
//   const blX = useTransform(scrollYProgress, [animationStart, animationEnd], [0, -300]);
//   const blY = useTransform(scrollYProgress, [animationStart, animationEnd], [0, 150]);
//   const blOpacity = useTransform(scrollYProgress, [animationStart, animationEnd], [1, 0]);
//   const blBlur = useTransform(scrollYProgress, [animationStart, animationEnd], [0, 14]);
//   const blFilter = useTransform(blBlur, (v) => `blur(${v}px)`);

//   // Small Stars / Calorie Badge
//   const starsX = useTransform(scrollYProgress, [animationStart, animationEnd], [0, -250]);
//   const starsOpacity = useTransform(scrollYProgress, [animationStart, animationEnd], [1, 0]);
//   const starsBlur = useTransform(scrollYProgress, [animationStart, animationEnd], [0, 14]);
//   const starsFilter = useTransform(starsBlur, (v) => `blur(${v}px)`);

//   // Top Right Card
//   const trX = useTransform(scrollYProgress, [animationStart, animationEnd], [0, 300]);
//   const trY = useTransform(scrollYProgress, [animationStart, animationEnd], [0, -150]);
//   const trOpacity = useTransform(scrollYProgress, [animationStart, animationEnd], [1, 0]);
//   const trBlur = useTransform(scrollYProgress, [animationStart, animationEnd], [0, 14]);
//   const trFilter = useTransform(trBlur, (v) => `blur(${v}px)`);

//   // Bottom Right Card
//   const brX = useTransform(scrollYProgress, [animationStart, animationEnd], [0, 300]);
//   const brY = useTransform(scrollYProgress, [animationStart, animationEnd], [0, 150]);
//   const brOpacity = useTransform(scrollYProgress, [animationStart, animationEnd], [1, 0]);
//   const brBlur = useTransform(scrollYProgress, [animationStart, animationEnd], [0, 14]);
//   const brFilter = useTransform(brBlur, (v) => `blur(${v}px)`);

//   // Phone scale
//   const phoneScale = useTransform(scrollYProgress, [animationStart, animationEnd], [1, 1.05]);

//    return (
//     <section ref={sectionRef} className="relative min-h-[200vh]">

//       {/* Title */}
//       <div
//         className="mb-24"
//         style={{
//           transform: `translateY(${titleOffset}px)`,
//           willChange: "transform",
//         }}
//       >
//         <FadeUp delay={0.1}>
//           <h2
//             className="text-[#C9A84C] text-center"
//             style={{
//               fontFamily: "'Playfair Display', serif",
//               fontSize: "clamp(3rem, 7vw, 8rem)",
//               fontWeight: 300,
//               lineHeight: 0.95,
//             }}
//           >
//             Discover Your <em className="px-3">Palate</em>
//           </h2>
//         </FadeUp>
//       </div>

//       {/* Description */}
//       <div
//         style={{
//           transform: `translateY(${subtitleOffset}px)`,
//           willChange: "transform",
//         }}
//       >
//         <div className="text-[#C9A84C] text-center mx-auto font-medium p-3 text-[13px] w-[500px] tracking-[0.1em]">
//           <p>
//             Whisky is more than a drink — it's a journey through layers of flavor and time.
//             From deep, smoky finishes to smooth, lingering sweetness, every expression tells a story.
//             Find where your taste lives, and let every pour reveal something new.
//           </p>
//         </div>
//       </div>

//       {/* CTA Button */}
//       <div className="mx-auto gap-10 mt-20 flex items-center justify-center">
//         <FadeUp delay={0.16}>
//           <button className="mt-6 border border-[#C9A84C] text-black px-6 py-3 text-[11px] tracking-[0.25em] uppercase rounded-sm hover:bg-black bg-[#C9A84C] hover:text-[#C9A84C] transition-colors duration-500">
//             Book Experience
//           </button>
//         </FadeUp>
//         <FadeUp delay={0.16}>
//           <button className="mt-6 border border-[#C9A84C] text-[#C9A84C] px-6 py-3 text-[11px] tracking-[0.25em] uppercase rounded-sm hover:bg-[#C9A84C] hover:text-black transition-colors duration-500">
//             Discover More
//           </button>
//         </FadeUp>
//       </div>

//       {/* Sticky Section */}
//       <div className="sticky -top-16 overflow-hidden flex flex-col items-center justify-center pt-12 sm:pt-16 lg:pt-20">

//         {/* Glow */}
//         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-[#C9A84C]/20 to-transparent blur-[80px] rounded-full" />

//         <div className="container relative z-10 mx-auto max-w-5xl px-5 h-full flex justify-center">
//           <div className="relative w-full max-w-4xl mx-auto flex justify-center items-start min-h-[800px]">

//             {/* JOHN IMAGE */}
//             <motion.div
//               style={{ scale: phoneScale }}
//               initial={{ opacity: 0, y: 100 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{
//                 type: "spring",
//                 damping: 20,
//                 stiffness: 100,
//                 delay: 0.3,
//               }}
//               className="relative z-20 w-[240px] sm:w-[280px] lg:w-[320px]"
//             >
//               <motion.img
//                 src={john}
//                 alt="John Walker"
//                 className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
//                 animate={{ y: [0, -10, 0] }}
//                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
//               />
//             </motion.div>

//             {/* SMOKY */}
//             <motion.div style={{ x: tlX, y: tlY, opacity: tlOpacity, filter: tlFilter }} className="hidden sm:flex absolute z-10 top-[8%] left-0 lg:left-8 w-[300px]">
//               <motion.div className="w-full rounded-[1.6rem] border border-white/15 bg-[rgba(20,8,3,0.55)] backdrop-blur-md p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
//                 <span className="text-[#F6E7C8]" style={{ fontFamily: "'Playfair Display', serif" }}>SMOKY</span>
//                 <p className="text-[13px] leading-7 text-white/75 mt-2">
//                   Each expression is selected for its depth of nose — from honeyed warmth to peated smoke. Every pour announces itself before the first sip.
//                 </p>
//               </motion.div>
//             </motion.div>

//             {/* SPICY */}
//             <motion.div style={{ x: blX, y: blY, opacity: blOpacity, filter: blFilter }} className="hidden sm:flex absolute w-[300px] z-30 top-[40%] left-4">
//               <motion.div className="rounded-[1.6rem] border border-white/15 bg-[rgba(20,8,3,0.55)] backdrop-blur-md p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
//                 <span className="text-[#F6E7C8]" style={{ fontFamily: "'Playfair Display', serif" }}>SPICY</span>
//                 <p className="text-[13px] leading-7 text-white/75 mt-2">
//                   Time is the master blender. Layers of complexity are developed through years of quiet transformation in oak.
//                 </p>
//               </motion.div>
//             </motion.div>

//             {/* SWEET */}
//             <motion.div style={{ x: trX, y: trY, opacity: trOpacity, filter: trFilter }} className="hidden w-[300px] lg:block absolute z-10 top-[20%] right-[2%]">
//               <motion.div className="rounded-[1.6rem] border border-white/15 bg-[rgba(20,8,3,0.55)] backdrop-blur-md p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
//                 <span className="text-[#F6E7C8]" style={{ fontFamily: "'Playfair Display', serif" }}>SWEET</span>
//                 <p className="text-[13px] leading-7 text-white/75 mt-2">
//                   From malted barley to pure spring water, every element is chosen for provenance and story.
//                 </p>
//               </motion.div>
//             </motion.div>

//             {/* FRUITY */}
//             <motion.div style={{ x: brX, y: brY, opacity: brOpacity, filter: brFilter }} className="hidden sm:flex absolute z-30 w-[300px] top-[60%] right-8">
//               <motion.div className="rounded-[1.6rem] border border-white/15 bg-[rgba(20,8,3,0.55)] backdrop-blur-md p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
//                 <span className="text-[#F6E7C8]" style={{ fontFamily: "'Playfair Display', serif" }}>FRUITY</span>
//                 <p className="text-[13px] leading-7 text-white/75 mt-2">
//                   A rich amber warmth shaped by time in oak, speaking before words are ever needed.
//                 </p>
//               </motion.div>
//             </motion.div>

//           </div>
//         </div>
//       </div>

//       <CameraModal open={cameraOpen} onClose={() => setCameraOpen(false)} />

//     </section>
//   );
// };

// export default Discover;
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CheckCircle2,
  ChevronUp,
  Flame,
  AlertTriangle,
} from "lucide-react";
import john from "./../public/john.png";
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
  const tlX = useTransform(
    scrollYProgress,
    [animationStart, holdPoint, animationEnd],
    [0, 0, -300]
  );
  const tlY = useTransform(
    scrollYProgress,
    [animationStart, holdPoint, animationEnd],
    [0, 0, -150]
  );
  const tlBlur = useTransform(
    scrollYProgress,
    [animationStart, holdPoint, blurStart, animationEnd],
    [0, 0, 0, 14]
  );
  const tlFilter = useTransform(tlBlur, (v) => `blur(${v}px)`);

  // Bottom Left Card
  const blX = useTransform(
    scrollYProgress,
    [animationStart, holdPoint, animationEnd],
    [0, 0, -300]
  );
  const blY = useTransform(
    scrollYProgress,
    [animationStart, holdPoint, animationEnd],
    [0, 0, 150]
  );
  const blBlur = useTransform(
    scrollYProgress,
    [animationStart, holdPoint, blurStart, animationEnd],
    [0, 0, 0, 14]
  );
  const blFilter = useTransform(blBlur, (v) => `blur(${v}px)`);

  // Small Badge
  const starsX = useTransform(
    scrollYProgress,
    [animationStart, holdPoint, animationEnd],
    [0, 0, -250]
  );
  const starsBlur = useTransform(
    scrollYProgress,
    [animationStart, holdPoint, blurStart, animationEnd],
    [0, 0, 0, 14]
  );
  const starsFilter = useTransform(starsBlur, (v) => `blur(${v}px)`);

  // Top Right Card
  const trX = useTransform(
    scrollYProgress,
    [animationStart, holdPoint, animationEnd],
    [0, 0, 300]
  );
  const trY = useTransform(
    scrollYProgress,
    [animationStart, holdPoint, animationEnd],
    [0, 0, -150]
  );
  const trBlur = useTransform(
    scrollYProgress,
    [animationStart, holdPoint, blurStart, animationEnd],
    [0, 0, 0, 14]
  );
  const trFilter = useTransform(trBlur, (v) => `blur(${v}px)`);

  // Bottom Right Card
  const brX = useTransform(
    scrollYProgress,
    [animationStart, holdPoint, animationEnd],
    [0, 0, 300]
  );
  const brY = useTransform(
    scrollYProgress,
    [animationStart, holdPoint, animationEnd],
    [0, 0, 150]
  );
  const brBlur = useTransform(
    scrollYProgress,
    [animationStart, holdPoint, blurStart, animationEnd],
    [0, 0, 0, 14]
  );
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

  return (
    <section ref={sectionRef} className="relative bg-black text-white">
      <div className="sticky -top-16 overflow-hidden flex flex-col items-center pt-24 sm:pt-28 lg:pt-32 min-h-screen">
        <div className="absolute top-[62%] lg:top-[68%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] border border-white/20 rounded-full pointer-events-none" />
        <div className="absolute top-[62%] lg:top-[68%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] sm:w-[1200px] sm:h-[1200px] border border-white/10 rounded-full pointer-events-none" />
        <div className="absolute top-[62%] lg:top-[68%] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] sm:w-[1700px] sm:h-[1700px] border border-white/5 rounded-full pointer-events-none" />

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-orange-300/20 to-transparent blur-[80px] rounded-full pointer-events-none" />

        <div className="container relative z-10 mx-auto max-w-5xl px-5 h-full flex flex-col items-center text-center">
          <div className="flex flex-col items-center">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-serif text-[2.5rem] sm:text-5xl lg:text-[4.5rem] leading-[1.05] tracking-tight mb-6 max-w-4xl text-white"
            >
              Scan Your Food <br className="hidden sm:block" />
              <span className="italic bg-gradient-to-r from-orange-300 to-yellow-200 bg-clip-text text-transparent">
                Discover Missing Nutrient
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-base sm:text-lg text-white/70 w-full max-w-[600px] mx-auto mb-10 leading-relaxed"
            >
              Analyze your meals, uncover hidden nutrient gaps, and get smart
              recommendations instantly.
            </motion.p>
          </div>

          <div className="relative w-full max-w-4xl mx-auto flex justify-center items-start min-h-[700px] sm:min-h-[760px] lg:min-h-[820px]">
            <div>
              <img src={john} alt="John bottle" />
            </div>

            <motion.div
              style={{ x: tlX, y: tlY, filter: tlFilter }}
              className="hidden sm:flex absolute z-10 top-[8%] left-0 lg:left-8 w-48"
            >
              <motion.div
                initial={{ opacity: 0, x: -40, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ type: "spring", delay: 0.6 }}
                className="w-full bg-[#cad8f0] rounded-[2rem] p-4 flex flex-col gap-3 shadow-2xl border border-white/20"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="text-[11px] font-semibold text-black/70">
                    Nutrient Gaps
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-black/60">Iron</span>
                    <span className="text-[10px] font-bold text-orange-500">
                      28%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
                    <div className="h-full w-[28%] bg-orange-400 rounded-full" />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-black/60">
                      Vitamin D
                    </span>
                    <span className="text-[10px] font-bold text-red-500">
                      14%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
                    <div className="h-full w-[14%] bg-red-400 rounded-full" />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-black/60">Fiber</span>
                    <span className="text-[10px] font-bold text-yellow-600">
                      52%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
                    <div className="h-full w-[52%] bg-yellow-400 rounded-full" />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ x: blX, y: blY, filter: blFilter }}
              className="hidden sm:flex absolute z-30 top-[55%] left-4 lg:-left-4 min-w-[140px]"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", delay: 0.8 }}
                className="bg-[#fadd74] rounded-2xl p-4 shadow-xl border border-yellow-200/50 flex-col w-full"
              >
                <span className="text-[11px] font-medium text-black/60 mb-1 block">
                  Match Rate
                </span>

                <div className="flex items-end justify-between">
                  <span className="text-3xl font-serif text-black leading-none tracking-tight block">
                    98%
                  </span>
                  <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center shrink-0">
                    <ChevronUp className="w-3 h-3 text-yellow-400" />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ x: starsX, filter: starsFilter }}
              className="hidden sm:flex absolute z-10 top-[24%] left-[150px] lg:left-[210px]"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="bg-[#f9a8f6] rounded-full px-3 py-1.5 shadow-lg border border-white/20 items-center gap-1.5 flex"
              >
                <Flame className="w-3.5 h-3.5 text-black/70" />
                <span className="text-[11px] font-bold text-black/80">
                  620 kcal
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ x: trX, y: trY, filter: trFilter }}
              className="hidden lg:block absolute z-10 top-[14%] right-[2%] w-64 h-[200px]"
            >
              <motion.div
                initial={{ opacity: 0, x: 40, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ type: "spring", delay: 0.7 }}
                className="bg-[#baf4c1] rounded-3xl p-5 shadow-xl border border-green-200/50 flex flex-col relative w-full h-full overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-serif text-black leading-none">
                      85
                    </span>
                    <span className="text-sm font-medium text-black/70">
                      score
                    </span>
                  </div>

                  <p className="text-[12px] text-black/60 mb-5">
                    Excellent Meal Choice
                  </p>

                  <div className="bg-white rounded-full px-3 py-1 w-fit text-xs font-bold text-black shadow-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-green-600" /> Verified
                  </div>
                </div>

                <div className="absolute right-3 bottom-0 top-0 w-24 flex items-center justify-center transform scale-110 opacity-90 saturate-150">
                  <div className="w-16 h-32 rounded-full border-[6px] border-white/40 flex items-center justify-center rotate-12 bg-green-500/20 backdrop-blur shadow-inner">
                    <span className="font-serif text-2xl font-bold text-green-700 -rotate-12 italic">
                      N
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ x: brX, y: brY, filter: brFilter }}
              className="hidden sm:flex absolute z-30 top-[60%] right-8 lg:-right-4 w-[160px]"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", delay: 0.9 }}
                className="bg-white rounded-[24px] p-4 shadow-xl border border-white/30 flex flex-col gap-3 w-full"
              >
                <span className="text-[11px] font-semibold text-black/60">
                  Macros
                </span>

                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between mb-0.5">
                      <span className="text-[10px] text-black/55">Protein</span>
                      <span className="text-[10px] font-bold text-black">
                        32g
                      </span>
                    </div>
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-[64%] bg-blue-400 rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between mb-0.5">
                      <span className="text-[10px] text-black/55">Carbs</span>
                      <span className="text-[10px] font-bold text-black">
                        48g
                      </span>
                    </div>
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-[80%] bg-amber-400 rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between mb-0.5">
                      <span className="text-[10px] text-black/55">Fat</span>
                      <span className="text-[10px] font-bold text-black">
                        18g
                      </span>
                    </div>
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-[45%] bg-rose-400 rounded-full" />
                    </div>
                  </div>
                </div>
              </motion.div>
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