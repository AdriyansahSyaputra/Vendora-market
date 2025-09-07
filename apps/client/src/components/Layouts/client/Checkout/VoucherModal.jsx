import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { useCheckout } from "@/context/checkout/checkoutContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const mockVouchers = [
  {
    id: "DSC15",
    type: "DISCOUNT",
    title: "Diskon 15%",
    description: "Maks. diskon Rp 100rb",
    value: 15,
    maxValue: 100000,
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
    description: "Dapatkan koin s/d 10.000",
    value: 5,
  },
];

const VoucherCard = ({ voucher, isSelected, onSelect }) => {
  return (
    <Card
      className={`p-0 overflow-hidden transition-all cursor-pointer ${
        isSelected
          ? "border-sky-500 ring-2 ring-sky-500"
          : "border-slate-200 dark:border-slate-800"
      }`}
      onClick={() => onSelect(voucher)}
    >
      <div className="flex items-start">
        {/* Bagian Kiri: Tombol Radio */}
        <div className="p-3 flex items-center">
          <RadioGroup value={isSelected ? voucher.id : ""}>
            <RadioGroupItem value={voucher.id} id={voucher.id} />
          </RadioGroup>
        </div>

        {/* Bagian Kanan: Informasi Voucher */}
        <div className="p-3 flex-grow border-l border-slate-200 dark:border-slate-800">
          <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
            {voucher.title}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {voucher.description}
          </p>
        </div>
      </div>
    </Card>
  );
};

const VoucherModal = ({ subtotal, onClose }) => {
  const [state, dispatch] = useCheckout();
  const [selectedVouchers, setSelectedVouchers] = useState(
    state.appliedVouchers
  );

  const handleSelectVoucher = (voucher) => {
    setSelectedVouchers((prev) => {
      const otherVouchers = prev.filter((v) => v.type !== voucher.type);
      const isAlreadySelected = prev.some((v) => v.id === voucher.id);
      return isAlreadySelected ? otherVouchers : [...otherVouchers, voucher];
    });
  };

  const handleApplyVouchers = () => {
    dispatch({ type: "APPLY_VOUCHERS", payload: selectedVouchers });
    onClose();
  };

  const getDiscountAmount = (voucher) => {
    if (voucher.type === "DISCOUNT") {
      const amount = subtotal * (voucher.value / 100);
      return Math.min(amount, voucher.maxValue);
    }
    return voucher.value;
  };

  return (
    <div className="flex flex-col max-h-[70vh]">
      <div className="p-1 flex-grow overflow-y-auto">
        <Card className="mb-4">
          <div className="flex space-x-2">
            <Input placeholder="Masukkan kode voucher" />
            <Button>Pakai</Button>
          </div>
        </Card>
        {["DISCOUNT", "SHIPPING", "CASHBACK"].map((type) => (
          <div key={type} className="mb-4">
            <h3 className="text-md font-semibold mb-2">{`Voucher ${
              type.charAt(0) + type.slice(1).toLowerCase()
            }`}</h3>
            <div className="space-y-3">
              {mockVouchers
                .filter((v) => v.type === type)
                .map((voucher) => (
                  <VoucherCard
                    key={voucher.id}
                    voucher={voucher}
                    isSelected={selectedVouchers.some(
                      (v) => v.id === voucher.id
                    )}
                    onSelect={handleSelectVoucher}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
      <DialogFooter className="mt-4 p-1 border-t border-slate-200 dark:border-slate-800 pt-4">
        <div className="w-full text-sm">
          {selectedVouchers.map((v) => (
            <div key={v.id} className="flex justify-between">
              <span>{v.title}</span>
              <span className="font-semibold">
                -
                {getDiscountAmount(v).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </span>
            </div>
          ))}
        </div>
        <Button className="w-full mt-2" onClick={handleApplyVouchers}>
          Gunakan
        </Button>
      </DialogFooter>
    </div>
  );
};

export default VoucherModal;
