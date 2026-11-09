import { useEffect } from "react";
import { Form, Link } from "react-router";
import { Dribbble, Github, Linkedin, MailIcon } from "lucide-react";
import { Squiggle } from "@/components/atoms/Squiggle";
import { TextField } from "@/components/molecules/TextField";
import { CONTACT_EMAIL } from "@/constants/site";
import type { ContactMailDraft } from "@/features/contact/types";

interface ContactFormProps {
  mailDraft?: ContactMailDraft | undefined;
}

export function ContactForm({ mailDraft }: ContactFormProps) {
  useEffect(() => {
    if (!mailDraft) return;
    const subject = encodeURIComponent(mailDraft.subject);
    const body = encodeURIComponent(mailDraft.message);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }, [mailDraft]);

  return (
    <div className="section-shell">
        <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-muted">
          [ CONTACT / INIT.MSG ]
        </samp>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-black uppercase leading-tight text-foreground sm:text-6xl">
          LET&apos;S START A PROJECT TOGETHER
        </h1>
        <Squiggle />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Form method="post" className="surface-card space-y-6 p-5 sm:p-8">
            <TextField
              label="Full name"
              name="fullName"
              type="text"
              placeholder="Your full name"
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              placeholder="*****@mail.com"
              required
            />
            <TextField
              label="Subject"
              name="subject"
              type="text"
              placeholder="What is this about?"
              required
            />
            <TextField
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
              <p className="mt-6 leading-8 text-muted">
                My inbox is always open. Whether you have a project or just want
                to say Hi. I would love to hear from you. Feel free to contact
                me and I&apos;ll get back to you.
              </p>
              <div className="mt-6 flex gap-4 text-muted">
                <Link
                  to="https://www.linkedin.com/in/albarms/"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-accent"
                 aria-label="LinkedIn">
                  <Linkedin aria-hidden="true" />
                </Link>
                <Link
                  to="https://github.com/albarmo"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-accent"
                 aria-label="GitHub">
                  <Github aria-hidden="true" />
                </Link>
                <Link
                  to={`mailto:${CONTACT_EMAIL}`}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-accent"
                 aria-label="Email">
                  <MailIcon aria-hidden="true" />
                </Link>
                <Link
                  to="https://dribbble.com/albarms"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-accent"
                 aria-label="Dribbble">
                  <Dribbble aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
