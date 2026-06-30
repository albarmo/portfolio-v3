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
      {/* Fine crosshatch grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(234,234,234,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(234,234,234,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
      {/* Accent-tinted radial highlight (top-right) */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[var(--accent)] opacity-[0.03] blur-[120px]" />
      {/* Bottom vignette */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GradienBackground;
