import type { ReactNode } from "react";
import { SunMascot } from "@/components/organisms/SunMascot";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <main id="main-content" className={`flex flex-col flex-grow min-h-[100dvh] ${className ?? ""}`}>
      {children}
      <SunMascot />
    </main>
  );
}
