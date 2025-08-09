import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Tag,
  TrendingUp,
  Star,
  Eye,
  DollarSign,
  Ruler,
  ShoppingCart,
} from "lucide-react";

const DetailedInformationTabs = ({
  product,
  totalStock,
  activeTab,
  setActiveTab,
  formatCurrency,
  discountedPrice,
}) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="variations">Variations</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="overview" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Product Description
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <Package className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{totalStock}</div>
                  <div className="text-xs text-muted-foreground">
                    Total Stock
                  </div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold">{product.soldCount}</div>
                  <div className="text-xs text-muted-foreground">
                    Units Sold
                  </div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                  <div className="text-2xl font-bold">
                    {product.averageRating || "N/A"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Avg Rating
                  </div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <Eye className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">
                    {product.totalReviews || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">Reviews</div>
                </div>
              </div>

              {product.tags && product.tags.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="gap-1"
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="variations" className="space-y-4">
              {product.variations && product.variations.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Product Variations</h3>
                  <div className="grid gap-4">
                    {product.variations.map((variation, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="font-medium">
                              {variation.size} - {variation.color}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              SKU:{" "}
                              {variation.sku ||
                                `${product.name
                                  .substring(0, 3)
                                  .toUpperCase()}-${variation.color
                                  .substring(0, 2)
                                  .toUpperCase()}-${variation.size}`}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              variation.stock < 10 ? "destructive" : "secondary"
                            }
                          >
                            {variation.stock} in stock
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Variations</h3>
                  <p className="text-muted-foreground">
                    This product doesn't have variations.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="specs" className="space-y-4">
              {product.specifications &&
              Object.keys(product.specifications).length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Product Specifications
                  </h3>
                  <div className="grid gap-3">
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between py-2 border-b"
                        >
                          <span className="font-medium">{key}</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Ruler className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">
                    No Specifications
                  </h3>
                  <p className="text-muted-foreground">
                    No detailed specifications available.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Product Analytics</h3>

                {/* Revenue Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <DollarSign className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-900">
                            {formatCurrency(
                              product.soldCount * discountedPrice
                            )}
                          </div>
                          <div className="text-sm text-blue-700">
                            Total Revenue
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <ShoppingCart className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-900">
                            {product.soldCount}
                          </div>
                          <div className="text-sm text-green-700">
                            Units Sold
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Star className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-900">
                            {product.averageRating || "N/A"}
                          </div>
                          <div className="text-sm text-purple-700">
                            Customer Rating
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center py-8 bg-muted/30 rounded-lg">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">
                    Detailed Analytics
                  </h3>
                  <p className="text-muted-foreground">
                    Advanced analytics and charts would be displayed here.
                  </p>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DetailedInformationTabs;
