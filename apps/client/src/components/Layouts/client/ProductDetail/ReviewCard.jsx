import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown, Store } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const ReviewCard = ({ review }) => {
  const [likes, setLikes] = useState(review.likes);
  const [dislikes, setDislikes] = useState(review.dislikes);

  return (
    <div className="py-4 border-b border-slate-200 dark:border-slate-800 last:border-b-0">
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarImage src={review.user.avatar} alt={review.user.name} />
          <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold text-sm text-slate-800 dark:text-slate-100">
            {review.user.name}
          </p>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-slate-300 dark:text-slate-600"
                }`}
              />
            ))}
          </div>
        </div>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {review.date}
        </span>
      </div>
      <p className="mt-3 text-slate-700 dark:text-slate-300 text-sm">
        {review.comment}
      </p>
      {review.images.length > 0 && (
        <div className="mt-2 flex gap-2">
          {review.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`review image ${index + 1}`}
              className="w-20 h-20 rounded-md object-cover"
            />
          ))}
        </div>
      )}
      {review.sellerReply && (
        <div className="mt-3 ml-4 p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Store className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">
              {review.sellerReply.sellerName}
            </p>
          </div>
          <p className="mt-1 text-slate-600 dark:text-slate-400 text-sm">
            {review.sellerReply.comment}
          </p>
        </div>
      )}
      <div className="mt-3 flex justify-end items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-slate-500 dark:text-slate-400"
          onClick={() => setLikes((l) => l + 1)}
        >
          <ThumbsUp className="h-4 w-4" />
          <span className="text-xs">{likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-slate-500 dark:text-slate-400"
          onClick={() => setDislikes((d) => d + 1)}
        >
          <ThumbsDown className="h-4 w-4" />
          <span className="text-xs">{dislikes}</span>
        </Button>
      </div>
    </div>
  );
};

export default ReviewCard;
