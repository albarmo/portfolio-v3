const CORNERS = [
  "-left-[5px] -top-[5px]",
  "-right-[5px] -top-[5px]",
  "-bottom-[5px] -left-[5px]",
  "-bottom-[5px] -right-[5px]",
];

interface FrameOverlayProps {
  label: string;
  /** always show the selection; otherwise it appears on parent `group` hover/focus */
  selected?: boolean;
  /** position relative to the parent, e.g. "inset-0" or "-inset-3" */
  className?: string;
}

/**
 * Figma-style selection frame: outline, corner handles and a name tag.
 * Pure overlay (absolute, no layout), so it never changes the parent's size.
 */
export function FrameOverlay({
  label,
  selected = false,
  className = "inset-0",
}: FrameOverlayProps) {
  const visibility = selected
    ? ""
    : "opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 border border-primary ${className} ${visibility}`}
    >
      {CORNERS.map((corner) => (
        <span
          key={corner}
          className={`absolute h-2.5 w-2.5 border border-primary bg-cloud ${corner}`}
        />
      ))}
      <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 max-w-[70%] truncate whitespace-nowrap rounded-md border border-primary bg-cloud px-2.5 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-[0.08em] text-ink">
        {label}
      </span>
    </div>
  );
}
