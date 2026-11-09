import { Link } from "react-router";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { RainbowArc } from "@/components/organisms/RainbowArc";

const links = [
  { to: "mailto:moerhamsa@gmail.com", label: "Email", icon: Mail },
  {
    to: "https://www.linkedin.com/in/albarms/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  { to: "https://github.com/albarmo", label: "GitHub", icon: Github },
];

export function ContactCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-accent py-20 text-ink sm:py-28">
      <RainbowArc side="left" />
      <div className="section-shell">
        <h2 className="max-w-[13ch] font-display text-6xl font-black uppercase leading-[0.82] tracking-[-0.035em] sm:text-8xl lg:text-9xl">
          Have a product in mind? Let&apos;s build something great.
        </h2>
        <div className="mt-10 flex flex-col gap-8 border-t border-ink/25 pt-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-[55ch] text-base font-semibold leading-7">
            Have an interesting project, collaboration, or opportunity? Let&apos;s
            turn the idea into something useful.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="premium-link border-ink bg-ink text-white hover:bg-transparent hover:text-ink"
            >
              Let&apos;s talk <ArrowUpRight className="h-4 w-4" />
            </Link>
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={label}
                to={to}
                target={to.startsWith("http") ? "_blank" : undefined}
                rel={to.startsWith("http") ? "noreferrer" : undefined}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/40 transition-colors hover:bg-ink hover:text-white"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
