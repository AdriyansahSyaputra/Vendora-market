import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

const VariationContent = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const isAddToCartDisabled = !selectedColor || !selectedSize;
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <SheetContent
      side="bottom"
      className="bg-white dark:bg-slate-900 rounded-t-2xl max-h-[80vh] flex flex-col"
    >
      <div className="overflow-y-auto p-4 pb-0">
        <SheetHeader className="p-0">
          <div className="flex items-start gap-4">
            <img
              src={product.images[0]}
              alt="product"
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div>
              <SheetTitle className="text-red-600 dark:text-red-500 text-xl">
                {formatCurrency(product.price)}
              </SheetTitle>
              <SheetDescription>Stok: {product.stock}</SheetDescription>
            </div>
          </div>
        </SheetHeader>
        <div className="mt-6">
          <h3 className="text-md font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Warna
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.variations.colors.map((color) => (
              <Button
                key={color.value}
                variant={selectedColor === color.value ? "default" : "outline"}
                onClick={() => setSelectedColor(color.value)}
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
                variant={selectedSize === size.value ? "default" : "outline"}
                onClick={() => setSelectedSize(size.value)}
                disabled={!size.inStock}
              >
                {size.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <SheetFooter className="mt-auto p-4 border-t border-slate-200 dark:border-slate-800">
        <Button size="lg" className="w-full" disabled={isAddToCartDisabled}>
          <ShoppingCart className="mr-2 h-5 w-5" /> Masukkan Keranjang
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default VariationContent;
