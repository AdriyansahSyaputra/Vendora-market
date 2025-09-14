import React, { useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Ticket, CreditCard } from "lucide-react";
import Header from "@/components/Elements/Header";
import { useSelector } from "react-redux";
import {
  selectSelectedItems,
  selectAppliedVouchers,
  selectSelectedPayment,
} from "@/features/cart/cartSlice";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);

const PriceRow = ({ label, value, isDiscount = false }) => (
  <div className="flex justify-between items-center text-sm">
    <p className="text-slate-600 dark:text-slate-400">{label}</p>
    <p
      className={
        isDiscount
          ? "text-green-600 dark:text-green-500 font-medium"
          : "text-slate-800 dark:text-slate-200 font-medium"
      }
    >
      {value}
    </p>
  </div>
);

const CheckoutRow = ({ icon, label, value, linkTo }) => (
  <Link
    to={linkTo}
    className="flex items-center justify-between py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-md px-2 -mx-2"
  >
    <div className="flex items-center space-x-3">
      {icon}
      <span className="font-medium text-slate-700 dark:text-slate-300">
        {label}
      </span>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-slate-500 dark:text-slate-400 truncate max-w-[150px]">
        {value}
      </span>
      <ChevronRight className="h-4 w-4 text-slate-400" />
    </div>
  </Link>
);

export default function CheckoutPage() {
  const navigate = useNavigate();

  const selectedItems = useSelector(selectSelectedItems);
  const appliedVouchers = useSelector(selectAppliedVouchers);
  const selectedPayment = useSelector(selectSelectedPayment);

  useEffect(() => {
    if (!selectedItems || selectedItems.length === 0) {
      navigate("/cart");
    }
  }, [selectedItems, navigate]);

  const summary = useMemo(() => {
    const subtotal = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const shippingCost = 40000;
    const shippingVoucher = appliedVouchers.find((v) => v.type === "SHIPPING");
    const discountVoucher = appliedVouchers.find((v) => v.type === "DISCOUNT");
    const shippingDiscount = shippingVoucher ? shippingVoucher.value : 0;

    let discountAmount = 0;
    if (discountVoucher) {
      const amount = subtotal * (discountVoucher.value / 100);
      const maxValue = discountVoucher.maxValue || Infinity;
      discountAmount = Math.min(amount, maxValue);
    }

    const finalTotal =
      subtotal + shippingCost - discountAmount - shippingDiscount;

    return {
      items: selectedItems,
      subtotal,
      shippingCost,
      discountAmount,
      shippingDiscount,
      finalTotal,
    };
  }, [selectedItems, appliedVouchers]);

  const handleCreateOrder = () => {
    if (!selectedPayment) {
      alert("Silakan pilih metode pembayaran terlebih dahulu");
      return;
    }

    alert("Pesanan berhasil dibuat!");
  };

  if (!selectedItems || selectedItems.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header title="Checkout" onBack={() => navigate("/cart")} />

      <main className="flex-grow p-2 sm:p-4 space-y-3">
        {/* Ringkasan Produk */}
        <Card className="p-4">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Produk Dipesan
          </h3>
          <div className="space-y-3">
            {summary.items.map((item) => (
              <div key={item._id} className="flex items-center space-x-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div className="flex-grow">
                  <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-1">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.quantity} x {formatCurrency(item.price)}
                  </p>
                </div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pilihan Voucher & Metode Pembayaran */}
        <Card className="divide-y p-4 divide-slate-200 dark:divide-slate-800">
          <CheckoutRow
            icon={<Ticket className="h-5 w-5 text-amber-500" />}
            label="Voucher"
            value={
              appliedVouchers.length > 0
                ? `${appliedVouchers.length} Voucher Terpakai`
                : "Pilih Voucher"
            }
            linkTo="/checkout/vouchers"
          />
          <CheckoutRow
            icon={<CreditCard className="h-5 w-5 text-sky-500" />}
            label="Metode Pembayaran"
            value={selectedPayment ? selectedPayment.name : "Pilih Pembayaran"}
            linkTo="/checkout/payments"
          />
        </Card>

        {/* Rincian Pembayaran */}
        <Card className="p-4">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
            Rincian Pembayaran
          </h3>
          <div className="space-y-2">
            <PriceRow
              label="Subtotal Produk"
              value={formatCurrency(summary.subtotal)}
            />
            <PriceRow
              label="Biaya Pengiriman"
              value={formatCurrency(summary.shippingCost)}
            />
            {summary.discountAmount > 0 && (
              <PriceRow
                label="Diskon Voucher"
                value={`-${formatCurrency(summary.discountAmount)}`}
                isDiscount
              />
            )}
            {summary.shippingDiscount > 0 && (
              <PriceRow
                label="Diskon Ongkir"
                value={`-${formatCurrency(summary.shippingDiscount)}`}
                isDiscount
              />
            )}
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 bg-white dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Total Bayar
            </p>
            <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {formatCurrency(summary.finalTotal)}
            </p>
          </div>
          <Button
            className="w-40"
            onClick={handleCreateOrder}
            disabled={!selectedPayment}
          >
            Buat Pesanan
          </Button>
        </div>
      </footer>
    </div>
  );
}
