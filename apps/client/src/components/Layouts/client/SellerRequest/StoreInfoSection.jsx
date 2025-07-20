import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// Product categories list (could come from an API)
const productCategories = [
  { id: "fashion", label: "Fashion & Apparel" },
  { id: "electronics", label: "Electronics" },
  { id: "food", label: "Food & Beverage" },
  { id: "home", label: "Home & Groceries" },
  { id: "hobby", label: "Hobbies & Collectibles" },
  { id: "health", label: "Health & Beauty" },
];

const StoreInfoSection = ({ formData, setFormData }) => {
  const handleCategoryChange = (categoryId) => {
    const currentCategories = formData.categories || [];
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter((id) => id !== categoryId)
      : [...currentCategories, categoryId];
    setFormData({ ...formData, categories: newCategories });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Store Information</CardTitle>
        <CardDescription>
          Tell us about the store you are opening.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="storeName">Store Name</Label>
          <Input
            id="storeName"
            placeholder="e.g., Awesome Gadget Store"
            value={formData.storeName || ""}
            onChange={(e) =>
              setFormData({ ...formData, storeName: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="storeDescription">Store Description</Label>
          <Textarea
            id="storeDescription"
            placeholder="Briefly describe your store, the products you sell, and your unique selling points."
            value={formData.storeDescription || ""}
            onChange={(e) =>
              setFormData({ ...formData, storeDescription: e.target.value })
            }
            className="min-h-[120px]"
            required
          />
        </div>
        <div className="space-y-4">
          <Label>Product Categories</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {productCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={(formData.categories || []).includes(category.id)}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                />
                <label
                  htmlFor={category.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoreInfoSection;
