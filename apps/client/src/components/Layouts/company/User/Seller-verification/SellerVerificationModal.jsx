import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const SellerVerificationModal = ({ request, isOpen, onClose, onAction }) => {
  if (!isOpen || !request) return null;
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Seller Verification Request</DialogTitle>
          <DialogDescription>
            Details for request ID: {request.id}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
          <dl>
            <DetailItem label="Applicant Name" value={request.name} />
            <DetailItem label="Email" value={request.email} />
            <DetailItem label="Phone" value={request.phone} />
            <DetailItem label="Store Name" value={request.storeName} />
            <DetailItem label="Store Description" value={request.description} />
            <DetailItem label="Store Address" value={request.storeAddress} />
            <DetailItem label="Bank Account" value={request.bankAccount} />
            <DetailItem
              label="NPWP Document"
              value={
                <a
                  href={request.npwpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Document
                </a>
              }
            />
            <DetailItem
              label="KTP Document"
              value={
                <a
                  href={request.ktpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Document
                </a>
              }
            />
          </dl>
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => onAction("reject", request.id)}
          >
            Reject
          </Button>
          <Button onClick={() => onAction("accept", request.id)}>Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default SellerVerificationModal;
