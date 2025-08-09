import { TrendingUp, Star, ShoppingCart, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PerformanceMetrics = ({ product, discountedPrice, formatCurrency }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {product.averageRating && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Rating</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{product.averageRating}/5.0</div>
                <div className="text-xs text-muted-foreground">
                  {product.totalReviews || 0} reviews
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-green-600" />
              <span className="text-sm">Sales</span>
            </div>
            <div className="text-right">
              <div className="font-semibold">{product.soldCount}</div>
              <div className="text-xs text-muted-foreground">units sold</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Revenue</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-sm">
                {formatCurrency(product.soldCount * discountedPrice)}
              </div>
              <div className="text-xs text-muted-foreground">total</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
