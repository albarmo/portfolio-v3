import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/constants/navigation";

interface NavLinksProps {
  /** Link matching the current page or scroll position */
  current: string | null;
  reduceMotion: boolean;
}

export function NavLinks({ current, reduceMotion }: NavLinksProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const highlight = hovered ?? current;

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 xl:flex"
    >
      {NAV_LINKS.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onMouseEnter={() => setHovered(item.to)}
          onFocus={() => setHovered(item.to)}
          onBlur={() => setHovered(null)}
          aria-current={current === item.to ? "location" : undefined}
          className={`relative isolate rounded-full px-3.5 py-2 text-xs font-bold uppercase tracking-[0.08em] transition-opacity duration-200 ${
            highlight === item.to ? "opacity-100" : "opacity-70"
          }`}
        >
          {highlight === item.to ? (
            <motion.span
              layoutId="nav-pill"
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 32 }}
              className="absolute inset-0 -z-10 rounded-full bg-[var(--nav-hover)] ring-1 ring-[var(--nav-line)]"
            />
          ) : null}
          {item.label}
        </Link>
      ))}
    </div>
  );
}
