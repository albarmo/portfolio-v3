import type { ReactNode } from "react";
import { Form, Link, useNavigation } from "react-router";
import { FormField, type FormFieldConfig } from "@/components/molecules/FormField";

interface AdminFormProps {
  fields: FormFieldConfig[];
  defaultValues?: Record<string, string> | undefined;
  cancelHref: string;
  submitLabel: string;
  /** Needed when `children` contains a file input */
  hasFileUpload?: boolean;
  children?: ReactNode;
}

export function AdminForm({
  fields,
  defaultValues,
  cancelHref,
  submitLabel,
  hasFileUpload = false,
  children,
}: AdminFormProps) {
  const isSubmitting = useNavigation().state === "submitting";

  return (
    <Form
      method="post"
      {...(hasFileUpload ? { encType: "multipart/form-data" as const } : {})}
      className="max-w-3xl border border-border"
    >
      {fields.map((field) => (
        <FormField key={field.name} {...field} defaultValue={defaultValues?.[field.name]} />
      ))}
      {children}
      <div className="flex items-center justify-between border-t border-border bg-surface px-4 py-3">
        <Link
          to={cancelHref}
          className="font-mono text-xs font-bold uppercase tracking-widest text-muted hover:text-foreground"
        >
          ← CANCEL
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="border border-accent bg-accent px-5 py-2 font-mono text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "SAVING..." : submitLabel}
        </button>
      </div>
    </Form>
  );
}
