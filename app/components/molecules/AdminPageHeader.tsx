import type { ReactNode } from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

interface AdminPageHeaderProps {
  breadcrumb: string;
  title: string;
  subtitle?: string;
  createLink?: { href: string; label: string };
  /** Extra header actions, rendered on the right */
  children?: ReactNode;
}

export function AdminPageHeader({ breadcrumb, title, subtitle, createLink, children }: AdminPageHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between border-b border-border pb-6">
      <div>
        <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-muted">
          {breadcrumb}
        </samp>
        <h1 className="mt-1 line-clamp-1 font-display text-3xl font-black uppercase text-foreground">
          {title}
        </h1>
        {subtitle ? (
          <samp className="mt-1 block font-mono text-[0.6rem] text-muted">{subtitle}</samp>
        ) : null}
      </div>
      {children}
      {createLink ? (
        <Link
          to={createLink.href}
          className="flex items-center gap-2 border border-accent bg-accent px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
        >
          <PlusIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {createLink.label}
        </Link>
      ) : null}
    </div>
  );
}
