import { Link, useLocation } from "react-router";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSpotlight } from "@/components/providers/SpotlightProvider";
import { NavLinks } from "@/components/molecules/NavLinks";
import { ThemeSwitcher } from "@/components/molecules/ThemeSwitcher";
import { MOBILE_MENU_ID, MobileMenu } from "@/components/organisms/MobileMenu";
import { NAV_LINKS } from "@/constants/navigation";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
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
      : NAV_LINKS.find((item) => item.to === pathname)?.to ?? null;
  const tone = overHero
    ? "text-cloud [--nav-line:rgba(253,253,254,0.4)] [--nav-hover:rgba(253,253,254,0.1)]"
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
    NAV_LINKS
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

          <NavLinks current={current} reduceMotion={reduceMotion ?? false} />

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
              <Search className="h-4 w-4" aria-hidden="true" />
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
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--nav-line)] transition-colors hover:border-current hover:bg-[var(--nav-hover)] xl:hidden"
              aria-controls={MOBILE_MENU_ID}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Toggle main menu</span>
              {isMenuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        </div>
        {/* reading progress */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent transition-opacity duration-300 ${
            overHero ? "opacity-0" : "opacity-100"
          }`}
        />
      </motion.nav>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
