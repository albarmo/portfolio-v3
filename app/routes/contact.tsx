import { useEffect, type FC } from "react";
import { type ActionFunctionArgs } from "react-router";
import { Form, Link, useActionData } from "react-router";
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
    <PageLayout className="section-pad pt-32 sm:pt-40">
      <div className="section-shell">
        <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
          [ CONTACT / INIT.MSG ]
        </samp>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-black uppercase leading-tight text-[var(--text)] sm:text-6xl">
          LET&apos;S START A PROJECT TOGETHER
        </h1>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Form method="post" className="surface-card space-y-6 p-5 sm:p-8">
            <FormInput
              label="Full name"
              name="fullName"
              type="text"
              placeholder="Your full name"
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
              placeholder="Tell me about the project"
              required
            />
            <button
              type="submit"
              className="premium-link premium-link-primary"
            >
              Submit
            </button>
          </Form>

          <div className="flex flex-col">
            <div className="soft-panel p-6 sm:p-8">
              <img
                src="/images/character.png"
                alt="Albar Moerhamsa profile illustration"
                className="my-2 h-28 w-28 object-cover"
              />
              <p className="mt-6 leading-8 text-[var(--muted)]">
                My inbox is always open. Whether you have a project or just want
                to say Hi. I would love to hear from you. Feel free to contact
                me and I&apos;ll get back to you.
              </p>
              <div className="mt-6 flex gap-4 text-[var(--muted)]">
                <Link
                  to="https://www.linkedin.com/in/albarms/"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[var(--accent)]"
                >
                  <Linkedin />
                </Link>
                <Link
                  to="https://github.com/albarmo"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[var(--accent)]"
                >
                  <Github />
                </Link>
                <Link
                  to="mailto:moerhamsa@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[var(--accent)]"
                >
                  <MailIcon />
                </Link>
                <Link
                  to="https://dribbble.com/albarms"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[var(--accent)]"
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
