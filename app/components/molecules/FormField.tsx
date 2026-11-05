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
  "w-full bg-background px-3 py-3 font-mono text-xs text-foreground outline-none placeholder:text-muted";

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
    <div className="border-b border-border">
      <label
        htmlFor={name}
        className="block border-b border-border bg-surface px-3 py-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-muted"
      >
        {label}
        {required ? (
          <span className="ml-1 text-accent" aria-hidden="true">
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
