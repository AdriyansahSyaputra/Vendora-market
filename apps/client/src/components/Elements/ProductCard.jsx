import { Star, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
};

const ProductCard = ({ product }) => {
  const safeProduct = {
    ...product,
    images: product.images || [],
    name: product.name || "Nama Produk Tidak Tersedia",
    averageRating: product.averageRating || 0,
    soldCount: product.soldCount || 0,
    price: product.price || 0,
    slug: product.slug || product._id,
    discountedPrice: product.discountedPrice || 0,
  };

  return (
    <Link to={`/product/${safeProduct.slug}`} state={{ product: safeProduct }}>
      <Card className="w-full h-full flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 dark:bg-gray-800/50">
        <CardContent className="p-0 flex-grow flex flex-col">
          <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img
              src={safeProduct.images[0]}
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
                  {safeProduct.averageRating} | Terjual {safeProduct.soldCount}
                </span>
              </div>
            </div>
            <div className="flex items-end justify-between mt-2">
              <div className="flex flex-col">
                {safeProduct.discountedPrice ? (
                  <>
                    <p className="font-bold text-sm md:text-base text-red-600 dark:text-red-400">
                      {formatCurrency(safeProduct.discountedPrice)}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 line-through ml-2">
                      {formatCurrency(safeProduct.price)}
                    </p>
                  </>
                ) : (
                  <p className="font-bold text-xs text-blue-600 dark:text-blue-400">
                    {safeProduct.price && formatCurrency(safeProduct.price)}
                  </p>
                )}
              </div>

              {safeProduct.discount && (
                <Badge variant="destructive" className="ml-2">{safeProduct.discount}%</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
