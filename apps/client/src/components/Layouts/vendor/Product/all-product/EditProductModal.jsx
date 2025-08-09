import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, PlusCircle, X, FileUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formatCurrency = (value) => {
  if (value === null || value === undefined || isNaN(value)) return "";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

const EditProductModal = ({
  isEditDialogOpen,
  selectedProduct,
  onOpenChange,
  categories,
}) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [hasVariations, setHasVariations] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      discount: 0,
      category: "",
      stock: 0,
      isPromo: false,
      status: "active",
      weight: 0,
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
      },
      variations: [],
      images: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variations",
  });

  // Reset form when selectedProduct changes
  useEffect(() => {
    if (selectedProduct && isEditDialogOpen) {
      // Calculate total stock from variations if they exist
      const totalStock =
        selectedProduct.variations && selectedProduct.variations.length > 0
          ? selectedProduct.variations.reduce(
              (acc, v) => acc + (v.stock || 0),
              0
            )
          : selectedProduct.stock || 0;

      const formData = {
        ...selectedProduct,
        stock: totalStock,
        price: selectedProduct.price || 0,
        discount: selectedProduct.discount || 0,
        weight: selectedProduct.weight || 0,
        dimensions: {
          length: selectedProduct.dimensions?.length || 0,
          width: selectedProduct.dimensions?.width || 0,
          height: selectedProduct.dimensions?.height || 0,
        },
        variations: selectedProduct.variations || [],
      };

      form.reset(formData);

      const hasVars =
        selectedProduct.variations && selectedProduct.variations.length > 0;
      setHasVariations(hasVars);

      // Set up image previews
      const initialPreviews = (selectedProduct.images || []).map(
        (img, index) => ({
          id: `existing-${index}`,
          source: img,
          url: typeof img === "string" ? img : URL.createObjectURL(img),
          isExisting: true,
        })
      );
      setImagePreviews(initialPreviews);

      // Clear any previous errors
      setErrors([]);
    }
  }, [selectedProduct, isEditDialogOpen, form]);

  // Clean up image URLs when dialog closes
  useEffect(() => {
    if (!isEditDialogOpen) {
      imagePreviews.forEach((preview) => {
        if (preview.url.startsWith("blob:")) {
          URL.revokeObjectURL(preview.url);
        }
      });
      setImagePreviews([]);
      setErrors([]);
    }
  }, [isEditDialogOpen]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const remainingSlots = 5 - imagePreviews.length;
      const filesToAdd = files.slice(0, remainingSlots);

      const newPreviews = filesToAdd.map((file, index) => ({
        id: `new-${Date.now()}-${index}`,
        source: file,
        url: URL.createObjectURL(file),
        isExisting: false,
      }));

      const allPreviews = [...imagePreviews, ...newPreviews];
      setImagePreviews(allPreviews);

      form.setValue(
        "images",
        allPreviews.map((p) => p.source),
        { shouldValidate: true }
      );
    }
  };

  const removeImage = (indexToRemove) => {
    const previewToRemove = imagePreviews[indexToRemove];
    if (previewToRemove?.url?.startsWith("blob:")) {
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
      // Clear variations and move total stock to main stock
      const currentVariations = form.getValues("variations") || [];
      const totalStock = currentVariations.reduce(
        (acc, v) => acc + (parseInt(v.stock) || 0),
        0
      );
      form.setValue("stock", totalStock);
      form.setValue("variations", []);
    }
  };

  const validateForm = (data) => {
    const validationErrors = [];

    // Basic validations
    if (!data.name?.trim()) {
      validationErrors.push("Product name is required");
    }

    if (!data.description?.trim()) {
      validationErrors.push("Product description is required");
    }

    if (!data.price || data.price <= 0) {
      validationErrors.push("Price must be greater than 0");
    }

    if (data.discount < 0 || data.discount > 100) {
      validationErrors.push("Discount must be between 0 and 100");
    }

    if (!data.category) {
      validationErrors.push("Category is required");
    }

    // Stock validation
    if (hasVariations) {
      if (!data.variations || data.variations.length === 0) {
        validationErrors.push(
          "At least one variation is required when variations are enabled"
        );
      } else {
        data.variations.forEach((variation, index) => {
          if (!variation.size) {
            validationErrors.push(`Variation ${index + 1}: Size is required`);
          }
          if (!variation.color?.trim()) {
            validationErrors.push(`Variation ${index + 1}: Color is required`);
          }
          if (!variation.stock || variation.stock < 0) {
            validationErrors.push(
              `Variation ${index + 1}: Stock must be 0 or greater`
            );
          }
        });
      }
    } else {
      if (data.stock < 0) {
        validationErrors.push("Stock must be 0 or greater");
      }
    }

    // Image validation
    if (!data.images || data.images.length === 0) {
      validationErrors.push("At least one product image is required");
    }

    return validationErrors;
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrors([]);

    try {
      // Validate form data
      const validationErrors = validateForm(data);

      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }

      // Transform data for API
      const transformedData = {
        ...data,
        price: parseFloat(data.price),
        discount: parseFloat(data.discount) || 0,
        weight: parseFloat(data.weight) || 0,
        dimensions: {
          length: parseFloat(data.dimensions?.length) || 0,
          width: parseFloat(data.dimensions?.width) || 0,
          height: parseFloat(data.dimensions?.height) || 0,
        },
      };

      // Calculate total stock from variations if they exist
      if (hasVariations && data.variations?.length > 0) {
        transformedData.stock = data.variations.reduce(
          (acc, v) => acc + parseInt(v.stock || 0),
          0
        );
        transformedData.variations = data.variations.map((v) => ({
          ...v,
          stock: parseInt(v.stock || 0),
        }));
      } else {
        transformedData.stock = parseInt(data.stock || 0);
        transformedData.variations = [];
      }

      // Here you would make the API call to update the product
      console.log("Form Submitted for Update:", transformedData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      alert("Product updated successfully!");

      // Close modal
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating product:", error);
      setErrors(["Failed to update product. Please try again."]);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Dialog open={isEditDialogOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to your product details below. All fields marked with *
            are required.
          </DialogDescription>
        </DialogHeader>

        {/* Display validation errors */}
        {errors.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 p-1"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1">
                            Product Name <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter product name"
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
                          <FormLabel className="flex items-center gap-1">
                            Description <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              className="min-h-[120px]"
                              placeholder="Describe your product features, benefits, and specifications..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Product Images */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-1">
                      Product Images <span className="text-red-500">*</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="images"
                      render={() => (
                        <FormItem>
                          <FormControl>
                            <label
                              htmlFor="dropzone-file-edit"
                              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted transition-colors ${
                                imagePreviews.length >= 5
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                            >
                              <FileUp className="w-8 h-8 mb-4 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground text-center">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag & drop
                              </p>
                              <p className="text-xs text-muted-foreground">
                                PNG, JPG, JPEG (MAX. 5 images)
                              </p>
                              <Input
                                id="dropzone-file-edit"
                                type="file"
                                className="hidden"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                disabled={imagePreviews.length >= 5}
                              />
                            </label>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {imagePreviews.map((preview, index) => (
                          <div key={preview.id} className="relative group">
                            <img
                              src={preview.url}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://placehold.co/300x300/f87171/ffffff?text=Error";
                              }}
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            {index === 0 && (
                              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs text-center py-1 rounded-b-lg">
                                Main Image
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Stock & Variations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Stock & Variations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="variations"
                      render={() => (
                        <FormItem>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="has-variations-checkbox-edit"
                              checked={hasVariations}
                              onCheckedChange={toggleVariations}
                            />
                            <label
                              htmlFor="has-variations-checkbox-edit"
                              className="text-sm font-medium cursor-pointer"
                            >
                              This product has variations (size, color, etc.)
                            </label>
                          </div>
                          <FormDescription>
                            Enable this if your product comes in different
                            sizes, colors, or other variations.
                          </FormDescription>
                        </FormItem>
                      )}
                    />

                    {!hasVariations ? (
                      <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1">
                              Stock Quantity{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                placeholder="Enter stock quantity"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <div className="space-y-4">
                        <div className="text-sm font-medium">
                          Product Variations
                        </div>

                        {fields.map((item, index) => (
                          <div
                            key={item.id}
                            className="grid grid-cols-1 sm:grid-cols-8 gap-4 p-4 border rounded-lg bg-muted/30"
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
                                      value={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select size" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="XS">XS</SelectItem>
                                        <SelectItem value="S">S</SelectItem>
                                        <SelectItem value="M">M</SelectItem>
                                        <SelectItem value="L">L</SelectItem>
                                        <SelectItem value="XL">XL</SelectItem>
                                        <SelectItem value="XXL">XXL</SelectItem>
                                        <SelectItem value="One Size">
                                          One Size
                                        </SelectItem>
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
                                        placeholder="Enter color name"
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
                                        min="0"
                                        placeholder="0"
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
                                disabled={fields.length === 1}
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
              </div>

              {/* Right Column - Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                {/* Organization */}
                <Card>
                  <CardHeader>
                    <CardTitle>Organization</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="draft">Draft</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1">
                            Category <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category..." />
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

                {/* Pricing & Promotion */}
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing & Promotion</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1">
                            Price (IDR) <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              step="1000"
                              placeholder="0"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {field.value && formatCurrency(field.value)}
                          </FormDescription>
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
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              placeholder="0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isPromo"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Promo Active</FormLabel>
                            <FormDescription>
                              Enable special promotion pricing.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Weight & Dimensions - Collapsible */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="dimensions">
                    <AccordionTrigger className="px-4 bg-muted/50 rounded-lg text-sm">
                      Weight & Dimensions
                    </AccordionTrigger>
                    <AccordionContent>
                      <Card className="border-t-0 rounded-t-none">
                        <CardContent className="pt-6 space-y-4">
                          <FormField
                            control={form.control}
                            name="weight"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Weight (grams)</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 gap-4">
                            <FormField
                              control={form.control}
                              name="dimensions.length"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Length (cm)</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min="0"
                                      step="0.1"
                                      placeholder="0"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="dimensions.width"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Width (cm)</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min="0"
                                      step="0.1"
                                      placeholder="0"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="dimensions.height"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Height (cm)</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min="0"
                                      step="0.1"
                                      placeholder="0"
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            <DialogFooter className="pt-8 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[100px]"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
