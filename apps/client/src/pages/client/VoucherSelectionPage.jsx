import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "@/context/checkout/CheckoutContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import Header from "@/components/Elements/Header";
import { Ticket, CheckCircle, ArrowLeft } from "lucide-react";

// --- Mock Data (Di aplikasi nyata, ini dari API) ---
const mockVouchers = [
  {
    id: "DSC10",
    type: "DISCOUNT",
    title: "Diskon 10%",
    description: "Min. belanja Rp 200rb",
    value: 10,
  },
  {
    id: "DSC15",
    type: "DISCOUNT",
    title: "Diskon 15%",
    description: "Min. belanja Rp 500rb, maks. diskon Rp 100rb",
    value: 15,
  },
  {
    id: "SHIP40",
    type: "SHIPPING",
    title: "Gratis Ongkir",
    description: "Potongan s/d Rp 40.000",
    value: 40000,
  },
  {
    id: "CB5",
    type: "CASHBACK",
    title: "Cashback 5%",
    description: "Dapatkan koin cashback s/d 10.000",
    value: 5,
  },
];

// --- Komponen-Komponen Lokal ---

const VoucherCard = ({ voucher, isSelected, onSelect }) => {
  const getIconColor = (type) => {
    switch (type) {
      case "DISCOUNT":
        return "text-red-500";
      case "SHIPPING":
        return "text-green-500";
      case "CASHBACK":
        return "text-amber-500";
      default:
        return "text-slate-500";
    }
  };

  return (
    <Card
      className={`p-0 overflow-hidden transition-all ${
        isSelected ? "border-sky-500 ring-2 ring-sky-500" : ""
      }`}
      onClick={() => onSelect(voucher)}
    >
      <div className="flex items-start">
        <div
          className={`flex-shrink-0 w-16 h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 ${getIconColor(
            voucher.type
          )}`}
        >
          <Ticket className="h-8 w-8" />
        </div>
        <div className="p-3 flex-grow">
          <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
            {voucher.title}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {voucher.description}
          </p>
        </div>
        <div className="p-3 flex items-center">
          <RadioGroup value={isSelected ? voucher.id : ""}>
            <RadioGroupItem value={voucher.id} id={voucher.id} />
          </RadioGroup>
        </div>
      </div>
    </Card>
  );
};

// --- Komponen Halaman Utama ---

export default function VoucherSelectionPage() {
  const navigate = useNavigate();
  const [state, dispatch] = useCheckout();
  const { appliedVouchers } = state;

  // State lokal untuk mengelola pilihan sebelum disimpan ke context
  const [selectedVouchers, setSelectedVouchers] = useState(
    appliedVouchers || []
  );

  const handleSelectVoucher = (voucher) => {
    setSelectedVouchers((prev) => {
      // Hapus voucher lain dengan tipe yang sama
      const otherVouchers = prev.filter((v) => v.type !== voucher.type);

      // Cek apakah voucher yang diklik sudah terpilih
      const isAlreadySelected = prev.some((v) => v.id === voucher.id);

      if (isAlreadySelected) {
        // Jika sudah terpilih, batalkan pilihan (hapus dari array)
        return otherVouchers;
      } else {
        // Jika belum, tambahkan voucher baru
        return [...otherVouchers, voucher];
      }
    });
  };

  const handleApplyVouchers = () => {
    dispatch({ type: "APPLY_VOUCHERS", payload: selectedVouchers });
    navigate(-1); // Kembali ke halaman checkout
  };

  const renderVoucherSection = (type, title) => {
    const vouchersOfType = mockVouchers.filter((v) => v.type === type);
    if (vouchersOfType.length === 0) return null;

    return (
      <div className="mb-4">
        <h3 className="text-md font-semibold text-slate-800 dark:text-slate-200 mb-2">
          {title}
        </h3>
        <div className="space-y-3">
          {vouchersOfType.map((voucher) => (
            <VoucherCard
              key={voucher.id}
              voucher={voucher}
              isSelected={selectedVouchers.some((v) => v.id === voucher.id)}
              onSelect={handleSelectVoucher}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header title="Pilih Voucher" onBack={() => navigate(-1)} />

      <main className="flex-grow p-4">
        <Card className="mb-4">
          <p className="text-sm font-medium mb-2 text-slate-800 dark:text-slate-200">
            Masukkan Kode Voucher
          </p>
          <div className="flex space-x-2">
            <Input placeholder="Contoh: PROMOHEMAT" className="flex-grow" />
            <Button>Pakai</Button>
          </div>
        </Card>

        {renderVoucherSection("DISCOUNT", "Voucher Diskon")}
        {renderVoucherSection("SHIPPING", "Voucher Gratis Ongkir")}
        {renderVoucherSection("CASHBACK", "Voucher Cashback")}
      </main>

      <footer className="sticky bottom-0 bg-white dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 p-4">
        <Button className="w-full" onClick={handleApplyVouchers}>
          Gunakan
        </Button>
      </footer>
    </div>
  );
}
