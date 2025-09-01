import { useState } from "react";
import ReviewCard from "./ReviewCard";
import { Button } from "@/components/ui/button";

const ReviewsSection = ({ reviews }) => {
  const [visibleCount, setVisibleCount] = useState(3);
  const showMore = () => setVisibleCount(reviews.length);

  return (
    <div className="p-4 md:p-6 bg-white dark:bg-slate-900">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
        Ulasan Pembeli ({reviews.length})
      </h2>
      <div className="md:hidden">
        {reviews.slice(0, visibleCount).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
        {visibleCount < reviews.length && (
          <Button variant="outline" className="w-full mt-4" onClick={showMore}>
            Lihat Semua Ulasan
          </Button>
        )}
      </div>
      <div className="hidden md:block">
        {reviews.slice(0, 5).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
        {reviews.length > 5 && (
          <Button variant="outline" className="w-full mt-4">
            Lihat Semua Ulasan
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
