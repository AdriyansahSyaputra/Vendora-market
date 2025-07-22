import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Country data (in a real app, this could come from an API)
const countries = [
  { value: "ID", label: "Indonesia", flag: "🇮🇩" },
  { value: "SG", label: "Singapore", flag: "🇸🇬" },
  { value: "MY", label: "Malaysia", flag: "🇲🇾" },
  { value: "US", label: "United States", flag: "🇺🇸" },
  { value: "GB", label: "United Kingdom", flag: "🇬🇧" },
  { value: "AU", label: "Australia", flag: "🇦🇺" },
  { value: "JP", label: "Japan", flag: "🇯🇵" },
];

const AddressSection = ({ form }) => {
  // State for the multi-select Popover, this is a good use case for local UI state
  const [open, setOpen] = useState(false);

  // Use `watch` to get the `location` value in real-time
  // This will trigger a re-render when its value changes, which is what we want for conditional UI
  const location = form.watch("location");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Address & Operating Area</CardTitle>
        <CardDescription>
          Enter your store's full address and select your sales coverage area.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* === Location Select (Single Choice) === */}
        <FormField
          control={form.control}
          name="location" // Field name matches the Zod schema
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Location (Country)</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business location country..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      <span className="mr-2">{country.flag}</span>{" "}
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* === Conditional Address Fields === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Common Field */}
          <FormField
            control={form.control}
            name="address.street"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Street name, house number, etc."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Indonesia-Specific Fields */}
          {location === "ID" && (
            <>
              <FormField
                control={form.control}
                name="address.village"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Village / Sub-district</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., West Cilandak" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Cilandak" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Common Fields */}
          <FormField
            control={form.control}
            name="address.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City / Regency</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., South Jakarta" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* US-Specific Field (Example) */}
          {location === "US" && (
            <FormField
              control={form.control}
              name="address.state" // You might need to add this to your Zod schema
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., California" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="address.postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 12430" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="operatingArea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operating Area (Sales)</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between h-auto min-h-[40px]",
                      !field.value?.length && "text-muted-foreground"
                    )}
                  >
                    <div className="flex flex-wrap gap-1">
                      {field.value?.length > 0
                        ? countries
                            .filter((c) => field.value.includes(c.value))
                            .map((area) => (
                              <span
                                key={area.value}
                                className="flex items-center gap-1.5 bg-secondary text-secondary-foreground rounded-md px-2 py-0.5 text-sm"
                              >
                                {area.flag} {area.label}
                                <X
                                  className="h-3 w-3 cursor-pointer rounded-full hover:bg-muted"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent Popover from opening
                                    const newValue = field.value.filter(
                                      (v) => v !== area.value
                                    );
                                    field.onChange(newValue);
                                  }}
                                />
                              </span>
                            ))
                        : "Select countries..."}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countries.map((country) => (
                          <CommandItem
                            key={country.value}
                            value={country.label}
                            onSelect={() => {
                              const currentValues = field.value || [];
                              const newValue = currentValues.includes(
                                country.value
                              )
                                ? currentValues.filter(
                                    (v) => v !== country.value
                                  )
                                : [...currentValues, country.value];
                              field.onChange(newValue);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value?.includes(country.value)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <span className="mr-2">{country.flag}</span>
                            {country.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default AddressSection;
