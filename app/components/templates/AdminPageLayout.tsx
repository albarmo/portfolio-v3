import type { ReactNode } from "react";

interface AdminPageLayoutProps {
  children: ReactNode;
}

export function AdminPageLayout({ children }: AdminPageLayoutProps) {
  return <div className="p-20">{children}</div>;
}
