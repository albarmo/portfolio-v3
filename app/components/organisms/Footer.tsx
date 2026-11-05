import { Link } from "react-router";
import { ArrowUp } from "lucide-react";

const footerLinks = [
  { to: "/#about", label: "About" },
  { to: "/#work", label: "Work" },
  { to: "/#experience", label: "Experience" },
  { to: "/#notes", label: "Notes" },
  { to: "/contact", label: "Let's talk" },
];

export function Footer() {
  return (
    <footer className="bg-ink py-12 text-cloud">
      <div className="section-shell">
        <div className="grid gap-10 border-b border-white/15 pb-12 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Link
              to="/"
              className="font-display text-5xl font-black uppercase tracking-[-0.03em]"
            >
              Albarmox<span className="text-accent">.</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/60">
              Built with purpose. Designed to make an impact.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer navigation">
            {footerLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-xs font-bold uppercase tracking-[0.08em] text-white/65 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-5 pt-7 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Albarmox. All rights reserved.</span>
          <Link to="/#top" className="inline-flex items-center gap-2 hover:text-white">
            Back to top <ArrowUp className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
