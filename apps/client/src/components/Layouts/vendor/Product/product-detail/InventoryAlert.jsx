import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const InventoryAlert = ({ totalStock }) => {
  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          <div>
            <div className="font-semibold text-orange-900">
              {totalStock === 0 ? "Out of Stock" : "Low Stock Alert"}
            </div>
            <div className="text-sm text-orange-700">
              {totalStock === 0
                ? "This product is currently out of stock"
                : `Only ${totalStock} units remaining`}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryAlert;
