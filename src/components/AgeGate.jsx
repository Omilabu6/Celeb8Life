import { useState, useRef, useEffect } from "react";

export default function AgeGate({ onVerified }) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const [view, setView] = useState("form"); // form | pass | fail
  const [closing, setClosing] = useState(false);

  const monthRef = useRef(null);
  const yearRef = useRef(null);

  useEffect(() => {
    if (day.length >= 2) monthRef.current?.focus();
  }, [day]);

  useEffect(() => {
    if (month.length >= 2) yearRef.current?.focus();
  }, [month]);

  const verify = () => {
    setError("");

    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (
      !d ||
      !m ||
      !y ||
      d < 1 ||
      d > 31 ||
      m < 1 ||
      m > 12 ||
      y < 1900 ||
      y > new Date().getFullYear()
    ) {
      setError("Please enter a valid date of birth.");
      return;
    }

    const bday = new Date(y, m - 1, d);
    const now = new Date();

    let age = now.getFullYear() - bday.getFullYear();
    const monthDiff = now.getMonth() - bday.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && now.getDate() < bday.getDate())
    ) {
      age--;
    }

    const passed = age >= 18;

    if (passed) {
      setView("pass");

      setTimeout(() => {
        setClosing(true);
      }, 1000);

      setTimeout(() => {
        onVerified?.();
      }, 1700);
    } else {
      setView("fail");
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-6
      bg-[rgba(8,8,8,0.88)] backdrop-blur-md
      transition-opacity duration-700
      ${closing ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div className="flex flex-col items-center text-center w-full max-w-xs">
        {view === "form" && (
          <div className="w-full flex flex-col items-center animate-[fadeUp_0.6s_ease]">
            <p className="text-[9px] tracking-[0.38em] uppercase text-[#6b5f3e] mb-7">
              Celebr8 Lyfe Reserve
            </p>

            <h1 className="font-cormorant font-light text-[2.8rem] leading-none text-[#c9a84c] tracking-wide">
              The <em className="italic">Tasting</em>
              <br />
              Room.
            </h1>

            <div className="w-8 h-px bg-[#2e2718] my-6" />

            <p className="text-[9px] tracking-[0.35em] uppercase text-[#5a4f33] mb-4">
              Date of birth
            </p>

            <div className="flex gap-2 w-full mb-2">
              <div className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[8px] tracking-[0.3em] uppercase text-[#4a4028]">
                  Day
                </span>
                <input
                  type="number"
                  min="1"
                  max="31"
                  placeholder="DD"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-[#2e2718] text-[#c9a84c] font-cormorant font-light text-2xl text-center py-1.5 outline-none placeholder:text-[#2e2718] focus:border-[#c9a84c] transition-colors duration-200 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
              </div>

              <div className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[8px] tracking-[0.3em] uppercase text-[#4a4028]">
                  Month
                </span>
                <input
                  ref={monthRef}
                  type="number"
                  min="1"
                  max="12"
                  placeholder="MM"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-[#2e2718] text-[#c9a84c] font-cormorant font-light text-2xl text-center py-1.5 outline-none placeholder:text-[#2e2718] focus:border-[#c9a84c] transition-colors duration-200 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
              </div>

              <div className="flex-[1.5] flex flex-col items-center gap-1.5">
                <span className="text-[8px] tracking-[0.3em] uppercase text-[#4a4028]">
                  Year
                </span>
                <input
                  ref={yearRef}
                  type="number"
                  min="1900"
                  max="2099"
                  placeholder="YYYY"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-[#2e2718] text-[#c9a84c] font-cormorant font-light text-xl text-center py-1.5 outline-none placeholder:text-[#2e2718] focus:border-[#c9a84c] transition-colors duration-200 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
              </div>
            </div>

            <p
              className={`text-[11px] italic text-[#7a3a2a] min-h-[20px] mb-5 transition-opacity duration-200 ${
                error ? "opacity-100" : "opacity-0"
              }`}
            >
              {error || "\u00a0"}
            </p>

            <button
              onClick={verify}
              className="w-full py-3 bg-transparent border border-[#2e2718] text-[8px] tracking-[0.4em] uppercase text-[#6b5f3e] cursor-pointer hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300"
            >
              Enter the room
            </button>

            <p className="mt-5 text-[10px] tracking-wide leading-relaxed text-[#312a1a]">
              You confirm you are of legal drinking age in your country.
            </p>
          </div>
        )}

        {view === "pass" && (
          <div className="flex flex-col items-center animate-[fadeUp_0.6s_ease]">
            <p className="text-[9px] tracking-[0.38em] uppercase text-[#6b5f3e] mb-7">
              Celebr8 Lyfe Reserve
            </p>
            <div className="w-8 h-px bg-[#2e2718] mb-7" />
            <h2 className="font-cormorant font-light text-[2.4rem] leading-tight text-[#c9a84c]">
              Welcome
              <br />
              <em className="italic">inside.</em>
            </h2>
            <p className="mt-5 text-[9px] tracking-[0.3em] uppercase text-[#5a4f33]">
              Enjoy responsibly
            </p>
          </div>
        )}

        {view === "fail" && (
          <div className="flex flex-col items-center animate-[fadeUp_0.6s_ease]">
            <p className="text-[9px] tracking-[0.38em] uppercase text-[#6b5f3e] mb-7">
              Celebr8 Lyfe Reserve
            </p>
            <div className="w-8 h-px bg-[#2e2718] mb-7" />
            <h2 className="font-cormorant font-light text-[2.4rem] leading-tight text-[#3a3120]">
              We look forward
                to welcoming you
                in time.
            </h2>
            <p className="mt-5 text-[9px] tracking-[0.3em] uppercase text-[#4a4028]">
              Please return when you meet the legal
              drinking age in your country.
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}