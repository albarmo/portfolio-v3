import ReviewCard from "../ui/card/ReviewCard";
import type { Review } from "~/services/review.server";

export default function ReviewsGrid({ data }: { data: Review[] }) {
  return (
    <section className="section-pad">
      <div className="section-shell">
        <div className="border-b border-[var(--line)] pb-8">
          <samp className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[var(--muted)]">
            [ TESTIMONIALS / LOG ]
          </samp>
          <h2 className="mt-4 font-display text-4xl font-black uppercase leading-tight text-[var(--text)] sm:text-5xl">
            WHAT COLLABORATORS SAY.
          </h2>
          <p className="mt-5 max-w-2xl font-mono text-xs leading-6 text-[var(--muted)]">
            I&apos;ve worked with some amazing people over the years. Here is
            what they have to say.
          </p>
        </div>
        <div className="mt-8 columns-1 gap-4 md:columns-2 lg:columns-3">
          {data?.map((review: Review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
}
