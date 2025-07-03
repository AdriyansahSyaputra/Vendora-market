import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const CouponFormModal = ({
  isOpen,
  onOpenChange,
  onSubmit,
  initialData = null,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    discount: "",
  });

  const isEditing = Boolean(initialData);

  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        category: initialData.category,
        discount: initialData.discount,
      });
    } else {
      // Reset form for new coupon
      setFormData({ name: "", description: "", category: "", discount: "" });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Coupon" : "Add New Coupon"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Make changes to your existing coupon."
                : "Fill in the details to create a new discount coupon."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 grid gap-6">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                placeholder="e.g. Mid-Year Sale"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Short description of the coupon"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="all">All Products</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discount" className="text-right">
                Discount
              </Label>
              <div className="relative col-span-3">
                <Input
                  id="discount"
                  type="number"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="e.g. 25"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
                  %
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Save Changes" : "Create Coupon"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CouponFormModal;
