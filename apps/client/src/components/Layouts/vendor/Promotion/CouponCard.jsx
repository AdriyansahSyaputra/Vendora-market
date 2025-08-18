import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MoreVertical,
  Calendar,
  TrendingUp,
  ShoppingCart,
  Tag,
} from "lucide-react";
import { format } from "date-fns";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

const CouponCard = ({ coupon, onEdit, onDelete }) => {
  const discountDisplay =
    coupon.discountType === "percentage"
      ? `${coupon.discountValue}% OFF`
      : `${formatCurrency(coupon.discountValue)} OFF`;

  // Format dates
  const startDate = format(new Date(coupon.startDate), "dd MMM yyyy");
  const endDate = format(new Date(coupon.endDate), "dd MMM yyyy");
  return (
    <Card className="flex flex-col h-full bg-background shadow-sm hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div className="space-y-1">
          <CardTitle className="text-lg">{coupon.name}</CardTitle>
          <CardDescription className="font-mono text-sm tracking-wider bg-secondary text-secondary-foreground px-2 py-1 rounded">
            {coupon.code}
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={coupon.isActive ? "default" : "outline"}
            className={coupon.isActive ? "bg-green-500 text-white" : ""}
          >
            {coupon.isActive ? "Active" : "Inactive"}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEdit(coupon)}>
                Edit
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-red-500 focus:text-red-500"
                  >
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will permanently delete the "{coupon.name}"
                      coupon. This cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(coupon._id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="flex-grow space-y-4">
        <div className="p-4 rounded-lg bg-muted text-center">
          <p className="text-3xl font-bold text-primary">{discountDisplay}</p>
        </div>

        <p className="text-sm text-muted-foreground h-12">
          {coupon.description}
        </p>

        <div className="space-y-3 text-sm">
          <div className="flex items-center">
            <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>
              Category:{" "}
              <span className="font-semibold">
                {coupon.category?.name || "All Products"}
              </span>
            </span>
          </div>
          <div className="flex items-center">
            <ShoppingCart className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>
              Min. Purchase:{" "}
              <span className="font-semibold">
                {formatCurrency(coupon.minPurchaseAmount)}
              </span>
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-2 pt-4 border-t">
        <div className="flex items-center text-sm w-full justify-between">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>
              {startDate} - {endDate}
            </span>
          </div>
        </div>
        <div className="flex items-center text-sm w-full justify-between">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Usage</span>
          </div>
          <span className="font-semibold">
            {coupon.usedCount} / {coupon.usageLimit}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CouponCard;
