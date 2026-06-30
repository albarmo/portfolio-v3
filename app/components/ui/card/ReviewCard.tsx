import { Link } from "@remix-run/react";
import { Linkedin } from "lucide-react";
import { FC } from "react";
import type { Review } from "~/services/review.server";

const ReviewCard: FC<Review> = (review) => {
  const initials = review?.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const hasLinkedIn = review?.linkedinUrl && review.linkedinUrl !== "#";

  return (
    <article className="glow-hover mb-4 break-inside-avoid border border-[var(--line)] bg-[var(--surface)] p-5 transition-colors hover:bg-[var(--surface-muted)]/60">
      <div className="flex items-start justify-between gap-2">
        <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--accent)]">
          /// REVIEW
        </samp>
        {/* Decorative oversized quote mark */}
        <span className="select-none font-display text-5xl font-black leading-none text-[var(--accent)] opacity-20">
          "
        </span>
      </div>
      <p className="mt-2 font-mono text-xs leading-6 text-[var(--text)]">
        {review?.reviewText}
      </p>

      <div className="mt-5 flex items-center gap-3 border-t border-[var(--line)] pt-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--accent)]/30 bg-[var(--accent)]/5 font-mono text-xs font-bold text-[var(--accent)]">
          {initials}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <samp className="truncate font-mono text-xs font-bold uppercase tracking-wide text-[var(--text)]">
              {review?.name}
            </samp>
            {hasLinkedIn && (
              <Link
                to={review?.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                aria-label={`${review?.name}'s LinkedIn Profile`}
              >
                <Linkedin className="h-3 w-3" />
              </Link>
            )}
          </div>
          <samp className="font-mono text-[0.65rem] text-[var(--muted)]">
            {review?.jobTitle}, {review?.location}
          </samp>
        </div>
      </div>
    </article>
  );
};

export default ReviewCard;
