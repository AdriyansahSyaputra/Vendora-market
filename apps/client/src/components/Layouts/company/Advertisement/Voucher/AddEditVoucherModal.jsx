import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddEditVoucherModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  voucherCategories,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    category: voucherCategories[0],
    discount: "",
    validFrom: "",
    validUntil: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setImagePreview(initialData.imageUrl);
    } else {
      setFormData({
        name: "",
        category: voucherCategories[0],
        discount: "",
        validFrom: "",
        validUntil: "",
      });
      setImagePreview(null);
    }
  }, [initialData, isOpen]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData((prev) => ({ ...prev, imageUrl: previewUrl }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.discount) {
      alert("Voucher Name and Discount are required.");
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Voucher" : "Add New Voucher"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Edit the details of this voucher."
              : "Enter the details of the new voucher."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Voucher Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Voucher Icon/Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file:text-primary file:font-semibold"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Voucher preview"
                className="mt-2 w-24 h-24 rounded-lg object-cover"
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger id="category" name="category" className="w-full">
                  <SelectValue placeholder="Pilih Kategori Voucher" />
                </SelectTrigger>
                <SelectContent>
                  {voucherCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="discount">Total Discount</Label>
              <Input
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="e.g., 10% or $5"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="validFrom">Valid From</Label>
              <Input
                id="validFrom"
                name="validFrom"
                type="date"
                value={formData.validFrom}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="validUntil">Valid Until</Label>
              <Input
                id="validUntil"
                name="validUntil"
                type="date"
                value={formData.validUntil}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Voucher</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditVoucherModal;
