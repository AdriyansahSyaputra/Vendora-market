import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

const SearchFilter = ({
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
  dateFilter,
  setDateFilter,
  roles,
}) => {
  return (
    <div className="p-4 flex flex-col md:flex-row gap-4">
      <Input
        placeholder="Cari aktivitas atau pengguna..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:flex gap-4">
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih Peran" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Semua Peran</SelectItem>
            {roles.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default SearchFilter;
