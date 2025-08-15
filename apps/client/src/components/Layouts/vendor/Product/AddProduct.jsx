import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Trash2, PlusCircle, X, Loader2 } from "lucide-react";

const formatNumber = (value) => {
  if (!value) return "";
  return new Intl.NumberFormat("en-US").format(value);
};

const promoEvents = [
  { id: "summer-sale", label: "Summer Sale" },
  { id: "flash-deal", label: "Flash Deal" },
];

const AddProduct = ({ categories }) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [hasVariations, setHasVariations] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      discount: 0,
      category: "",
      stock: 0,
      promos: [],
      variations: [],
      images: undefined,
      weight: undefined,
      dimensions: { length: undefined, width: undefined, height: undefined },
      status: "draft",
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variations",
  });

  const { isSubmitting } = form.formState;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => ({
      source: file,
      url: URL.createObjectURL(file),
    }));
    const allPreviews = [...imagePreviews, ...newPreviews].slice(0, 5);
    setImagePreviews(allPreviews);
    form.setValue(
      "images",
      allPreviews.map((p) => p.source),
      { shouldValidate: true }
    );
  };

  const removeImage = (indexToRemove) => {
    const previewToRemove = imagePreviews[indexToRemove];
    if (previewToRemove.url.startsWith("blob:")) {
      URL.revokeObjectURL(previewToRemove.url);
    }
    const updatedPreviews = imagePreviews.filter(
      (_, index) => index !== indexToRemove
    );
    setImagePreviews(updatedPreviews);
    form.setValue(
      "images",
      updatedPreviews.map((p) => p.source),
      { shouldValidate: true }
    );
  };

  const toggleVariations = (checked) => {
    setHasVariations(checked);
    if (checked && fields.length === 0) {
      append({ size: "M", color: "", stock: 10 });
    } else if (!checked) {
      form.setValue("variations", []);
    }
  };

  // Cleanup URL object saat komponen unmount
  useEffect(() => {
    return () => {
      imagePreviews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [imagePreviews]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        const value = data[key];
        if (key === "images" && value) {
          value.forEach((file) => formData.append("images", file));
        } else if (typeof value === "object" && value !== null) {
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      await axios.post("/api/vendor/product/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success("Product created successfully!");
      form.reset();
      setImagePreviews([]);
      setHasVariations(false);
    } catch (err) {
      console.error("Failed to create product:", err);
      const errorData = err.response?.data;

      if (errorData && errorData.errors) {
        form.clearErrors();

        const entries = Object.entries(errorData.errors);
        entries.forEach(([field, message]) => {
          form.setError(field, {
            type: "server",
            message: Array.isArray(message) ? message[0] : message,
          });
        });

        if (entries.length > 0) {
          const firstField = entries[0][0];
          try {
            form.setFocus(firstField);
          } catch {
            // ignore if focus fails for complex names
          }
        }

        toast.error("Validation failed. Please check the form.");
      } else {
        toast.error("Failed to create product", {
          description: errorData?.message || "An unexpected error occurred.",
        });
      }
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />

      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>
            Fill out the form below to add a new product to your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Section 1: Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Provide the product name and a detailed description.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Modern Coffee Table"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the product, its features, materials, etc."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Section 2: Pricing & Discount */}
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Promotions</CardTitle>
                  <CardDescription>
                    Set the product price, discount, and link to promotions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (IDR)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute inset-y-1 left-0 flex items-center pl-3 text-muted-foreground">
                              Rp
                            </span>
                            <Input
                              type="text"
                              placeholder="1,000,000"
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                                field.onChange(Number(value));
                                e.target.value = formatNumber(value);
                              }}
                              onBlur={(e) => {
                                field.onBlur();
                                e.target.value = formatNumber(field.value);
                              }}
                              value={formatNumber(field.value)}
                              className="pl-9"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount (%)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              placeholder="e.g., 10"
                              {...field}
                              className="pr-8"
                            />
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
                              %
                            </span>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Enter a value between 0 and 100.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="promos"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">
                              Platform Promotions
                            </FormLabel>
                            <FormDescription>
                              Select active promotions to apply to this product.
                            </FormDescription>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
                            {promoEvents.map((item) => (
                              <FormField
                                key={item.id}
                                control={form.control}
                                name="promos"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(
                                            item.id
                                          )}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...(field.value || []),
                                                  item.id,
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== item.id
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {item.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Section 3: Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Category</CardTitle>
                  <CardDescription>
                    Classify your product to improve discoverability.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat._id} value={cat._id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Section 4: Stock & Variations */}
              <Card>
                <CardHeader>
                  <CardTitle>Stock & Variations</CardTitle>
                  <CardDescription>
                    Manage inventory for your product.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has-variations-checkbox"
                      checked={hasVariations}
                      onCheckedChange={toggleVariations}
                    />
                    <label
                      htmlFor="has-variations-checkbox"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      This product has multiple variations (e.g., size, color)
                    </label>
                  </div>

                  {!hasVariations ? (
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Main Stock</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 100"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Stock count if the product has no variations.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <div className="space-y-4">
                      {fields.map((item, index) => (
                        <div
                          key={item.id}
                          className="grid grid-cols-1 sm:grid-cols-8 gap-4 p-4 border rounded-lg relative"
                        >
                          <div className="sm:col-span-2">
                            <FormField
                              control={form.control}
                              name={`variations.${index}.size`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Size</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Size" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="S">S</SelectItem>
                                      <SelectItem value="M">M</SelectItem>
                                      <SelectItem value="L">L</SelectItem>
                                      <SelectItem value="XL">XL</SelectItem>
                                      <SelectItem value="XXL">XXL</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="sm:col-span-3">
                            <FormField
                              control={form.control}
                              name={`variations.${index}.color`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Color</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="e.g., Midnight Black"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <FormField
                              control={form.control}
                              name={`variations.${index}.stock`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Stock</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="e.g., 50"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="sm:col-span-1 flex items-end">
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => remove(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() =>
                          append({ size: "M", color: "", stock: 10 })
                        }
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Variation
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Section 5: Product Images */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>
                    Upload up to 5 images. The first image will be the main one.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Images</FormLabel>
                        <FormControl>
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="dropzone-file"
                              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                  className="w-8 h-8 mb-4 text-muted-foreground"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 20 16"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                  />
                                </svg>
                                <p className="mb-2 text-sm text-muted-foreground">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  SVG, PNG, JPG or GIF (MAX. 5MB)
                                </p>
                              </div>
                              <Input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                disabled={imagePreviews.length >= 5}
                              />
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {imagePreviews.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview.url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <div className="absolute top-0 right-0 m-1">
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="h-7 w-7 opacity-75 group-hover:opacity-100"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          {index === 0 && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-1 rounded-b-lg">
                              Main Image
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Section 6: Weight & Dimensions (Optional) */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-6 bg-muted/50 rounded-lg">
                    <div className="flex flex-col items-start">
                      <span className="font-semibold">Weight & Dimensions</span>
                      <span className="text-sm text-muted-foreground font-normal">
                        Used for shipping cost calculation.
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card className="border-t-0 rounded-t-none">
                      <CardContent className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                        <FormField
                          control={form.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Weight (g)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="500"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="dimensions.length"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Length (cm) (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="20"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="dimensions.width"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Width (cm) (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="15"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="dimensions.height"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Height (cm) (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="10"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Section 7: Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Status</CardTitle>
                  <CardDescription>
                    Set the visibility of your product in the store.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          'Active' products are visible to customers. 'Inactive'
                          are hidden. 'Draft' is for internal use.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Form Actions */}
              <div className="flex justify-end gap-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isSubmitting ? "Saving..." : "Save Product"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default AddProduct;
