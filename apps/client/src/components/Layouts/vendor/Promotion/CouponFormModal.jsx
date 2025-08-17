import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
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
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const isEditing = Boolean(initialData);
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  const form = useForm({
    defaultValues: initialData || {
      name: "",
      code: "",
      description: "",
      discountType: "percentage",
      discountValue: 10,
      minPurchaseAmount: 0,
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      usageLimit: 100,
    },
  });

  const discountType = form.watch("discountType");

  useEffect(() => {
    if (isOpen) {
      const defaultValues = {
        name: "",
        code: "",
        description: "",
        discountType: "percentage",
        discountValue: 10,
        minPurchaseAmount: 50000,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        usageLimit: 100,
      };
      form.reset(
        initialData
          ? {
              ...initialData,
              startDate: new Date(initialData.startDate),
              endDate: new Date(initialData.endDate),
            }
          : defaultValues
      );
    }
  }, [initialData, isOpen, form]);

  const handleFormSubmit = (values) => {
    onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
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

        {/* 5. Build the form with Shadcn UI components */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-6 py-4"
          >
            {/* Name and Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coupon Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Mid-Year Sale" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coupon Code</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. HEMAT50K" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Short description of the coupon"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Discount Type and Value */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="discountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a discount type" />
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
                control={form.control}
                name="discountValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Value</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g. 15"
                          {...field}
                          className={
                            discountType === "fixed_amount" ? "pl-8" : "pr-8"
                          }
                        />
                      </FormControl>
                      <div className="absolute inset-y-0 left-3 flex items-center text-muted-foreground text-sm">
                        {discountType === "fixed_amount" && "Rp"}
                      </div>
                      <div className="absolute inset-y-0 right-3 flex items-center text-muted-foreground text-sm">
                        {discountType === "percentage" && "%"}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Min Purchase and Usage Limit */}
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
                    <FormLabel>Usage Limit</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g. 100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Start and End Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover
                      open={startDateOpen}
                      onOpenChange={setStartDateOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          onClick={() => {
                            console.log("Start date button clicked");
                            setStartDateOpen(true);
                          }}
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
                          onSelect={(date) => {
                            field.onChange(date);
                            setStartDateOpen(false);
                          }}
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
                    <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          onClick={() => {
                            console.log("End date button clicked");
                            setEndDateOpen(true);
                          }}
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
                          onSelect={(date) => {
                            field.onChange(date);
                            setEndDateOpen(false);
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

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? "Saving..."
                  : isEditing
                  ? "Save Changes"
                  : "Create Coupon"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CouponFormModal;
