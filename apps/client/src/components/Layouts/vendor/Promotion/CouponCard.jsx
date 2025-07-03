import { Card } from "@/components/ui/card";
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
import { MoreVertical, TicketPercent } from "lucide-react";

const CouponCard = ({ coupon, onEdit, onDelete }) => {
  return (
    <Card className="overflow-hidden bg-background shadow-sm hover:shadow-md transition-shadow">
      <div className="flex">
        {/* Bagian Kiri (Diskon) */}
        <div className="flex flex-col items-center justify-center p-4 bg-teal-100 dark:bg-teal-900/50 w-1/3">
          <TicketPercent className="h-8 w-8 text-teal-600 dark:text-teal-400" />
          <p className="text-4xl font-extrabold text-teal-700 dark:text-teal-300 mt-1">
            {coupon.discount}%
          </p>
          <p className="text-sm font-semibold text-teal-600 dark:text-teal-400">
            OFF
          </p>
        </div>

        {/* Garis Pemisah */}
        <div className="border-l-2 border-dashed border-border"></div>

        {/* Bagian Kanan (Info) */}
        <div className="relative flex-1 p-4">
          <div className="absolute top-2 right-2">
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
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the "{coupon.name}" coupon.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(coupon.id)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Badge variant="secondary">{coupon.category}</Badge>
          <h3 className="font-bold text-lg mt-2">{coupon.name}</h3>
          <p className="text-sm text-muted-foreground mt-1 h-10">
            {coupon.description}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CouponCard;
