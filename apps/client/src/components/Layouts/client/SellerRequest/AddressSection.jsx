import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const AddressSection = ({ formData, setFormData }) => {
  const [open, setOpen] = useState(false);

  const selectedOperatingAreas = useMemo(() => {
    return countries.filter((c) =>
      (formData.operatingAreas || []).includes(c.value)
    );
  }, [formData.operatingAreas]);

  const handleOperatingAreaSelect = (countryValue) => {
    const currentAreas = formData.operatingAreas || [];
    const newAreas = currentAreas.includes(countryValue)
      ? currentAreas.filter((v) => v !== countryValue)
      : [...currentAreas, countryValue];
    setFormData({ ...formData, operatingAreas: newAreas });
  };

  const handleLocationChange = (value) => {
    setFormData({
      ...formData,
      address: { ...formData.address, location: value },
    });
  };

  const handleAddressInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      address: { ...formData.address, [id]: value },
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Address & Operating Area</CardTitle>
        <CardDescription>
          Enter your store's full address and select your sales coverage area.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="location">Business Location (Country)</Label>
          <Select
            onValueChange={handleLocationChange}
            value={formData.address?.location || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select business location country..." />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  <span className="mr-2">{country.flag}</span> {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              placeholder="Street name, house number, etc."
              onChange={handleAddressInputChange}
              value={formData.address?.street || ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="village">Village / Sub-district</Label>
            <Input
              id="village"
              placeholder="e.g., West Cilandak"
              onChange={handleAddressInputChange}
              value={formData.address?.village || ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="district">District</Label>
            <Input
              id="district"
              placeholder="e.g., Cilandak"
              onChange={handleAddressInputChange}
              value={formData.address?.district || ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City / Regency</Label>
            <Input
              id="city"
              placeholder="e.g., South Jakarta"
              onChange={handleAddressInputChange}
              value={formData.address?.city || ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              placeholder="e.g., 12430"
              onChange={handleAddressInputChange}
              value={formData.address?.postalCode || ""}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Operating Area (Sales)</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between h-auto min-h-[40px]"
              >
                <div className="flex flex-wrap gap-1">
                  {selectedOperatingAreas.length > 0 ? (
                    selectedOperatingAreas.map((area) => (
                      <span
                        key={area.value}
                        className="flex items-center gap-1 bg-secondary text-secondary-foreground rounded-md px-2 py-0.5 text-sm"
                      >
                        {area.flag} {area.label}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOperatingAreaSelect(area.value);
                          }}
                        />
                      </span>
                    ))
                  ) : (
                    <span className="text-muted-foreground">
                      Select countries...
                    </span>
                  )}
                </div>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
              <Command>
                <CommandInput placeholder="Search country..." />
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandList>
                  <CommandGroup>
                    {countries.map((country) => (
                      <CommandItem
                        key={country.value}
                        value={country.label}
                        onSelect={() => {
                          handleOperatingAreaSelect(country.value);
                          setOpen(true); // Keep popover open
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            (formData.operatingAreas || []).includes(
                              country.value
                            )
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
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressSection;
