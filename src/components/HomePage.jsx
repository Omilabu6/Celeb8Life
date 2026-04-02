import { useState } from "react";
import Hero from "./Hero";
import AgeGate from "./AgeGate";

export default function HomePage() {
  const [ageVerified, setAgeVerified] = useState(() => {
    return localStorage.getItem("ageVerified") === "true";
  });

  const handleVerified = () => {
    localStorage.setItem("ageVerified", "true");
    setAgeVerified(true);
  };

  return (
    <div className="relative">
      <div
        className={`transition-all duration-1000 ${
          ageVerified
            ? "opacity-100 blur-0 scale-100"
            : "opacity-40 blur-[10px] scale-[1.02]"
        }`}
      >
        <Hero />
      </div>

      {!ageVerified && <AgeGate onVerified={handleVerified} />}
    </div>
  );
}