import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUp } from "lucide-react";

const EditProductModal = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  selectedProduct,
}) => {
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {selectedProduct && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue={selectedProduct.name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="description"
                defaultValue={selectedProduct.description}
                className="col-span-3"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Image</Label>
              <div className="col-span-3 flex items-center gap-4">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="h-16 w-16 rounded-md object-cover"
                />
                <Button variant="outline" size="sm">
                  <FileUp className="h-4 w-4 mr-2" /> Change Image
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-2 items-center gap-2">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  defaultValue={selectedProduct.price}
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-2">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select defaultValue={selectedProduct.category}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Accessories">Accessories</SelectItem>
                    <SelectItem value="Wearables">Wearables</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 items-center gap-2">
                <Label htmlFor="stock" className="text-right">
                  Stock
                </Label>
                <Input
                  id="stock"
                  type="number"
                  defaultValue={selectedProduct.stock}
                />
              </div>
              <div className="grid grid-cols-2 items-center gap-2">
                <Label htmlFor="sold" className="text-right">
                  Sold
                </Label>
                <Input
                  id="sold"
                  type="number"
                  defaultValue={selectedProduct.sold}
                  readOnly
                />
              </div>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
