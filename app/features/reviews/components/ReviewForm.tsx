import type { InputHTMLAttributes } from "react";
import { Form } from "react-router";
import type { ReviewSubmissionResult } from "@/features/reviews/types";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  name: string;
  as?: "input" | "textarea";
  rows?: number;
}
function FormInput({ label, as = "input", ...props }: FormInputProps) {
  const commonClasses =
    "w-full border border-[var(--line)] bg-[var(--surface)] px-4 py-3 font-mono text-sm text-[var(--text)] placeholder:text-[var(--muted)] transition-colors focus:border-[var(--accent)] focus:outline-none";
  const InputComponent = as === "textarea" ? "textarea" : "input";

  return (
    <div className="w-full">
      <label
        htmlFor={props.name}
        className="mb-2 block font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]"
      >
        {label}
      </label>
      <InputComponent id={props.name} className={commonClasses} {...props} />
    </div>
  );
}

interface ReviewFormProps {
  result?: ReviewSubmissionResult | undefined;
}

export function ReviewForm({ result: actionData }: ReviewFormProps) {
  const successMessage =
    actionData?.success === true ? actionData.message : undefined;
  const errorMessage =
    actionData?.success === false ? actionData.error : undefined;

  return (
    <div className="mx-auto w-[min(100%-2rem,44rem)] space-y-8">
        <div>
          <h1 className="text-center font-display text-5xl font-black uppercase leading-tight text-[var(--text)] sm:text-6xl">
            TULIS ULASAN ANDA
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-center font-mono text-xs leading-6 text-[var(--muted)]">
            Bagikan pengalaman Anda dan bantu orang lain membuat keputusan yang
            lebih baik.
          </p>
        </div>

        {successMessage && (
          <div role="status" className="border border-[var(--terminal-green)]/30 bg-[var(--terminal-green)]/10 p-4 font-mono text-xs font-bold uppercase tracking-wide text-[var(--terminal-green)]">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div role="alert" className="border border-[var(--accent)]/30 bg-[var(--accent)]/10 p-4 font-mono text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
            {errorMessage}
          </div>
        )}

        <div className="surface-card p-5 sm:p-8">
          <Form method="post" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Nama Lengkap"
                name="fullName"
                type="text"
                required
              />
              <FormInput
                label="Jabatan (Job Title)"
                name="jobTitle"
                type="text"
              />
            </div>
            <FormInput
              label="Perusahaan (Company)"
              name="company"
              type="text"
            />
            <FormInput
              label="URL Profil LinkedIn"
              name="linkedinUrl"
              type="url"
              placeholder="https://linkedin.com/in/..."
            />
            <FormInput
              label="Pesan Ulasan Anda"
              name="message"
              as="textarea"
              rows={6}
              required
            />

            <div>
              <button
                type="submit"
                className="premium-link premium-link-primary w-full"
              >
                Kirim Ulasan
              </button>
            </div>
          </Form>
        </div>
    </div>
  );
}
