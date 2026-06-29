import { Link } from "@remix-run/react";
import { Github, Instagram, Linkedin } from "lucide-react";

const footerLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Portfolio" },
  { to: "/blogs", label: "Blogs" },
  { to: "/contact", label: "Contact" },
];

const socials = [
  {
    to: "https://www.linkedin.com/in/albarms",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    to: "https://www.instagram.com/albrms_",
    label: "Instagram",
    icon: Instagram,
  },
  { to: "https://github.com/albarmo", label: "GitHub", icon: Github },
];

export const Footer = () => {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg)]">
      <div className="section-shell py-10">
        <div className="grid border border-[var(--line)] md:grid-cols-[1fr_auto]">
          <div className="border-b border-[var(--line)] p-6 md:border-b-0 md:border-r">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-[var(--text)] transition-colors hover:text-[var(--accent)]"
            >
              <img src="/albarmox.png" alt="Albarmo" width="26" height="26" />
              albarmox<span className="text-[var(--accent)]">_</span>
            </Link>
            <p className="mt-4 max-w-sm font-mono text-xs leading-6 text-[var(--muted)]">
              Portfolio of Albar Moerhamsa. Software Engineer and Frontend
              Engineer building production-ready digital products.
            </p>
          </div>

          <div className="p-6">
            <samp className="block font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
              NAVIGATION
            </samp>
            <nav className="mt-3 grid gap-2" aria-label="Footer navigation">
              {footerLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                >
                  {`>>> ${item.label}`}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex items-center justify-between border-x border-b border-[var(--line)] px-6 py-4">
          <samp className="font-mono text-xs text-[var(--muted)]">
            © 2026 ALBARMOX. ALL RIGHTS RESERVED.
          </samp>
          <div className="flex gap-0">
            {socials.map(({ to, label, icon: Icon }) => (
              <Link
                key={label}
                to={to}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center border-l border-[var(--line)] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              >
                <span className="sr-only">{label}</span>
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
