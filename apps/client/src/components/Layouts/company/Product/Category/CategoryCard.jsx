import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MoreVertical } from "lucide-react";

const CategoryCard = ({ category, onEdit, onDelete }) => {
  const formattedDate = useMemo(() => {
    const date = new Date(category.createdAt);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [category.createdAt]);

  const statusClass =
    category.status === "Active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  return (
    <Card className="relative">
      <div className="absolute top-4 right-4 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => onEdit(category)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => onDelete(category)}
              className="text-red-600 focus:text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CardHeader className="space-y-2">
        <CardTitle className="text-lg">{category.name}</CardTitle>
        <span
          className={cn(
            "px-2 py-0.5 text-xs font-semibold rounded-full w-fit",
            statusClass
          )}
        >
          {category.status}
        </span>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-slate-600">{category.description}</p>
      </CardContent>

      <CardFooter>
        <p className="text-xs text-slate-400">Created on: {formattedDate}</p>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;