import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Weight, Ruler, Package } from "lucide-react";

const ProductSummary = ({
  product,
  totalStock,
  discountedPrice,
  stockStatus,
  statusConfig,
  formatCurrency,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Product Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Status</span>
          <Badge variant={statusConfig.variant} className={statusConfig.bg}>
            {statusConfig.label}
          </Badge>
        </div>

        {/* Stock Status */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Stock</span>
          <div className="flex items-center gap-2">
            <stockStatus.icon className={`h-4 w-4 ${stockStatus.color}`} />
            <Badge variant={stockStatus.variant}>{totalStock} units</Badge>
          </div>
        </div>

        <Separator />

        {/* Pricing */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Price</span>
            <div className="text-right">
              <div className="font-semibold">
                {formatCurrency(discountedPrice)}
              </div>
              {product.discount > 0 && (
                <div className="text-xs text-muted-foreground line-through">
                  {formatCurrency(product.price)}
                </div>
              )}
            </div>
          </div>

          {product.discount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Discount</span>
              <Badge variant="destructive">{product.discount}% OFF</Badge>
            </div>
          )}
        </div>

        <Separator />

        {/* Category */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Category</span>
          <Badge variant="outline">{product.category.name}</Badge>
        </div>

        {/* Physical Properties */}
        {product.weight && product.dimensions && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium flex items-center gap-1">
                <Weight className="h-3 w-3" />
                Weight
              </span>
              <span className="text-sm text-muted-foreground">
                {product.weight}g
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium flex items-center gap-1">
                <Ruler className="h-3 w-3" />
                Dimensions
              </span>
              <span className="text-sm text-muted-foreground">
                {product.dimensions.length}×{product.dimensions.width}×
                {product.dimensions.height}cm
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductSummary;
