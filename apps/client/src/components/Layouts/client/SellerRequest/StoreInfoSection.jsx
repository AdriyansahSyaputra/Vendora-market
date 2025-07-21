import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
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

const StoreInfoSection = ({ form }) => {
  const handleCategoryChange = (categoryId) => {
    const currentCategories = form.getValues("categories") || [];
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter((id) => id !== categoryId)
      : [...currentCategories, categoryId];

    form.setValue("categories", newCategories, {
      shouldValidate: true,
      shouldDirty: true,
    });
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
        <FormField
          control={form.control}
          name="storeName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    placeholder="e.g., Awesome Gadget Store"
                    {...field}
                    required
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="storeDescription"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-2">
                  <Label htmlFor="storeDescription">Store Description</Label>
                  <Textarea
                    id="storeDescription"
                    placeholder="Briefly describe your store, the products you sell, and your unique selling points."
                    {...field}
                    className="min-h-[120px]"
                    required
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-4">
                  <Label>Product Categories</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {productCategories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={category.id}
                          checked={(field.value || []).includes(category.id)}
                          onCheckedChange={() =>
                            handleCategoryChange(category.id)
                          }
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default StoreInfoSection;
