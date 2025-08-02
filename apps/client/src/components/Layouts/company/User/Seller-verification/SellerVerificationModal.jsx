import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, FileText, Link2 } from "lucide-react";

const DetailItem = ({ label, value, children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-slate-100 dark:border-slate-800 last:border-b-0">
    <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
      {label}
    </dt>
    <dd className="text-sm text-slate-900 col-span-2 dark:text-slate-50">
      {value || children || "-"}
    </dd>
  </div>
);

const formatAddress = (address, location) => {
  if (!address) return "No address provided.";
  const parts = [
    address.street,
    location === "ID" && address.village,
    location === "ID" && address.district,
    address.city,
    address.postalCode,
  ];
  return parts.filter(Boolean).join(", ");
};

const DocumentLink = ({ label, url }) => (
  <DetailItem label={label}>
    {url ? (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-blue-500 hover:underline font-medium"
      >
        <Link2 className="h-4 w-4" />
        View Document
      </a>
    ) : (
      <span className="text-muted-foreground">- Not provided -</span>
    )}
  </DetailItem>
);

const SellerVerificationModal = ({ request, isOpen, onClose, onAction }) => {
  if (!isOpen || !request) return null;
  const fullAddress = formatAddress(request.address, request.location);
  const isIndonesia = request.location === "ID";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Seller Verification Request</DialogTitle>
          <DialogDescription>
            Review the details for the application to join as a seller.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto pr-4 space-y-6 my-4">
          {/* Bagian Informasi Pemohon & Toko */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{request.storeName}</CardTitle>
              <CardDescription>Submitted by {request.fullName}</CardDescription>
            </CardHeader>
            <CardContent>
              <dl>
                <DetailItem label="Applicant Email" value={request.email} />
                <DetailItem label="Applicant Phone" value={request.phone} />
                <DetailItem
                  label="Store Description"
                  value={request.storeDescription}
                />
              </dl>
            </CardContent>
          </Card>

          {/* Bagian Lokasi & Cakupan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <MapPin className="h-5 w-5" /> Location & Coverage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl>
                <DetailItem label="Business Location">
                  <Badge variant="outline">{request.location}</Badge>
                </DetailItem>
                <DetailItem label="Full Address" value={fullAddress} />
                <DetailItem label="Operating Area(s)">
                  <div className="flex flex-wrap gap-2">
                    {request.operatingArea?.map((area) => (
                      <Badge key={area} variant="secondary">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </DetailItem>
              </dl>
            </CardContent>
          </Card>

          {/* Bagian Detail Bisnis & Dokumen */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="h-5 w-5" /> Business & Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl>
                <DetailItem label="Product Categories">
                  <div className="flex flex-wrap gap-2">
                    {request.categories?.map((cat) => (
                      <Badge key={cat} variant="secondary">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </DetailItem>
                <Separator className="my-4" />
                {isIndonesia ? (
                  <>
                    <DocumentLink
                      label="National ID (KTP)"
                      url={request.documents?.ktp}
                    />
                    <DocumentLink
                      label="Tax ID (NPWP)"
                      url={request.documents?.npwp}
                    />
                  </>
                ) : (
                  <>
                    <DocumentLink
                      label="Passport"
                      url={request.documents?.passport}
                    />
                    <DocumentLink
                      label="Business License"
                      url={request.documents?.businessLicense}
                    />
                  </>
                )}
              </dl>
            </CardContent>
          </Card>
        </div>

        {request.status === "pending" ? (
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => onAction("reject", request._id)}
            >
              Reject
            </Button>
            <Button onClick={() => onAction("approve", request._id)}>
              Approve
            </Button>
          </DialogFooter>
        ) : (
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SellerVerificationModal;
