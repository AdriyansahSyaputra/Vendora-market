import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import VariationSelector from "./VariationSelector";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

const VariationContent = ({
  product,
  onColorSelect,
  onSizeSelect,
  selectedVariation,
  isAddToCartDisabled,
}) => {
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
        {/* Melewatkan props baru ke VariationSelector */}
        <VariationSelector
          product={product}
          onColorSelect={onColorSelect}
          onSizeSelect={onSizeSelect}
          selectedVariation={selectedVariation}
        />
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
