import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Package } from "lucide-react";

const CategoryCard = ({ category, onEditClick, onDeleteClick }) => {
  const formattedDate = new Date(category.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <Card className="flex flex-col h-full bg-white dark:bg-slate-800/50 rounded-xl shadow-sm hover:shadow-lg dark:hover:shadow-slate-700/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-slate-200 dark:border-slate-800">
      {/* Header dengan Judul dan Menu Aksi */}
      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div className="flex-1 pr-4">
          <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            {category.name}
          </CardTitle>
          <CardDescription className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
            {category.description || "No description provided."}
          </CardDescription>
        </div>
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
            >
              <DropdownMenuItem
                onSelect={onEditClick}
                className="hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                <Edit2 className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={onDeleteClick}
                className="text-red-500 focus:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      {/* Spacer untuk mendorong footer ke bawah */}
      <div className="flex-grow"></div>

      {/* Footer dengan Statistik */}
      <CardFooter className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Package className="h-4 w-4 text-sky-500" />
          <span>{category.productsCount || 0} Products</span>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          {formattedDate}
        </p>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
