import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ProductDetailsModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;
  const DetailItem = ({ label, value }) => (
    <div className="grid grid-cols-3 gap-4 py-2 border-b border-slate-100 dark:border-slate-800">
      <dt className="text-sm font-medium text-slate-500 dark:text-slate-300">
        {label}
      </dt>
      <dd className="text-sm text-slate-900 col-span-2 dark:text-slate-200">
        {value || "-"}
      </dd>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>SKU: {product.sku}</DialogDescription>
        </DialogHeader>
        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
          <dl>
            <DetailItem label="Description" value={product.description} />
            <DetailItem label="Category" value={product.category} />
            <DetailItem label="Product Type" value={product.type} />
            <DetailItem label="Price" value={`$${product.price.toFixed(2)}`} />
            <DetailItem
              label="Total Stock"
              value={
                product.totalStock > 0 ? product.totalStock : "Out of Stock"
              }
            />
            <DetailItem label="Seller" value={product.sellerName} />
            <DetailItem label="Distributor" value={product.distributor} />
          </dl>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;
