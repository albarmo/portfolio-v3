import type { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  name: string;
  as?: "input" | "textarea";
  rows?: number;
}

export function TextField({ label, as = "input", ...props }: TextFieldProps) {
  const Element = as === "textarea" ? "textarea" : "input";

  return (
    <div className="w-full">
      <label
        htmlFor={props.name}
        className="mb-2 block font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]"
      >
        {label}
      </label>
      <Element
        id={props.name}
        className="w-full border border-[var(--line)] bg-[var(--surface)] px-4 py-3 font-mono text-sm text-[var(--text)] placeholder:text-[var(--muted)] transition-colors focus:border-[var(--accent)] focus:outline-none"
        {...props}
      />
    </div>
  );
}
