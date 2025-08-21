import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
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
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Upload } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  onSubmit,
  initialData,
  voucherTypes,
  isSubmitting = false,
}) => {
  const isEditing = Boolean(initialData);
  const [imagePreview, setImagePreview] = useState(null);

  const form = useForm({
    defaultValues: {
      name: "",
      code: "",
      description: "",
      voucherType: "product_discount",
      discountType: "percentage",
      discountValue: 10,
      minPurchaseAmount: 0,
      usageLimit: 100,
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      image: null,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (isEditing && initialData) {
        const startDate = initialData.startDate
          ? new Date(initialData.startDate)
          : new Date();
        const endDate = initialData.endDate
          ? new Date(initialData.endDate)
          : new Date(new Date().setDate(new Date().getDate() + 30));

        form.reset({
          name: initialData.name || "",
          code: initialData.code || "",
          description: initialData.description || "",
          voucherType: initialData.voucherType || "product_discount",
          discountType: initialData.discountType || "percentage",
          discountValue: Number(initialData.discountValue) || 10,
          minPurchaseAmount: Number(initialData.minPurchaseAmount) || 0,
          usageLimit: Number(initialData.usageLimit) || 100,
          startDate,
          endDate,
          image: initialData.image || initialData.imageUrl || null,
        });

        setImagePreview(initialData.image || initialData.imageUrl || null);
      } else {
        form.reset({
          name: "",
          code: "",
          description: "",
          voucherType: "product_discount",
          discountType: "percentage",
          discountValue: 10,
          minPurchaseAmount: 0,
          usageLimit: 100,
          startDate: new Date(),
          endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
          image: null,
        });
        setImagePreview(null);
      }
    }
  }, [isOpen, isEditing, initialData, form]);

  const handleFormSubmit = (data) => {
    const formattedData = {
      ...data,
      startDate: format(data.startDate, "yyyy-MM-dd"),
      endDate: format(data.endDate, "yyyy-MM-dd"),
      discountValue: Number(data.discountValue),
      minPurchaseAmount: Number(data.minPurchaseAmount),
      usageLimit: Number(data.usageLimit),
    };

    onSubmit(formattedData);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      form.reset();
      setImagePreview(null);
      onClose();
    }
  };

  const discountType = form.watch("discountType");

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Voucher" : "Add New Voucher"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Edit the details of this voucher."
              : "Enter the details for the new platform voucher."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-4"
          >
            <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4">
              {/* Image Upload Section */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Voucher Image/Icon</FormLabel>
                    <div className="flex items-center gap-4">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Voucher preview"
                          className="w-20 h-20 rounded-lg object-cover border"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center border">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          className="flex-1"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file);
                              setImagePreview(URL.createObjectURL(file));
                            }
                          }}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Basic Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  name="name"
                  control={form.control}
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Flash Sale 8.8" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="code"
                  control={form.control}
                  rules={{ required: "Code is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. FLASH88"
                          {...field}
                          style={{ textTransform: "uppercase" }}
                          onChange={(e) =>
                            field.onChange(e.target.value.toUpperCase())
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the voucher's purpose"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Voucher Type */}
              <FormField
                name="voucherType"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Voucher Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {voucherTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Discount Configuration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  name="discountType"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Type</FormLabel>
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
                          <SelectItem value="percentage">
                            Percentage (%)
                          </SelectItem>
                          <SelectItem value="fixed_amount">
                            Fixed Amount (Rp)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="discountValue"
                  control={form.control}
                  rules={{
                    required: "Discount value is required",
                    min: { value: 1, message: "Value must be greater than 0" },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Value *</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            step={discountType === "percentage" ? "1" : "1000"}
                            {...field}
                            className={
                              discountType === "fixed_amount" ? "pl-8" : "pr-8"
                            }
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        {discountType === "fixed_amount" && (
                          <div className="absolute inset-y-0 left-3 flex items-center text-muted-foreground text-sm">
                            Rp
                          </div>
                        )}
                        {discountType === "percentage" && (
                          <div className="absolute inset-y-0 right-3 flex items-center text-muted-foreground text-sm">
                            %
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Purchase & Usage Limits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="minPurchaseAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Purchase</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            placeholder="e.g. 50000"
                            {...field}
                            className="pl-8"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <div className="absolute inset-y-0 left-3 flex items-center text-muted-foreground text-sm">
                          Rp
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="usageLimit"
                  rules={{
                    required: "Usage limit is required",
                    min: { value: 1, message: "Must be at least 1" },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usage Limit *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="e.g. 100"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  rules={{ required: "Start date is required" }}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  rules={{ required: "End date is required" }}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                              const startDate = form.getValues("startDate");
                              return date < startDate;
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? isEditing
                    ? "Updating..."
                    : "Creating..."
                  : isEditing
                  ? "Update Voucher"
                  : "Create Voucher"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditVoucherModal;
