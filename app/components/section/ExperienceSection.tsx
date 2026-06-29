const companies = [
  { name: "Feedloop", logo: "/images/company/feedloop.jpg" },
  { name: "BRI", logo: "/images/company/bri.png" },
  { name: "1000 Startup", logo: "/images/company/1000-startup.png" },
  { name: "Everidea", logo: "/images/company/everidea.webp" },
];

const principles = [
  "Performance work that users can feel",
  "Accessible interfaces with clear interaction states",
  "Frontend architecture that stays maintainable",
];

const ExperienceSection = () => {
  return (
    <section className="section-pad overflow-hidden">
      <div className="section-shell">
        <div className="mb-6 flex items-center justify-between border-b border-[var(--line)] pb-4">
          <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
            [ EXP.LOG / CAREER.SYS ]
          </samp>
          <samp className="font-mono text-[0.65rem] text-[var(--muted)]">
            REV 2.6 / 2026
          </samp>
        </div>

        <div className="grid border border-[var(--line)] lg:grid-cols-[0.95fr_1.05fr]">

          {/* Image panel */}
          <div className="relative overflow-hidden border-b border-[var(--line)] lg:border-b-0 lg:border-r">
            <div className="border-b border-[var(--line)] bg-[var(--surface-muted)] px-4 py-2">
              <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
                PROFILE.IMG
              </samp>
            </div>
            <img
              src="/images/character-2.png"
              alt="Albar Moerhamsa profile illustration"
              className="h-[28rem] w-full object-cover object-top"
              width={720}
              height={840}
              loading="lazy"
            />
            <div className="border-t border-[var(--line)] bg-[var(--surface)] p-5">
              <samp className="block font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
                ALBAR MOERHAMSA
              </samp>
              <p className="mt-1 font-display text-2xl font-black uppercase text-[var(--text)]">
                FRONTEND ENGINEER
              </p>
              <p className="mt-3 font-mono text-xs leading-5 text-[var(--muted)]">
                Focused on simplicity, usability, and production-ready
                interfaces for teams that care about details.
              </p>
            </div>
          </div>

          {/* Right panel */}
          <div className="flex flex-col">
            <div className="flex-1 border-b border-[var(--line)] p-6 lg:p-8">
              <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
                EXPERIENCE
              </samp>
              <h2 className="mt-4 font-display text-3xl font-black uppercase leading-tight text-[var(--text)] sm:text-4xl">
                SHIPPING USEFUL SOFTWARE ACROSS PRODUCT TEAMS AND PUBLIC-SECTOR
                SYSTEMS.
              </h2>
              <div className="mt-6 grid gap-0">
                {principles.map((principle, i) => (
                  <div
                    key={principle}
                    className={`flex items-start gap-3 py-3 font-mono text-xs text-[var(--text)] ${
                      i > 0 ? "border-t border-[var(--line)]" : ""
                    }`}
                  >
                    <span className="mt-0.5 shrink-0 text-[var(--accent)]">
                      ///
                    </span>
                    <span className="uppercase tracking-wide">{principle}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Company logos */}
            <div className="grid grid-cols-2 gap-px bg-[var(--line)] sm:grid-cols-4">
              {companies.map((company) => (
                <div
                  key={company.name}
                  className="flex min-h-24 items-center justify-center bg-[var(--surface)] p-4"
                >
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="max-h-10 max-w-full object-contain grayscale brightness-75 hover:brightness-100 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
