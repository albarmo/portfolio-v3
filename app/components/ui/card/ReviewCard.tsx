import { Link } from "@remix-run/react";
import { Linkedin } from "lucide-react";
import { FC } from "react";
import { Review } from "~/services/review.services";

const ReviewCard: FC<Review> = (review) => {
  return (
    <div className="max-w-md w-full rounded-2xl bg-white dark:bg-neutral-800 p-6 flex flex-col gap-6 dark:text-white font-sans break-inside-avoid mb-6">
      <p className="text-base leading-relaxed dark:text-neutral-300">
        {review?.reviewText}
      </p>

      <div className="flex items-center gap-4 mt-2">
        <img
          src={"https://placehold.co/48x48/60A5FA/FFFFFF?text=AN"}
          alt={`Avatar of ${review?.name}`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="font-bold dark:text-white">{review?.name}</h3>
            <Link
              to={review?.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label={`${review?.name}'s LinkedIn Profile`}
            >
              <Linkedin />
            </Link>
          </div>
          <p className="text-sm text-neutral-400">
            {review?.jobTitle}, {review?.location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
