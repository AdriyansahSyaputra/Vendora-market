import { Button } from "@/components/ui/button";
import { useMemo } from "react";

const VariationSelector = ({
  product,
  selectedColor,
  selectedSize,
  onColorSelect,
  onSizeSelect,
}) => {
  const uniqueColors = useMemo(() => {
    if (!Array.isArray(product?.variations)) return [];
    const colors = product.variations.map((v) => v.color);
    return [...new Set(colors)];
  }, [product]);

  const availableSizes = useMemo(() => {
    if (!Array.isArray(product?.variations) || !selectedColor) return [];
    return product.variations
      .filter((v) => v.color === selectedColor)
      .map((v) => ({ size: v.size, stock: v.stock }));
  }, [product, selectedColor]);

  const isColorDisabled = (color) => {
    return product.variations
      .filter((v) => v.color === color)
      .every((v) => v.stock === 0);
  };

  return (
    <>
      <div className="mt-6">
        <h3 className="text-md font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Warna
        </h3>
        <div className="flex flex-wrap gap-2">
          {uniqueColors.map((color) => (
            <Button
              key={color}
              variant={selectedColor === color ? "default" : "outline"}
              onClick={() => onColorSelect(color)}
              disabled={isColorDisabled(color)}
              className="disabled:bg-slate-100 disabled:text-slate-400 disabled:line-through dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
            >
              {color}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-md font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Ukuran
        </h3>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((item) => (
            <Button
              key={item.size}
              variant={selectedSize === item.size ? "default" : "outline"}
              onClick={() => onSizeSelect(item.size)}
              disabled={item.stock === 0}
            >
              {item.size}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default VariationSelector;
