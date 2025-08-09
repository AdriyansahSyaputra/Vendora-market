import { Card, CardContent } from "@/components/ui/card";

const ProductImages = ({ product, selectedImage, setSelectedImage }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Main Image */}
          <div className="md:col-span-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={
                  product.images?.[selectedImage] ||
                  "https://placehold.co/600x600/e2e8f0/64748b?text=No+Image"
                }
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/600x600/e2e8f0/64748b?text=No+Image";
                }}
              />
            </div>
          </div>

          {/* Thumbnail Images */}
          {product.images && product.images.length > 0 && (
            <div className="md:col-span-1">
              <div className="grid grid-cols-4 md:grid-cols-1 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/150x150/e2e8f0/64748b?text=Error";
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductImages;
