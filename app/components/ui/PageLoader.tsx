import { useEffect, useState } from "react";
import logo from "../../../public/albarmox.png";

type Phase = "entering" | "holding" | "exiting" | "done";

export default function PageLoader() {
  const [phase, setPhase] = useState<Phase>("entering");

  useEffect(() => {
    // Already seen this session → skip
    if (sessionStorage.getItem("loader-shown")) {
      setPhase("done");
      return;
    }

    const t1 = setTimeout(() => setPhase("holding"), 600);
    const t2 = setTimeout(() => setPhase("exiting"), 2200);
    const t3 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("loader-shown", "1");
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0a0a0a]"
      style={{
        animation:
          phase === "exiting"
            ? "loader-exit-up 0.6s cubic-bezier(0.76, 0, 0.24, 1) forwards"
            : undefined,
      }}
    >
      {/* Corner marks */}
      <span className="absolute left-6 top-6 h-6 w-6 border-l-2 border-t-2 border-[#e61919]" />
      <span className="absolute right-6 top-6 h-6 w-6 border-r-2 border-t-2 border-[#333]" />
      <span className="absolute bottom-6 left-6 h-6 w-6 border-b-2 border-l-2 border-[#333]" />
      <span className="absolute bottom-6 right-6 h-6 w-6 border-b-2 border-r-2 border-[#333]" />

      {/* Center content */}
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div
          className="relative"
          style={{
            animation:
              phase === "entering"
                ? "loader-logo-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
                : phase === "holding"
                  ? "loader-logo-pulse 1.2s ease-in-out infinite"
                  : undefined,
            opacity: phase === "entering" ? 0 : 1,
          }}
        >
          <img
            src={logo}
            alt="albarmox logo"
            width={80}
            height={80}
            className="select-none"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          {/* Glow ring */}
          <span
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: "0 0 40px 8px rgba(230,25,25,0.15)",
              animation:
                phase === "holding"
                  ? "loader-logo-pulse 1.2s ease-in-out infinite"
                  : undefined,
            }}
          />
        </div>

        {/* Accent line */}
        <div className="h-px w-48 origin-left overflow-hidden bg-[#1a1a1a]">
          <div
            className="h-full bg-[#e61919]"
            style={{
              transformOrigin: "left",
              animation:
                phase !== "entering"
                  ? "loader-accent-grow 0.5s cubic-bezier(0.4,0,0.2,1) forwards"
                  : undefined,
              transform: "scaleX(0)",
            }}
          />
        </div>

        {/* Wordmark + cursor */}
        <div
          className="flex items-center gap-0.5 font-mono text-sm font-bold uppercase tracking-[0.3em] text-[#eaeaea]"
          style={{
            opacity: 0,
            animation:
              phase !== "entering"
                ? "loader-text-in 0.4s ease forwards 0.2s"
                : undefined,
          }}
        >
          albarmox
          <span
            className="ml-0.5 inline-block h-4 w-[2px] bg-[#e61919]"
            style={{ animation: "loader-cursor-blink 0.9s step-end infinite" }}
          />
        </div>

        {/* Scan line */}
        <div className="relative h-px w-48 overflow-hidden bg-[#1a1a1a]">
          <div
            className="absolute left-0 top-0 h-full bg-[#e61919]"
            style={{
              opacity: 0,
              animation:
                phase === "holding"
                  ? "loader-scan 1.2s ease-in-out infinite 0.3s"
                  : undefined,
            }}
          />
        </div>
      </div>

      {/* Bottom label */}
      <div
        className="absolute bottom-8 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-[#333]"
        style={{
          opacity: 0,
          animation:
            phase !== "entering"
              ? "loader-text-in 0.4s ease forwards 0.4s"
              : undefined,
        }}
      >
        software engineer · frontend
      </div>
    </div>
  );
}
