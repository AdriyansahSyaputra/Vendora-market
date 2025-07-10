import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

const DeleteStoreModal = ({ store, isOpen, onClose, onConfirm }) => {
  const [reason, setReason] = useState("");
  if (!isOpen || !store) return null;
  const handleConfirm = () => {
    onConfirm(store.id, reason);
    setReason("");
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this store?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will delete the store"
            {store.storeName}" permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-2">
          <label htmlFor="delete-reason" className="text-sm font-medium">
            Reason for Deletion (Required)
          </label>
          <Textarea
            id="delete-reason"
            placeholder="Example: The store is permanently closed..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel onClick={onClose}>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={!reason}>
            Yes, Delete Store
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteStoreModal;
