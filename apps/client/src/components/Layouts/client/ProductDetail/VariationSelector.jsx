import { Button } from "@/components/ui/button";

const VariationSelector = ({
  product,
  onColorSelect,
  onSizeSelect,
  selectedVariation,
}) => {
  return (
    <>
      <div className="mt-6">
        <h3 className="text-md font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Warna
        </h3>
        <div className="flex flex-wrap gap-2">
          {product.variations.colors.map((color) => (
            <Button
              key={color.value}
              variant={
                selectedVariation.color === color.value ? "default" : "outline"
              }
              onClick={() => onColorSelect(color.value)}
              disabled={!color.inStock}
              className="disabled:bg-slate-100 disabled:text-slate-400 disabled:line-through dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
            >
              {color.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-md font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Ukuran
        </h3>
        <div className="flex flex-wrap gap-2">
          {product.variations.sizes.map((size) => (
            <Button
              key={size.value}
              variant={
                selectedVariation.size === size.value ? "default" : "outline"
              }
              onClick={() => onSizeSelect(size.value)}
              disabled={!size.inStock}
            >
              {size.name}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default VariationSelector;
