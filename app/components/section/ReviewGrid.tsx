import ReviewCard from "../ui/card/ReviewCard";
import ShinyText from "../ui/text/ShinyText";
import { Review } from "~/services/review.services";

export default function ReviewsGrid({ data }: { data: Review[] }) {
  return (
    <div className="min-h-screen dark:bg-neutral-900 p-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="text-left mx-auto space-y-0.5">
          <span className="flex items-center gap-1.5 text-[#BFF163]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BFF163] animate-pluse"></span>
            REVIEWS
          </span>
          <ShinyText
            text="What others say"
            disabled={false}
            speed={3}
            className="text-2xl font-bold tracking-tight sm:text-4xl"
          />
          <p className="text-sm leading-8 text-neutral-400 dark:text-neutral-200">
            I&apos;ve worked with some amazing people over the years, here is
            what they have to say about me.
          </p>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {data?.map((review: Review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
      </div>
    </div>
  );
}
