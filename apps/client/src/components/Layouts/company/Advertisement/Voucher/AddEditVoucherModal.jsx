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
}) => {
  const isEditing = Boolean(initialData);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const form = useForm({
    defaultValues: {
      name: "",
      code: "",
      description: "",
      voucherType: "product_discount",
      discountType: "percentage",
      discountValue: 0,
      minPurchaseAmount: 0,
      usageLimit: 0,
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      image: null,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        form.reset({
          name: initialData.name || "",
          code: initialData.code || "",
          description: initialData.description || "",
          voucherType: initialData.voucherType || "product_discount",
          discountType: initialData.discountType || "percentage",
          discountValue: initialData.discountValue || 0,
          minPurchaseAmount: initialData.minPurchaseAmount || 0,
          usageLimit: initialData.usageLimit || 0,
          startDate: new Date(initialData.startDate),
          endDate: new Date(initialData.endDate),
        });
        setImagePreview(initialData.image || null);
        setSelectedFile(null);
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
        });
        setImagePreview(null);
        setSelectedFile(null);
      }
    }
  }, [initialData, isOpen, form]);

  const handleFormSubmit = (data) => {
    const submitData = {
      ...data,
      image: selectedFile,
    };
    onSubmit(submitData);
  };

  const handleClose = () => {
    form.reset();
    setImagePreview(null);
    setSelectedFile(null);
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
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
                          onChange={handleImageChange}
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Value *</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 15"
                            min="1"
                            step={discountType === "percentage" ? "1" : "1000"}
                            {...field}
                            className={
                              discountType === "fixed_amount" ? "pl-8" : "pr-8"
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usage Limit *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="e.g. 100"
                          {...field}
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
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        {" "}
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant={"outline"}
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
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
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
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant={"outline"}
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
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0"
                          align="start"
                          style={{ zIndex: 9999 }}
                          container={document.body}
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
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
                disabled={form.formState.isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
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
