export interface FormFieldConfig {
  name: string;
  label: string;
  type?: "text" | "textarea";
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

interface FormFieldProps extends FormFieldConfig {
  defaultValue?: string | undefined;
}

const INPUT_CLASS =
  "w-full bg-[var(--bg)] px-3 py-3 font-mono text-xs text-[var(--text)] outline-none placeholder:text-[var(--muted)]";

export function FormField({
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  rows,
  defaultValue,
}: FormFieldProps) {
  return (
    <div className="border-b border-[var(--line)]">
      <label
        htmlFor={name}
        className="block border-b border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-[var(--muted)]"
      >
        {label}
        {required ? (
          <span className="ml-1 text-[var(--accent)]" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue}
          className={`${INPUT_CLASS} resize-y leading-6`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue}
          className={INPUT_CLASS}
        />
      )}
    </div>
  );
}
