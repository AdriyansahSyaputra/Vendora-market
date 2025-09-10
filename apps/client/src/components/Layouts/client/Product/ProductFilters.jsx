import { useEffect } from "react";
import { X, Star, SlidersHorizontal, ChevronDown } from "lucide-react";
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
import { Slider } from "@/components/ui/slider";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty",
  "Hobbies",
];

const sortOptions = {
  popular: "Most Popular",
  newest: "Newest",
  lowPrice: "Price: Low to High",
  highPrice: "Price: High to Low",
};
const ratingOptions = [5, 4, 3];
const discountOptions = [10, 25, 50, 75];

const AllProductsFilterPanel = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  sortOption,
  onSortChange,
}) => {
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
        {/* Header */}
        <div className="sticky top-0 bg-background pt-4 pb-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Filter & Sort</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <hr className="border-gray-200 dark:border-gray-700 -mx-4" />

        {/* Filter Content */}
        <div className="py-6 space-y-6 overflow-y-auto max-h-[60vh]">
          {/* Sort By */}
          <div>
            <h4 className="font-semibold mb-3">Sort by</h4>
            <select
              className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-sm focus:ring-2 focus:ring-blue-500"
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
            >
              {Object.entries(sortOptions).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          {/* Price Range */}
          <div>
            <h4 className="font-semibold mb-3">Price Range</h4>
            <Slider
              value={[filters.priceRange[0]]}
              max={10000000}
              step={100000}
              onValueChange={(value) =>
                onFilterChange("priceRange", [value[0], 10000000])
              }
            />
            <p className="text-sm text-muted-foreground mt-2">
              Up to: Rp {filters.priceRange[0].toLocaleString("id-ID")}
            </p>
          </div>
          {/* Categories */}
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
          {/* Rating */}
          <div>
            <h4 className="font-semibold mb-3">Minimum Rating</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {ratingOptions.map((r) => (
                <label
                  key={r}
                  htmlFor={`mobile-rating-${r}`}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Checkbox
                    id={`mobile-rating-${r}`}
                    checked={filters.rating === r}
                    onCheckedChange={(checked) =>
                      onFilterChange("rating", checked ? r : 0)
                    }
                  />
                  <span className="flex items-center text-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                    {r} & up
                  </span>
                </label>
              ))}
            </div>
          </div>
          {/* Discount */}
          <div>
            <h4 className="font-semibold mb-3">With Discount</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {discountOptions.map((d) => (
                <label
                  key={d}
                  htmlFor={`mobile-discount-${d}`}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Checkbox
                    id={`mobile-discount-${d}`}
                    checked={filters.minDiscount === d}
                    onCheckedChange={(checked) =>
                      onFilterChange("minDiscount", checked ? d : 0)
                    }
                  />
                  <span className="text-sm font-medium">{d}% or more</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t dark:border-gray-700 flex gap-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              onFilterChange("reset");
              onSortChange("popular");
            }}
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

// Desktop Filter Controls
const AllProductsFilterControls = ({
  filters,
  onFilterChange,
  sortOption,
  onSortChange,
  onOpenFilterPanel,
  activeFilterCount,
}) => {
  const getDiscountLabel = () => {
    if (filters.minDiscount === 1) return "Any Discount";
    if (filters.minDiscount > 1) return `${filters.minDiscount}% or more`;
    return "All";
  };

  return (
    <div className="mb-8">
      {/* Mobile Button */}
      <div className="md:hidden mb-6">
        <Button
          variant="outline"
          className="w-full flex justify-center items-center gap-2"
          onClick={onOpenFilterPanel}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filter & Sort</span>
          {activeFilterCount > 0 && (
            <span className="bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      {/* Desktop Filter Bar */}
      <div className="hidden md:flex items-center justify-between p-4 border rounded-lg dark:border-gray-800 bg-card">
        <div className="flex items-center gap-2">
          {/* Category Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                Category ({filters.categories.length}){" "}
                <ChevronDown className="w-4 h-4 ml-1" />
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

          {/* Discount Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                Discount: {getDiscountLabel()}{" "}
                <ChevronDown className="w-4 h-4 ml-1" />
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
                  All Products
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="1">
                  Any Discount
                </DropdownMenuRadioItem>
                <DropdownMenuSeparator />
                {discountOptions.map((d) => (
                  <DropdownMenuRadioItem key={d} value={String(d)}>
                    {d}% or more
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Rating Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                Rating: {filters.rating > 0 ? `${filters.rating}+` : "All"}{" "}
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={String(filters.rating)}
                onValueChange={(val) => onFilterChange("rating", Number(val))}
              >
                <DropdownMenuRadioItem value="0">
                  All Ratings
                </DropdownMenuRadioItem>
                {ratingOptions.map((r) => (
                  <DropdownMenuRadioItem key={r} value={String(r)}>
                    {r} Star & up
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onFilterChange("reset");
                onSortChange("popular");
              }}
            >
              Reset Filters
            </Button>
          )}

          {/* Sort By Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Sort by: {sortOptions[sortOption]}{" "}
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={sortOption}
                onValueChange={onSortChange}
              >
                {Object.entries(sortOptions).map(([key, value]) => (
                  <DropdownMenuRadioItem key={key} value={key}>
                    {value}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export { AllProductsFilterControls, AllProductsFilterPanel };
