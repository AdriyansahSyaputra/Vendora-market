import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const FilterSearch = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search product name..." className="pl-10" />
      </div>
      <Select>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Filter by Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="electronics">Electronics</SelectItem>
          <SelectItem value="accessories">Accessories</SelectItem>
          <SelectItem value="wearables">Wearables</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Filter by Stock" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low Stock</SelectItem>
          <SelectItem value="high">High Stock</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterSearch;
