import { Link } from "@remix-run/react";
import { ArrowUpRight } from "lucide-react";

const CAREER_START = 2021;

export default function AboutMe() {
  const years = new Date().getFullYear() - CAREER_START;

  return (
    <section id="about" className="section-pad paper-section scroll-mt-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <figure className="relative overflow-hidden rounded-[2rem] bg-[#0099FF] lg:rounded-[2.5rem]">
          <img
            src="/images/character-2.png"
            alt="Albar Moerhamsa"
            className="aspect-[4/5] h-full w-full object-cover object-top"
            width={840}
            height={1050}
            loading="lazy"
          />
        </figure>

        <div>
          <h2 className="max-w-[11ch] font-display text-6xl font-black uppercase leading-[0.86] tracking-[-0.035em] text-[var(--text)] sm:text-7xl lg:text-8xl">
            Design sense. Engineering depth. Product thinking.
          </h2>
          <p className="mt-7 max-w-[60ch] text-base leading-8 text-[var(--muted)]">
            I&apos;m a Software Engineer who turns complex requirements into
            intuitive, scalable, and reliable digital products. My work sits
            between frontend engineering, product thinking, and careful visual
            execution.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-[var(--line)] pt-8 sm:grid-cols-3">
            <div>
              <strong className="font-display text-5xl font-black uppercase leading-none text-[#0099FF]">
                {years}+
              </strong>
              <span className="mt-2 block text-xs font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
                Years of experience
              </span>
            </div>
            <div>
              <strong className="font-display text-5xl font-black uppercase leading-none text-[var(--text)]">
                Product
              </strong>
              <span className="mt-2 block text-xs font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
                Focused engineering
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <strong className="font-display text-5xl font-black uppercase leading-none text-[#F04A2D]">
                Fintech
              </strong>
              <span className="mt-2 block text-xs font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
                Government and digital products
              </span>
            </div>
          </div>

          <Link to="/about" className="premium-link premium-link-secondary mt-10">
            More about me <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
