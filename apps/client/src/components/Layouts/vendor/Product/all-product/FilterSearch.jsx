import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const FilterSearch = ({ categories, filters, onFilterChange }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search product name..."
          className="pl-10"
          value={filters.searchQuery}
          onChange={(e) => onFilterChange("searchQuery", e.target.value)}
        />
      </div>
      <Select
        value={filters.category}
        onValueChange={(value) => onFilterChange("category", value)}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Filter by Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category._id} value={category._id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={filters.stock}
        onValueChange={(value) => onFilterChange("stock", value)}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Filter by Stock" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Stock</SelectItem>
          <SelectItem value="low">Low Stock</SelectItem>
          <SelectItem value="high">High Stock</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterSearch;
