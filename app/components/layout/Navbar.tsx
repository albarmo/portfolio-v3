import { Link, NavLink } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon, SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useSpotlight } from "~/context/SpotlightContext";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";

const navItems = [
  { to: "/projects", label: "Portfolio" },
  { to: "/blogs", label: "Blogs" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsOpen } = useSpotlight();

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="section-shell flex h-14 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-[var(--text)] transition-colors hover:text-[var(--accent)]"
            aria-label="Albar Moerhamsa home"
          >
            <img src="/albarmox.png" alt="Albarmo" width="26" height="26" />
            <span>
              albarmox<span className="text-[var(--accent)]">_</span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? "font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)]"
                    : "font-mono text-xs font-bold uppercase tracking-widest text-[var(--muted)] transition-colors hover:text-[var(--text)]"
                }
              >
                {({ isActive }) =>
                  isActive
                    ? `[ ${item.label.toUpperCase()} ]`
                    : item.label.toUpperCase()
                }
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <ThemeSwitcher />
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="flex h-9 w-9 items-center justify-center border border-[var(--line)] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <span className="sr-only">Search</span>
              <SearchIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              type="button"
              className="flex h-9 w-9 items-center justify-center border border-[var(--line)] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:hidden"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XIcon className="h-4 w-4" />
              ) : (
                <MenuIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.12 }}
            className="fixed inset-x-0 top-14 z-40 border-b border-[var(--line)] bg-[var(--bg)] p-4 md:hidden"
            id="mobile-menu"
          >
            <div className="grid gap-0">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "block border-l-2 border-[var(--accent)] py-3 pl-4 font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)]"
                      : "block border-l-2 border-transparent py-3 pl-4 font-mono text-xs font-bold uppercase tracking-widest text-[var(--muted)] transition-colors hover:border-[var(--line)] hover:text-[var(--text)]"
                  }
                >
                  {item.label.toUpperCase()}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
