import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EllipsisVertical, Calendar, ShoppingCart, Tag } from "lucide-react";
import { format } from "date-fns";

const voucherTypeLabels = {
  product_discount: "Product Discount",
  shipping_discount: "Shipping",
  cashback: "Cashback",
};

const formatAbbreviatedCurrency = (value) => {
  if (value >= 1_000_000) {
    return `Rp${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}jt`; // 1.5jt atau 1jt
  }
  if (value >= 1_000) {
    return `Rp${(value / 1_000).toFixed(0)}rb`; // 50rb
  }
  return `Rp${value}`;
};

const VoucherCard = ({ voucher, onEdit, onDelete }) => {
  // Menentukan tampilan diskon secara dinamis
  const discountDisplay =
    voucher.discountType === "percentage"
      ? `${voucher.discountValue}%`
      : formatAbbreviatedCurrency(voucher.discountValue);

  // Memformat tanggal
  const startDate = format(new Date(voucher.startDate), "dd MMM");
  const endDate = format(new Date(voucher.endDate), "dd MMM yyyy");

  // Menentukan status berdasarkan tanggal
  const today = new Date();
  const isActive =
    new Date(voucher.startDate) <= today && today <= new Date(voucher.endDate);

  return (
    <Card className="overflow-hidden bg-background shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="flex h-full">
        {/* Bagian Kiri (Ikon & Diskon) */}
        <div className="flex flex-col items-center justify-center p-4 bg-primary/10 w-[120px] text-center">
          <img
            src={
              voucher.image ||
              "https://placehold.co/100x100/cccccc/ffffff?text=ICON"
            }
            alt={voucher.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
          />
          <p className="text-2xl lg:text-3xl font-extrabold text-primary mt-2">
            {discountDisplay}
          </p>
          <p className="text-sm font-semibold text-primary/80">OFF</p>
        </div>

        <div className="border-l-2 border-dashed border-border" />

        {/* Bagian Kanan (Info Detail) */}
        <div className="relative flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <Badge variant="secondary">
                {voucherTypeLabels[voucher.voucherType] || "General"}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 -mt-2 -mr-2 flex-shrink-0"
                  >
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

            <h3 className="font-bold text-base mt-1">{voucher.name}</h3>
            <p className="font-mono text-xs tracking-wider text-muted-foreground">
              {voucher.code}
            </p>

            <div className="text-xs text-muted-foreground mt-3 space-y-1">
              <div className="flex items-center">
                <ShoppingCart className="h-3 w-3 mr-2" />
                <span>
                  Min. {formatAbbreviatedCurrency(voucher.minPurchaseAmount)}
                </span>
              </div>
              <div className="flex items-center">
                <Tag className="h-3 w-3 mr-2" />
                <span>Limit: {voucher.usageLimit.toLocaleString("id-ID")}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground mt-3 pt-2 border-t">
            <Badge
              variant={isActive ? "default" : "outline"}
              className={`h-5 px-1.5 text-xs ${
                isActive
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {isActive ? "ACTIVE" : "INACTIVE"}
            </Badge>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1.5" />
              <span>
                {startDate} - {endDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VoucherCard;
