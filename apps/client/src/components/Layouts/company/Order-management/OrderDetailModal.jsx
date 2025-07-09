import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const OrderDetailModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;
  const DetailItem = ({ label, value }) => (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-border">
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground col-span-2">{value || "-"}</dd>
    </div>
  );
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detail Transaksi: {order.id}</DialogTitle>
          <DialogDescription>
            Informasi lengkap untuk pesanan "{order.productName}".
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
          <dl>
            <DetailItem label="Nama Produk" value={order.productName} />
            <DetailItem label="Kategori" value={order.category} />
            <DetailItem label="Jumlah" value={order.quantity} />
            <DetailItem
              label="Total Harga"
              value={`$${order.totalPrice.toFixed(2)}`}
            />
            <DetailItem label="Penjual (Toko)" value={order.seller} />
            <DetailItem label="Pembeli" value={order.buyer} />
            <DetailItem
              label="Alamat Pengiriman"
              value={order.shippingAddress}
            />
            <DetailItem label="Jasa Pengiriman" value={order.shippingVia} />
            <DetailItem label="Metode Pembayaran" value={order.paymentVia} />
            <DetailItem
              label="Status Pesanan"
              value={
                <Badge variant={order.status.toLowerCase()}>
                  {order.status}
                </Badge>
              }
            />
          </dl>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default OrderDetailModal;
