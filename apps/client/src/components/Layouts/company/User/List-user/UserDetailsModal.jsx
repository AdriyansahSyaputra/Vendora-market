import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const UserDetailsModal = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;
  const DetailItem = ({ label, value }) => (
    <div className="grid grid-cols-3 gap-2 py-2 border-b border-slate-100 dark:border-slate-800">
      <dt className="text-sm font-medium text-slate-500 dark:text-slate-300">
        {label}
      </dt>
      <dd className="text-sm text-slate-900 col-span-2 dark:text-slate-200">
        {value || "-"}
      </dd>
    </div>
  );
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Complete information for {user.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={
                user.avatar ||
                "https://placehold.co/80x80/E2E8F0/4A5568?text=User"
              }
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-bold">{user.name}</h3>
              <p className="text-sm text-slate-500">@{user.username}</p>
            </div>
          </div>
          <dl>
            <DetailItem label="Email" value={user.email} />
            <DetailItem label="Phone" value={user.phone} />
            <DetailItem label="Location" value={user.location} />
            <DetailItem label="Date of Birth" value={user.dob} />
            <DetailItem label="Address" value={user.address} />
            <DetailItem label="Role" value={user.role} />
            <DetailItem
              label="Total Transactions"
              value={user.totalTransactions}
            />
            <DetailItem label="Join Date" value={user.joinDate} />
            {user.role === "Seller" && (
              <>
                <DetailItem
                  label="Total Sales"
                  value={`$${user.totalSales?.toLocaleString()}`}
                />
                <DetailItem label="Store Status" value={user.storeStatus} />
              </>
            )}
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

export default UserDetailsModal;
