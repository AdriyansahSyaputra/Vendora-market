import { Button } from "@/components/ui/button";
import CategoryFormDialog from "./CategoryFormDialog";
import { Edit2, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
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
import { MoreVertical } from "lucide-react";

const CategoryCard = ({ category, onEdit, onDelete }) => {
  const formattedDate = new Date(category.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <Card className="relative group hover:shadow-md transition-shadow">
      <div className="absolute top-4 right-4 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <CategoryFormDialog
              onSubmit={onEdit}
              initialData={category}
              trigger={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
              }
            />
            <DeleteConfirmationDialog
              categoryName={category.name}
              categoryId={category._id}
              onConfirm={onDelete}
              trigger={
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              }
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CardHeader className="pr-12">
        <CardTitle className="text-lg">{category.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {category.description || "No description provided"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          Created: {formattedDate}
        </p>
      </CardContent>

      <CardFooter>
        <p className="text-sm font-semibold">
          {category.productsCount || 0} Products
        </p>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
