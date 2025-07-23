import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
              <FormLabel>Store Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Awesome Gadget Store" {...field} />
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
              <FormLabel>Store Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Briefly describe your store, the products you sell, and your unique selling points."
                  {...field}
                  className="min-h-[120px]"
                />
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
              <FormLabel>Product Categories</FormLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                {productCategories.map((category) => (
                  <FormItem
                    key={category.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(category.id)}
                        onCheckedChange={(checked) => {
                          const currentValues = field.value || [];
                          return checked
                            ? field.onChange([...currentValues, category.id])
                            : field.onChange(
                                currentValues.filter(
                                  (value) => value !== category.id
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {category.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default StoreInfoSection;
