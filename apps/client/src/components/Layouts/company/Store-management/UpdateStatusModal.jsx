import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const UpdateStatusModal = ({ store, isOpen, onClose, onConfirm }) => {
  const [status, setStatus] = useState(store?.status || "Active");
  const [reason, setReason] = useState("");
  useEffect(() => {
    if (store) setStatus(store.status);
  }, [store]);
  if (!isOpen || !store) return null;

  const handleConfirm = () => {
    onConfirm(store.id, status, reason);
    setReason("");
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Store Status</DialogTitle>
          <DialogDescription>
            Change status for store "{store.storeName}".
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <label htmlFor="status" className="text-sm font-medium">
              New Status
            </label>
            <Select value={status} onValueChange={(value) => setStatus(value)}>
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
                <SelectItem value="Banned">Banned</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="reason" className="text-sm font-medium">
              Reason (Required)
            </label>
            <Textarea
              id="reason"
              placeholder="Example: Store is temporarily closed..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!reason}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStatusModal;
