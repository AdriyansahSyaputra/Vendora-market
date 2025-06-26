import { useEffect } from "react";
import { X, Percent, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty",
  "Hobbies",
];
const discountOptions = [75, 50, 25, 10];

const PromoFilterPanel = ({ isOpen, onClose, filters, onFilterChange }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-40 md:hidden"
        onClick={onClose}
      ></div>
      <div
        className={`fixed bottom-0 left-0 right-0 bg-background border-t dark:border-gray-700 rounded-t-2xl z-50 p-4 pt-0 transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="sticky top-0 bg-background pt-4 pb-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Filter Deals</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <hr className="border-gray-200 dark:border-gray-700 -mx-4" />

        <div className="py-6 space-y-6 overflow-y-auto max-h-[60vh]">
          {/* Bagian Kategori dengan desain baru (Grid 2 kolom) */}
          <div>
            <h4 className="font-semibold mb-3">Categories</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {categories.map((cat) => (
                <label
                  key={cat}
                  htmlFor={`mobile-cat-${cat}`}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Checkbox
                    id={`mobile-cat-${cat}`}
                    checked={filters.categories.includes(cat)}
                    onCheckedChange={(checked) => {
                      const newCats = checked
                        ? [...filters.categories, cat]
                        : filters.categories.filter((c) => c !== cat);
                      onFilterChange("categories", newCats);
                    }}
                  />
                  <span className="text-sm font-medium">{cat}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Bagian Diskon dengan desain baru (Grid 2 kolom) */}
          <div>
            <h4 className="font-semibold mb-3">Minimum Discount</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {discountOptions.map((discount) => (
                <label
                  key={discount}
                  htmlFor={`mobile-discount-${discount}`}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Checkbox
                    id={`mobile-discount-${discount}`}
                    checked={filters.minDiscount === discount}
                    onCheckedChange={(checked) =>
                      onFilterChange("minDiscount", checked ? discount : 0)
                    }
                  />
                  <span className="flex items-center text-sm font-medium">
                    <Percent className="w-4 h-4 mr-1.5" /> {discount}% or more
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t dark:border-gray-700 flex gap-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onFilterChange("reset")}
          >
            Reset
          </Button>
          <Button className="w-full" onClick={onClose}>
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
};

// Main Filter Controls (Responsive)
const PromoFilterControls = ({
  filters,
  onFilterChange,
  onOpenFilterPanel,
  activeFilterCount,
}) => {
  return (
    <div className="mb-6">
      <div className="md:hidden">
        <Button
          variant="outline"
          className="w-full flex justify-center items-center gap-2"
          onClick={onOpenFilterPanel}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filter Deals</span>
          {activeFilterCount > 0 && (
            <span className="bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>
      <div className="hidden md:flex items-center justify-between p-4 border rounded-lg dark:border-gray-800 bg-card">
        <div className="flex items-center gap-4">
          <span className="font-semibold">Filter by:</span>
          {/* Perbaikan: Dropdown Kategori sekarang berfungsi */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Category ({filters.categories.length}){" "}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Select Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories.map((cat) => (
                <DropdownMenuCheckboxItem
                  key={cat}
                  checked={filters.categories.includes(cat)}
                  onCheckedChange={(checked) => {
                    const newCats = checked
                      ? [...filters.categories, cat]
                      : filters.categories.filter((c) => c !== cat);
                    onFilterChange("categories", newCats);
                  }}
                >
                  {cat}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Discount:{" "}
                {filters.minDiscount > 0 ? `${filters.minDiscount}%+` : "All"}{" "}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={String(filters.minDiscount)}
                onValueChange={(val) =>
                  onFilterChange("minDiscount", Number(val))
                }
              >
                <DropdownMenuRadioItem value="0">
                  All Discounts
                </DropdownMenuRadioItem>
                {discountOptions.map((d) => (
                  <DropdownMenuRadioItem key={d} value={String(d)}>
                    {d}% or more
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {activeFilterCount > 0 && (
          <Button variant="ghost" onClick={() => onFilterChange("reset")}>
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export { PromoFilterControls, PromoFilterPanel };
