interface SkillCardProps {
  title: string;
  skills: string[];
}

export function SkillCard({ title, skills }: SkillCardProps) {
  return (
    <div className="soft-panel p-6">
      <samp className="block font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
        {title}
      </samp>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="border border-[var(--line)] bg-[var(--surface)] px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-[var(--muted)]"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
