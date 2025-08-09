import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const Timestamps = ({ product, formatDate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Timeline
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {product.createdAt && (
            <div>
              <div className="text-sm font-medium">Created</div>
              <div className="text-sm text-muted-foreground">
                {formatDate(product.createdAt)}
              </div>
            </div>
          )}

          {product.updatedAt && (
            <div>
              <div className="text-sm font-medium">Last Updated</div>
              <div className="text-sm text-muted-foreground">
                {formatDate(product.updatedAt)}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Timestamps;
