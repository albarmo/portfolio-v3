import { FC } from "react";

const TechTag: FC<{ label: string }> = ({ label }) => (
  <div className="border border-[var(--line)] bg-[var(--surface)] px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
    {label}
  </div>
);

export default TechTag
