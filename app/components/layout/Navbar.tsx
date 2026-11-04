import { Link, useLocation } from "@remix-run/react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSpotlight } from "~/context/SpotlightContext";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";

const navItems = [
  { to: "/#about", label: "About" },
  { to: "/#work", label: "Work" },
  { to: "/#experience", label: "Experience" },
  { to: "/#notes", label: "Notes" },
  { to: "/contact", label: "Let's talk" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>();
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { setIsOpen } = useSpotlight();
  const { pathname } = useLocation();
  const { scrollY, scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const overHero = pathname === "/" && !scrolled;
  const current =
    pathname === "/"
      ? overHero
        ? null
        : activeSection
      : navItems.find((item) => item.to === pathname)?.to ?? null;
  const highlight = hovered ?? current;
  const tone = overHero
    ? "text-[#FDFDFE] [--nav-line:rgba(253,253,254,0.4)] [--nav-hover:rgba(253,253,254,0.1)]"
    : "text-[var(--text)] [--nav-line:var(--line)] [--nav-hover:var(--surface-muted)]";

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
    // hide while reading down, bring back as soon as the user scrolls up
    setHidden(latest > 160 && latest > lastY.current);
    lastY.current = latest;
    // and once scrolling stops
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setHidden(false), 250);
  });

  useEffect(() => () => clearTimeout(idleTimer.current), []);

  // scroll-spy: the section crossing the middle of the viewport is "active"
  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`/#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navItems
      .filter((item) => item.to.startsWith("/#"))
      .forEach((item) => {
        const section = document.getElementById(item.to.slice(2));
        if (section) observer.observe(section);
      });
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      <motion.nav
        animate={{ y: hidden && !isMenuOpen ? "-100%" : "0%" }}
        transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${tone} ${
          overHero
            ? "border-transparent bg-transparent"
            : "border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_62%,transparent)] shadow-[0_10px_30px_-18px_rgba(17,24,39,0.35)] backdrop-blur-xl backdrop-saturate-150"
        }`}
      >
        <div className="section-shell relative flex h-[4.5rem] items-center justify-between gap-5">
          <Link
            to="/"
            className="shrink-0"
            aria-label="Albar Moerhamsa home"
          >
            <img
              src="/albarmox.png"
              alt=""
              className={`h-10 w-10 object-contain transition-[filter] duration-300 ${
                overHero ? "" : "invert dark:invert-0"
              }`}
              width="344"
              height="344"
            />
          </Link>

          <div
            onMouseLeave={() => setHovered(null)}
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 xl:flex"
          >
            {navItems.map((item) => (
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
                {highlight === item.to && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 32 }
                    }
                    className="absolute inset-0 -z-10 rounded-full bg-[var(--nav-hover)] ring-1 ring-[var(--nav-line)]"
                  />
                )}
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="[&_button]:!border-[var(--nav-line)] [&_button]:!text-current [&_button:hover]:!border-current">
              <ThemeSwitcher />
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--nav-line)] transition-colors hover:border-current hover:bg-[var(--nav-hover)]"
            >
              <span className="sr-only">Search</span>
              <Search className="h-4 w-4" />
            </button>
            <Link
              to="/contact"
              className="premium-link hidden border-current bg-transparent text-current hover:bg-[var(--nav-hover)] sm:inline-flex"
            >
              Let&apos;s talk <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              onClick={() => setIsMenuOpen((value) => !value)}
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--nav-line)] transition-colors hover:border-current hover:bg-[var(--nav-hover)] lg:hidden"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Toggle main menu</span>
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {/* reading progress */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[#F04A2D] transition-opacity duration-300 ${
            overHero ? "opacity-0" : "opacity-100"
          }`}
        />
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[4.5rem] z-40 border-b border-[#FDFDFE]/15 bg-[#111827]/95 p-5 text-[#FDFDFE] shadow-[0_20px_50px_rgba(17,24,39,0.18)] backdrop-blur-md lg:hidden"
            id="mobile-menu"
          >
            <div className="section-shell grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#FDFDFE] hover:bg-[#FDFDFE]/10"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
