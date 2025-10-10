import { useEffect, type FC } from "react";
import { type ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { Dribbble, Github, Linkedin, MailIcon } from "lucide-react";
import { PageLayout } from "~/components/layout/PageLayout";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  const emailBody = `
From: ${fullName} (${email})

${message}
  `;

  return {
    mailto: {
      subject: subject,
      message: emailBody.trim(),
    },
  };
}

interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  as?: "input" | "textarea";
  rows?: number;
}
const FormInput: FC<FormInputProps> = ({ label, as = "input", ...props }) => {
  const commonClasses =
    "w-full bg-transparent border dark:border-neutral-700 rounded-lg py-3 px-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#BFF163] focus:border-transparent transition-colors";
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

export default function ContactPage() {
  const actionData = useActionData<typeof action>();
  useEffect(() => {
    if (actionData?.mailto) {
      const { subject, message } = actionData.mailto;

      const recipientEmail = "moerhamsa@gmail.com";

      const encodedSubject = encodeURIComponent(subject as string);
      const encodedMessage = encodeURIComponent(message);

      const mailtoUrl = `mailto:${recipientEmail}?subject=${encodedSubject}&body=${encodedMessage}`;

      window.location.href = mailtoUrl;
    }
  }, [actionData]);

  return (
    <PageLayout className="min-h-screen py-32 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm font-medium text-[#BFF163]">
          <span>CONNECT WITH ME</span>
        </div>
        <h1 className="mt-4 font-bold tracking-tight max-w-2xl text-6xl">
          Let&apos;s start a project together
        </h1>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Kolom Kiri: Formulir Kontak */}
          <Form method="post" className="space-y-8">
            <FormInput
              label="Full Name"
              name="fullName"
              type="text"
              placeholder="Enter fullname"
              required
            />
            <FormInput
              label="Email"
              name="email"
              type="email"
              placeholder="*****@mail.com"
              required
            />
            <FormInput
              label="Subject"
              name="subject"
              type="text"
              placeholder="What is this about?"
              required
            />
            <FormInput
              label="Message"
              name="message"
              as="textarea"
              rows={5}
              placeholder="Enter messages"
              required
            />
            <button
              type="submit"
              className="rounded-full border dark:border-neutral-600 px-8 py-3 text-base font-medium hover:bg-primary-dark hover:text-white dark:hover:bg-neutral-800 transition-colors"
            >
              Submit
            </button>
          </Form>

          {/* Kolom Kanan: Kartu Info */}
          <div className="flex flex-col">
            <div className="rounded-2xl dark:bg-neutral-900 border dark:border-neutral-800 p-8">
              <img
                src="/images/character.png"
                alt="Foto profil"
                className="w-24 h-24 rounded-full object-cover my-6"
              />
              <p className="dark:text-neutral-300 leading-relaxed">
                My inbox is always open. Whether you have a project or just want
                to say Hi. I would love to hear from you. Feel free to contact
                me and I&apos;ll get back to you.
              </p>
              <div className="mt-6 flex gap-6 text-neutral-500">
                <Link
                  to="https://www.linkedin.com/in/albarms/"
                  target="_blank"
                  rel="noreferrer"
                  className="dark:hover:text-white transition-colors"
                >
                  <Linkedin />
                </Link>
                <Link
                  to="https://github.com/albarmo"
                  target="_blank"
                  rel="noreferrer"
                  className="dark:hover:text-white transition-colors"
                >
                  <Github />
                </Link>
                <Link
                  to="mailto:moerhamsa@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="dark:hover:text-white transition-colors"
                >
                  <MailIcon />
                </Link>
                <Link
                  to="https://dribbble.com/albarms"
                  target="_blank"
                  rel="noreferrer"
                  className="dark:hover:text-white transition-colors"
                >
                  <Dribbble />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}