import type { FC, ReactNode } from "react";

interface GradienBackgroundProps {
  children: ReactNode;
  className?: string;
}

const GradienBackground: FC<GradienBackgroundProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden bg-[var(--bg)] px-5 pb-20 pt-28 sm:pt-32 md:px-10 lg:px-16 ${className ?? ""}`}
    >
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,rgba(234,234,234,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(234,234,234,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GradienBackground;
