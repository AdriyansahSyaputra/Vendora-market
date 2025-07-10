import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ReputationStars from "./ReputationStars";

const StoreDetailModal = ({ store, isOpen, onClose }) => {
  if (!isOpen || !store) return null;
  const StatItem = ({ label, value }) => (
    <div className="p-4 bg-accent/50 rounded-lg text-center">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="flex flex-col items-center text-center border-b border-border pb-4">
          <img
            src={store.profilePic}
            alt={store.storeName}
            className="w-24 h-24 rounded-full mb-4 ring-2 ring-primary ring-offset-2 ring-offset-background"
          />
          <DialogTitle className="text-2xl">{store.storeName}</DialogTitle>
          <DialogDescription>
            Manage by {store.sellerName} • Joined {store.joinDate}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatItem
              label="Reputation"
              value={<ReputationStars rating={store.reputation} />}
            />
            <StatItem
              label="Total Sales"
              value={store.salesStats.totalSales.toLocaleString()}
            />
            <StatItem
              label="Total Profit"
              value={`Rp ${store.salesStats.totalProfit.toLocaleString()}`}
            />
            <StatItem label="Total Product" value={store.products} />
          </div>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Store Status</dt>
              <dd>
                <Badge variant={store.status.toLowerCase()}>
                  {store.status}
                </Badge>
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Location</dt>
              <dd>{store.location}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-muted-foreground">Full Address</dt>
              <dd className="text-sm">{store.fullAddress}</dd>
            </div>
          </dl>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StoreDetailModal;
