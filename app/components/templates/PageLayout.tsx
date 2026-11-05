import type { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <main id="main-content" className={`flex flex-col flex-grow min-h-[100dvh] ${className ?? ""}`}>
      {children}
    </main>
  );
}
