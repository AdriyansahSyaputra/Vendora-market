import { Star, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProductCard = ({ product }) => {
  // Fallback untuk data produk jika tidak ada
  const safeProduct = product || {
    name: "Produk Tidak Tersedia",
    price: "N/A",
    image: "https://placehold.co/300x300/e2e8f0/e2e8f0?text=?",
    rating: "N/A",
    sold: "N/A",
  };

  return (
    <Card className="w-full h-full flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 dark:bg-gray-800/50">
      <CardContent className="p-0 flex-grow flex flex-col">
        <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={safeProduct.image}
            alt={safeProduct.name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/300x300/e2e8f0/e2e8f0?text=?";
            }}
          />
          <div className="absolute top-2 left-2 bg-white/80 dark:bg-black/60 backdrop-blur-sm p-1.5 rounded-full">
            <Flame className="w-4 h-4 text-red-500" />
          </div>
        </div>
        <div className="p-3 md:p-4 space-y-2 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-sm h-10 line-clamp-2">
              {safeProduct.name}
            </h3>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span>
                {safeProduct.rating} | Terjual {safeProduct.sold}+
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between mt-2">
            <p className="font-bold text-base text-blue-600 dark:text-blue-400">
              {safeProduct.price}
            </p>
            {safeProduct.discount && (
              <Badge variant="destructive">{safeProduct.discount}%</Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
