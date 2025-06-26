import { useEffect } from "react";
import { X, Star, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

const categories = [
  "Elektronik",
  "Fashion",
  "Rumah Tangga",
  "Kecantikan",
  "Hobi",
];
const sortOptions = {
  popular: "Paling Populer",
  newest: "Terbaru",
  lowPrice: "Harga Terendah",
  highPrice: "Harga Tertinggi",
};
const ratingOptions = [5, 4, 3];

// Panel Filter untuk Mobile (Bottom Sheet)
const FilterPanel = ({
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
        className={`fixed bottom-0 left-0 right-0 bg-background border-t dark:border-gray-800 rounded-t-2xl z-50 p-4 transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b dark:border-gray-800">
          <h3 className="text-lg font-semibold">Filter & Urutkan</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="py-4 space-y-6 overflow-y-auto max-h-[60vh]">
          <div>
            <h4 className="font-semibold mb-3">Urutkan</h4>
            <select
              className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 text-xs md:text-sm "
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
          <div>
            <h4 className="font-semibold mb-3">Kategori</h4>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <div key={cat} className="flex items-center space-x-2">
                  <Checkbox
                    id={`mobile-${cat}`}
                    checked={filters.categories.includes(cat)}
                    onCheckedChange={(checked) => {
                      const newCats = checked
                        ? [...filters.categories, cat]
                        : filters.categories.filter((c) => c !== cat);
                      onFilterChange("categories", newCats);
                    }}
                  />
                  <label htmlFor={`mobile-${cat}`} className="text-sm">
                    {cat}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Rating</h4>
            {ratingOptions.map((ratingValue) => {
              const isChecked = filters.rating === ratingValue;
              return (
                <div
                  key={ratingValue}
                  className="flex items-center space-x-2 py-1"
                >
                  <Checkbox
                    id={`mobile-rating-${ratingValue}`}
                    checked={isChecked}
                    onCheckedChange={(checked) => {
                      onFilterChange("rating", checked ? ratingValue : 0);
                    }}
                  />
                  <label
                    htmlFor={`mobile-rating-${ratingValue}`}
                    className="flex items-center text-sm"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < ratingValue
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                    <span className="ml-2">& ke atas</span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="pt-4 border-t dark:border-gray-800 flex gap-4">
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
            Terapkan
          </Button>
        </div>
      </div>
    </>
  );
};

// Kontrol Filter Utama (Responsif)
const FilterControls = ({
  filters,
  onFilterChange,
  sortOption,
  onSortChange,
  onOpenFilterPanel,
  activeFilterCount,
}) => {
  return (
    <div className="mb-6">
      {/* Mobile Filter Button */}
      <div className="md:hidden">
        <Button
          variant="outline"
          className="w-full flex justify-center items-center gap-2"
          onClick={onOpenFilterPanel}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filter & Urutkan</span>
          {activeFilterCount > 0 && (
            <span className="bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      {/* Desktop Filter Controls */}
      <div className="hidden md:flex items-center justify-between p-4 border rounded-lg dark:border-gray-800 bg-card">
        <div className="flex items-center gap-4">
          <span className="font-semibold">Filter:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Kategori <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Pilih Kategori</DropdownMenuLabel>
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
          <Button
            variant={filters.rating === 4 ? "default" : "outline"}
            onClick={() =>
              onFilterChange("rating", filters.rating === 4 ? 0 : 4)
            }
          >
            <Star className="w-4 h-4 mr-2" /> Rating 4+
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Urutkan: {sortOptions[sortOption]}{" "}
                <ChevronDown className="w-4 h-4 ml-2" />
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
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              onClick={() => {
                onFilterChange("reset");
                onSortChange("popular");
              }}
            >
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export { FilterControls, FilterPanel };
