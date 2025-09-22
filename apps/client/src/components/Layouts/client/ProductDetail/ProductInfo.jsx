import { Badge } from "@/components/UI/Badge";

const ProductInfo = ({ product, selectedVariationStock }) => {
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
        {product.name}
      </h1>
      <div className="mt-2 flex items-baseline gap-3">
        <p className="text-3xl font-extrabold text-red-600 dark:text-red-500">
          {formatCurrency(product.discountedPrice)}
        </p>
        {product.discountedPrice > 0 && (
          <p className="text-lg font-medium text-slate-400 dark:text-slate-500 line-through">
            {formatCurrency(product.price)}
          </p>
        )}
      </div>
      {product.discount > 0 && (
        <div className="mt-2">
          <Badge variant="destructive">{product.discount}% OFF</Badge>
        </div>
      )}
      <div className="mt-4 flex items-center text-sm text-slate-500 dark:text-slate-400 gap-4">
        <span>Terjual {product.soldCount}+</span>
        <span className="h-4 w-px bg-slate-300 dark:bg-slate-700"></span>
        <span>
          Stok:{" "}
          {selectedVariationStock !== null
            ? selectedVariationStock
            : product.stock}
        </span>
      </div>
    </div>
  );
};

export default ProductInfo;
