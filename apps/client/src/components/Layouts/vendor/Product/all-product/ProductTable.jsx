import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Edit,
  Eye,
  Trash2,
  Star,
  Package,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

// Utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatNumber = (number) => {
  return new Intl.NumberFormat("id-ID").format(number);
};

const calculateTotalStock = (product) => {
  if (product.variations && product.variations.length > 0) {
    return product.variations.reduce(
      (total, variation) => total + variation.stock,
      0
    );
  }
  return product.stock || 0;
};

const getStockStatus = (stock) => {
  if (stock === 0) return { variant: "destructive", label: "Out of Stock" };
  if (stock < 10) return { variant: "destructive", label: "Low Stock" };
  if (stock < 50) return { variant: "secondary", label: "Medium Stock" };
  return { variant: "default", label: "In Stock" };
};

const getStatusBadge = (status) => {
  const statusConfig = {
    active: { variant: "default", label: "Active" },
    inactive: { variant: "secondary", label: "Inactive" },
    draft: { variant: "outline", label: "Draft" },
  };
  return statusConfig[status] || statusConfig.draft;
};

const ProductTable = ({
  currentProducts,
  currentPage,
  handleEditClick,
  handleViewProduct,
  handleDeleteProduct,
  totalItems,
  loading,
}) => {
  const [deletingId, setDeletingId] = useState(null);

  const onDeleteClick = async (product) => {
    setDeletingId(product._id);
    try {
      await handleDeleteProduct(product._id);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading && currentProducts.length === 0) {
    return (
      <div className="rounded-md border">
        <div className="p-8 text-center">
          <Package className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  if (currentProducts.length === 0) {
    return (
      <div className="rounded-md border">
        <div className="p-8 text-center">
          <Package className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-semibold text-foreground">
            No products found
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Get started by creating your first product.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[60px] font-semibold">No.</TableHead>
              <TableHead className="w-[100px] hidden md:table-cell font-semibold">
                Image
              </TableHead>
              <TableHead className="min-w-[200px] font-semibold">
                Product Details
              </TableHead>
              <TableHead className="hidden lg:table-cell w-[120px] font-semibold">
                Category
              </TableHead>
              <TableHead className="w-[120px] font-semibold hidden lg:table-cell">
                Price
              </TableHead>
              <TableHead className="w-[100px] font-semibold hidden lg:table-cell">
                Stock
              </TableHead>
              <TableHead className="hidden md:table-cell w-[80px] font-semibold">
                Sold
              </TableHead>
              <TableHead className="hidden lg:table-cell w-[100px] font-semibold">
                Status
              </TableHead>
              <TableHead className="w-[70px] font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProducts.map((product, index) => {
              const totalStock = calculateTotalStock(product);
              const stockStatus = getStockStatus(totalStock);
              const statusBadge = getStatusBadge(product.status);
              const discountedPrice = product.discount
                ? product.price - (product.price * product.discount) / 100
                : product.price;

              return (
                <TableRow
                  key={product._id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-medium text-center">
                    {(currentPage - 1) * totalItems + index + 1}
                  </TableCell>

                  {/* Product Image */}
                  <TableCell className="hidden md:table-cell">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={
                          product.images?.[0] ||
                          "https://placehold.co/100x100/e2e8f0/64748b?text=No+Image"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/100x100/e2e8f0/64748b?text=Error";
                        }}
                      />
                      {product.isPromo && (
                        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 py-0.5 rounded-bl">
                          -{product.discount}%
                        </div>
                      )}
                    </div>
                  </TableCell>

                  {/* Product Details */}
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-sm leading-tight line-clamp-2">
                        {product.name}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {product.averageRating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{product.averageRating}</span>
                            <span>({product.totalReviews})</span>
                          </div>
                        )}
                      </div>
                      {/* Show on mobile only */}
                      <div className="md:hidden">
                        <Badge
                          variant={stockStatus.variant}
                          className="text-xs"
                        >
                          {totalStock}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>

                  {/* Category - Hidden on mobile */}
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-sm text-muted-foreground">
                      {product.category || "Uncategorized"}
                    </span>
                  </TableCell>

                  {/* Price */}
                  <TableCell className="hidden lg:table-cell">
                    <div className="space-y-1">
                      <div className="font-semibold text-sm">
                        {formatCurrency(discountedPrice)}
                      </div>
                      {product.discount > 0 && (
                        <div className="text-xs text-muted-foreground line-through">
                          {formatCurrency(product.price)}
                        </div>
                      )}
                    </div>
                  </TableCell>

                  {/* Stock - Hidden on mobile */}
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={stockStatus.variant} className="text-xs">
                      {formatNumber(totalStock)}
                    </Badge>
                    {product.variations && product.variations.length > 0 && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {product.variations.length} variants
                      </div>
                    )}
                  </TableCell>

                  {/* Sold Count */}
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span className="font-medium">
                        {formatNumber(product.soldCount)}
                      </span>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant={statusBadge.variant} className="text-xs">
                      {statusBadge.label}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-muted"
                          disabled={deletingId === product._id}
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={() => handleViewProduct(product)}
                          className="cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Product
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleEditClick(product)}
                          className="cursor-pointer"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Product
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                              className="text-red-600 focus:text-red-600 cursor-pointer"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Product
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Product
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{product.name}
                                "? This action cannot be undone and will
                                permanently remove the product from your store.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() => onDeleteClick(product)}
                                disabled={deletingId === product._id}
                              >
                                {deletingId === product._id
                                  ? "Deleting..."
                                  : "Delete"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductTable;
