import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/Elements/StarRating";
import { useNavigate } from "react-router-dom";
import slugify from "@/utils/slugify";

const ProductReviewSummaryCard = ({ product }) => {
  const navigate = useNavigate();

  const handleViewReviews = () => {
    const slug = slugify(product.name);
    navigate(`/store/reviews/${slug}`, {
      state: { product },
    });
  };

  return (
    <Card className="flex flex-row h-48 w-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-purple-500/50 dark:hover:border-purple-400/50">
      <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <CardContent className="flex flex-col flex-1 px-0">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold line-clamp-2 mb-2">
              {product.name}
            </CardTitle>
            <div className="flex items-center gap-2 mb-1">
              <StarRating rating={product.avgRating} />
              <span className="text-sm text-muted-foreground">
                {product.avgRating.toFixed(1)}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {product.totalReviews} reviews
            </span>
          </div>
        </CardContent>
        <CardFooter className="mt-2">
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 dark:text-gray-200"
            onClick={handleViewReviews}
          >
            View Reviews
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProductReviewSummaryCard;
