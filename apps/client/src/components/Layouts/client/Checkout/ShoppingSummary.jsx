import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ticket, CreditCard } from "lucide-react";
import { useSelector } from "react-redux";
import {
  selectAppliedVouchers,
  selectSelectedPayment,
} from "@/features/cart/cartSlice";

const ShoppingSummary = ({
  subtotal,
  onVoucherClick,
  onPaymentClick,
  onCheckout,
  selectedItemCount,
}) => {
  const appliedVouchers = useSelector(selectAppliedVouchers);
  const selectedPayment = useSelector(selectSelectedPayment);

  const totalDiscount = useMemo(() => {
    return appliedVouchers.reduce((acc, voucher) => {
      if (voucher.type === "DISCOUNT") {
        const amount = subtotal * (voucher.value / 100);
        return acc + Math.min(amount, voucher.maxValue);
      }
      return acc;
    }, 0);
  }, [appliedVouchers, subtotal]);

  const shippingDiscount = useMemo(() => {
    const shippingVoucher = appliedVouchers.find((v) => v.type === "SHIPPING");
    return shippingVoucher ? shippingVoucher.value : 0;
  }, [appliedVouchers]);

  const shippingCost = 40000; // Mock
  const finalTotal = subtotal + shippingCost - shippingDiscount - totalDiscount;

  return (
    <Card className="lg:sticky lg:top-24 p-4">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
        Ringkasan Belanja
      </h2>
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={onVoucherClick}
        >
          <div className="flex items-center gap-2">
            {" "}
            <Ticket className="h-4 w-4" />{" "}
            {appliedVouchers.length > 0
              ? `${appliedVouchers.length} Voucher Digunakan`
              : "Pilih Voucher"}{" "}
          </div>
          <span className="text-xs text-sky-500">
            {appliedVouchers.length > 0 ? "Lihat" : ">"}
          </span>
        </Button>
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={onPaymentClick}
        >
          <div className="flex items-center gap-2">
            {" "}
            <CreditCard className="h-4 w-4" /> Metode Pembayaran{" "}
          </div>
          <span className="text-xs">
            {selectedPayment ? selectedPayment.name : "Pilih"}
          </span>
        </Button>
      </div>
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
          <span className="font-medium">
            {subtotal.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">
            Ongkos Kirim
          </span>
          <span className="font-medium">
            {shippingCost.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </span>
        </div>
        {shippingDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Diskon Ongkir</span>
            <span>
              -
              {shippingDiscount.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </span>
          </div>
        )}
        {totalDiscount > 0 && (
          <div className="flex justify-between text-red-600">
            <span>Diskon Produk</span>
            <span>
              -
              {totalDiscount.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </span>
          </div>
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <span className="text-base font-semibold">Total</span>
        <span className="text-xl font-bold text-sky-600 dark:text-sky-500">
          {finalTotal.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </span>
      </div>
      <Button className="w-full mt-6" size="lg" onClick={onCheckout}>
        Checkout ({selectedItemCount})
      </Button>
    </Card>
  );
};

export default ShoppingSummary;
