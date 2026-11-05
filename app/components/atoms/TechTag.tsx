interface TechTagProps {
  label: string;
}

export function TechTag({ label }: TechTagProps) {
  return (
    <div className="border border-[var(--line)] bg-[var(--surface)] px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
      {label}
    </div>
  );
}
