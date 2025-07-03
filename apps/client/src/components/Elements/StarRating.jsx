import React from "react";
import { Star } from "lucide-react";

// Props:
// - rating: a number from 0 to 5
// - totalStars: defaults to 5
// - className: for custom styling of the container
// - starClassName: for custom styling of each star icon

const StarRating = ({
  rating = 0,
  totalStars = 5,
  className = "",
  starClassName = "",
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0; // This logic can be expanded for half stars, but we'll stick to full for now.
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className={`h-5 w-5 text-amber-400 fill-amber-400 ${starClassName}`}
        />
      ))}
      {/* Logic for half-star can be added here if needed */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className={`h-5 w-5 text-amber-400/50 ${starClassName}`}
        />
      ))}
    </div>
  );
};

export default StarRating;
