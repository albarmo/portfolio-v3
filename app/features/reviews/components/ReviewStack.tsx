import { motion } from "framer-motion";
import { ArrowRight, Linkedin } from "lucide-react";
import { useState } from "react";
import type { Review } from "@/features/reviews/types";

const TILTS = [-4, 3, -2, 5, -3, 2];
const SWIPE_DISTANCE = 120;
const SWIPE_VELOCITY = 500;
const VISIBLE_DEPTH = 3;

/** Pile of review cards: drag the top one aside (or press Next) to send it to the back. */
export function ReviewStack({ reviews }: { reviews: Review[] }) {
  const [order, setOrder] = useState(() => reviews.map((_, index) => index));

  if (reviews.length === 0) return null;

  const next = () =>
    setOrder(([first, ...rest]) => (first === undefined ? rest : [...rest, first]));

  return (
    <section aria-labelledby="kind-words" className="section-pad overflow-hidden">
      <div className="section-shell relative flex flex-col items-center">
        <h2
          id="kind-words"
          className="mb-12 flex items-center gap-4 font-display text-6xl font-black uppercase leading-none tracking-[-0.035em] sm:text-8xl lg:absolute lg:inset-x-0 lg:top-1/2 lg:mb-0 lg:-translate-y-1/2 lg:justify-between lg:text-[11rem]"
        >
          <span>Kind</span>
          <span className="-rotate-3 rounded-2xl border-[1.5px] border-foreground bg-accent px-4 pb-1 text-ink shadow-hard lg:px-6">
            words
          </span>
        </h2>

        <div aria-live="polite" className="relative grid w-full max-w-xl">
          {order.map((reviewIndex, depth) => {
            const review = reviews[reviewIndex];
            if (!review) return null;
            const isTop = depth === 0;

            return (
              <motion.article
                key={review.id}
                inert={!isTop}
                drag={isTop ? "x" : false}
                dragSnapToOrigin
                onDragEnd={(_, info) => {
                  if (
                    Math.abs(info.offset.x) > SWIPE_DISTANCE ||
                    Math.abs(info.velocity.x) > SWIPE_VELOCITY
                  ) {
                    next();
                  }
                }}
                animate={{
                  rotate: TILTS[reviewIndex % TILTS.length] ?? 0,
                  y: depth * 12,
                  scale: 1 - depth * 0.04,
                  opacity: depth < VISIBLE_DEPTH ? 1 : 0,
                }}
                style={{ zIndex: order.length - depth }}
                className={`flex flex-col gap-6 rounded-[2rem] border-[1.5px] border-foreground bg-surface-solid p-7 shadow-hard [grid-area:1/1] sm:p-9 ${
                  isTop ? "cursor-grab touch-pan-y active:cursor-grabbing" : ""
                }`}
              >
                <blockquote className="text-lg leading-8 sm:text-xl">
                  &ldquo;{review.reviewText}&rdquo;
                </blockquote>
                <footer className="mt-auto flex items-end justify-between gap-4">
                  <div>
                    <p className="font-display text-2xl font-black uppercase leading-none">
                      {review.name}
                    </p>
                    <p className="mt-1.5 text-xs font-bold uppercase tracking-[0.08em] text-muted">
                      {[review.jobTitle, review.location].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  {/* "#" is the stored placeholder for "no profile" */}
                  {review.linkedinUrl.startsWith("https://") && (
                    <a
                      href={review.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${review.name} on LinkedIn`}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border transition-colors hover:bg-primary hover:text-cloud"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                </footer>
              </motion.article>
            );
          })}
        </div>

        {reviews.length > 1 && (
          <button
            type="button"
            onClick={next}
            className="premium-link premium-link-secondary relative mt-14"
          >
            Next review <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </section>
  );
}
