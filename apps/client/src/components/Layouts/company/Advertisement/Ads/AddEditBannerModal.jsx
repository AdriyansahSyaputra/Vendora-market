import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";

const AddEditBannerModal = ({ isOpen, onClose, onSave, initialData, bannerLocations }) => {
  const [formData, setFormData] = useState({
    title: "",
    location: bannerLocations[0],
    startDate: "",
    endDate: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setImagePreview(initialData.imageUrl);
    } else {
      setFormData({
        title: "",
        location: bannerLocations[0],
        startDate: "",
        endDate: "",
      });
      setImagePreview(null);
    }
  }, [initialData, isOpen]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      // In a real app, you'd handle the file upload itself.
      // For this demo, we'll just use the preview URL as the new image URL.
      setFormData((prev) => ({ ...prev, imageUrl: previewUrl }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Simple validation
    if (!formData.title || !formData.imageUrl) {
      alert("Title and Image are required.");
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
            {initialData ? "Edit Banner" : "Add New Banner"}
          </DialogTitle>
          <DialogDescription>
            Fill in the details for the advertisement banner.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Ad Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Banner Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file:text-primary file:font-semibold"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Banner preview"
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Image Location</Label>
            <Select
              value={formData.location}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, location: value }))
              }
            >
              <SelectTrigger id="location" name="location" className="w-full">
                <SelectValue placeholder="Pilih Lokasi Banner" />
              </SelectTrigger>
              <SelectContent>
                {bannerLocations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Banner</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditBannerModal;