import { Monitor, Network, PaintRoller, Smartphone } from "lucide-react";
import type { FC, ReactNode } from "react";
import CountUp from "../ui/text/CountUp";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
  code: string;
}

const features: Feature[] = [
  {
    code: "SYS.01",
    icon: <Monitor className="h-5 w-5" />,
    title: "Web Apps",
    description:
      "Dynamic and responsive web applications that go beyond static websites.",
  },
  {
    code: "SYS.02",
    icon: <Smartphone className="h-5 w-5" />,
    title: "Mobile Apps",
    description:
      "Applications for iOS & Android with optimal performance and deep mobile UX.",
  },
  {
    code: "SYS.03",
    icon: <PaintRoller className="h-5 w-5" />,
    title: "UI/UX",
    description: "Interfaces that are visually precise and effortless to use.",
  },
  {
    code: "SYS.04",
    icon: <Network className="h-5 w-5" />,
    title: "API",
    description:
      "Reliable and secure bridge connecting frontend to backend services.",
  },
];

const FeatureCell: FC<Feature> = ({ icon, title, description, code }) => (
  <div className="accent-line-hover group relative border-b border-r border-[var(--line)] p-5 transition-colors hover:bg-[var(--surface)]">
    <div className="flex items-center justify-between">
      <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
        {code}
      </samp>
      <span className="text-[var(--muted)] transition-all duration-200 group-hover:text-[var(--accent)] group-hover:drop-shadow-[0_0_6px_var(--accent)]">
        {icon}
      </span>
    </div>
    <h3 className="mt-4 font-display text-lg font-black uppercase text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
      {title}
    </h3>
    <p className="mt-2 font-mono text-xs leading-5 text-[var(--muted)]">
      {description}
    </p>
  </div>
);

export default function AreaOfExpertise() {
  const years = new Date().getFullYear() - 2021;
  return (
    <section className="section-pad">
      <div className="section-shell">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">

          {/* Feature grid */}
          <div className="grid grid-cols-2 border-l border-t border-[var(--line)]">
            {features.map((feature) => (
              <FeatureCell key={feature.title} {...feature} />
            ))}
          </div>

          {/* Stats panel */}
          <div className="relative border border-[var(--line)] lg:border-l-0">
            {/* Accent corner top-right */}
            <span className="pointer-events-none absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-[var(--accent)]" />

            <div className="border-b border-[var(--line)] bg-[var(--surface-muted)] px-6 py-3">
              <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
                [ EXPERTISE.SYS / PROFILE ]
              </samp>
            </div>
            <div className="p-6 lg:p-8">
              <h2 className="font-display text-3xl font-black uppercase leading-tight text-[var(--text)] sm:text-4xl">
                DESIGN SENSE, ENGINEERING DEPTH, AND PRODUCT THINKING.
              </h2>
              <p className="mt-5 font-mono text-xs leading-6 text-[var(--muted)]">
                I bridge the gap between design and engineering — crafting
                interfaces that are both visually intentional and technically
                sound. Every product I build is shaped by a deep respect for
                user experience, clean architecture, and long-term
                maintainability.
              </p>

              <div className="mt-8 grid grid-cols-3 border border-[var(--line)]">
                <div className="group relative overflow-hidden border-r border-[var(--line)] p-4 transition-colors hover:bg-[var(--surface-muted)]/50">
                  <span className="font-display text-3xl font-black text-[var(--text)]">
                    <CountUp from={0} to={years} separator="," direction="up" duration={1} className="count-up-text" />
                    +
                  </span>
                  <samp className="mt-1 block font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
                    Years
                  </samp>
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[var(--muted)] transition-all duration-300 group-hover:w-full" />
                </div>
                <div className="group relative overflow-hidden border-r border-[var(--line)] p-4 transition-colors hover:bg-[var(--surface-muted)]/50">
                  <span className="font-display text-3xl font-black text-[var(--accent)] drop-shadow-[0_0_12px_rgba(230,25,25,0.25)]">
                    <CountUp from={0} to={10} separator="," direction="up" duration={1} className="count-up-text" />
                    +
                  </span>
                  <samp className="mt-1 block font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
                    Projects
                  </samp>
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
                </div>
                <div className="group relative overflow-hidden p-4 transition-colors hover:bg-[var(--surface-muted)]/50">
                  <span className="font-display text-3xl font-black text-[var(--text)]">
                    <CountUp from={0} to={3} separator="," direction="up" duration={1} className="count-up-text" />
                    +
                  </span>
                  <samp className="mt-1 block font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
                    Companies
                  </samp>
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[var(--muted)] transition-all duration-300 group-hover:w-full" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
