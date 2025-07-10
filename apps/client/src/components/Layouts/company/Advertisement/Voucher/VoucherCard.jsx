import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EllipsisVertical } from "lucide-react";

const VoucherCard = ({ voucher, onEdit, onDelete }) => {
  return (
    <Card className="flex flex-col relative">
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => onEdit(voucher)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => onDelete(voucher)}
              className="text-destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CardContent className="flex-grow flex flex-col items-center justify-center text-center pt-6">
        <img
          src={voucher.imageUrl}
          alt={voucher.name}
          className="w-20 h-20 rounded-lg object-cover mb-4"
        />
        <h3 className="font-semibold text-lg">{voucher.name}</h3>
        <Badge className="my-2">{voucher.category}</Badge>
        <p className="text-2xl font-bold text-primary">{voucher.discount}</p>
      </CardContent>
      <div className="p-4 border-t text-center text-xs text-muted-foreground">
        <p>
          Valid: {voucher.validFrom} - {voucher.validUntil}
        </p>
      </div>
    </Card>
  );
};

export default VoucherCard;
