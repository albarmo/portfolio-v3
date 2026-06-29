import type { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  className?: string
}

export const PageLayout: FC<LayoutProps> = ({ children, className }) => {
  return (
    <main id="main-content" className={`flex flex-col flex-grow min-h-[100dvh] ${className ?? ""}`}>
      {children}
    </main>
  );
};
