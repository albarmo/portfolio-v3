import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, useActionData } from "@remix-run/react";
import type { FC } from "react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = {
    fullName: formData.get("fullName"),
    jobTitle: formData.get("jobTitle"),
    company: formData.get("company"),
    linkedinUrl: formData.get("linkedinUrl"),
    message: formData.get("message"),
  };

  if (typeof data.fullName !== "string" || data.fullName.length < 3) {
    return json(
      { error: "Nama lengkap harus diisi (minimal 3 karakter)." },
      { status: 400 }
    );
  }
  if (typeof data.message !== "string" || data.message.length < 10) {
    return json(
      { error: "Pesan ulasan harus diisi (minimal 10 karakter)." },
      { status: 400 }
    );
  }

  console.log("Ulasan baru diterima:", data);

  return json({
    success: true,
    message: "Terima kasih! Ulasan Anda telah berhasil dikirimkan.",
  });
}

// --- Komponen Input ---
interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  name: string;
  as?: "input" | "textarea";
  rows?: number;
}
const FormInput: FC<FormInputProps> = ({ label, as = "input", ...props }) => {
  const commonClasses =
    "w-full bg-neutral-800 border border-neutral-700 rounded-lg py-3 px-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors";
  const InputComponent = as === "textarea" ? "textarea" : "input";

  return (
    <div className="w-full">
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-neutral-400 mb-2"
      >
        {label}
      </label>
      <InputComponent id={props.name} className={commonClasses} {...props} />
    </div>
  );
};

export default function CreateReviewPage() {
  const actionData = useActionData<typeof action>();
  console.log(actionData);

  return (
    <div className="min-h-screen flex items-center justify-center py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
            Tulis Ulasan Anda
          </h1>
          <p className="mt-4 text-center text-lg text-neutral-400">
            Bagikan pengalaman Anda dan bantu orang lain membuat keputusan yang
            lebih baik.
          </p>
        </div>

        <div className="dark:bg-neutral-900 border dark:border-neutral-800 rounded-2xl p-8 shadow-xl">
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
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-black bg-white hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white transition-colors"
              >
                Kirim Ulasan
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
