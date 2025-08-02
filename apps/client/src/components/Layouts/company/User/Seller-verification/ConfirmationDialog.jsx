import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ConfirmationDialog = ({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  action,
  reason,
  onReasonChange,
}) => {
  const isRejectAction = action === "reject";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        {/* Tampilkan Textarea hanya jika aksinya adalah 'reject' */}
        {isRejectAction && (
          <div className="grid gap-2 pt-2">
            <Label htmlFor="rejectionReason" className="font-semibold">
              Rejection Reason (Required)
            </Label>
            <Textarea
              id="rejectionReason"
              placeholder="Provide a clear reason for rejection..."
              value={reason}
              onChange={(e) => onReasonChange(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isRejectAction && (!reason || reason.trim() === "")}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ConfirmationDialog;
