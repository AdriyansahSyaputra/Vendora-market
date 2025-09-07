import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "@/context/checkout/CheckoutContext";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Header from "@/components/Elements/Header";

// --- Mock Data (Di aplikasi nyata, ini dari API) ---
const mockPaymentMethods = [
  {
    category: "E-Wallet",
    methods: [
      {
        id: "dana",
        name: "DANA",
        logo: "https://placehold.co/40x40/1E90FF/FFFFFF?text=DANA",
      },
      {
        id: "gopay",
        name: "GoPay",
        logo: "https://placehold.co/40x40/00BFFF/FFFFFF?text=Gopay",
      },
      {
        id: "ovo",
        name: "OVO",
        logo: "https://placehold.co/40x40/4B0082/FFFFFF?text=OVO",
      },
    ],
  },
  {
    category: "Virtual Account",
    methods: [
      {
        id: "bca_va",
        name: "BCA Virtual Account",
        logo: "https://placehold.co/40x40/0000CD/FFFFFF?text=BCA",
      },
      {
        id: "mandiri_va",
        name: "Mandiri Virtual Account",
        logo: "https://placehold.co/40x40/00008B/FFFFFF?text=MDR",
      },
      {
        id: "bri_va",
        name: "BRI Virtual Account",
        logo: "https://placehold.co/40x40/FF4500/FFFFFF?text=BRI",
      },
    ],
  },
  {
    category: "Lainnya",
    methods: [
      {
        id: "cod",
        name: "Bayar di Tempat (COD)",
        logo: "https://placehold.co/40x40/2E8B57/FFFFFF?text=COD",
      },
    ],
  },
];

// --- Komponen-Komponen Lokal ---

const PaymentMethodCard = ({ method, isSelected, onSelect }) => (
  <div
    onClick={() => onSelect(method)}
    className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
      isSelected
        ? "bg-sky-50 dark:bg-sky-900/50 border-sky-500 ring-2 ring-sky-500"
        : "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50"
    }`}
  >
    <div className="flex items-center space-x-3">
      <img
        src={method.logo}
        alt={method.name}
        className="h-8 w-8 rounded-md object-contain"
      />
      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
        {method.name}
      </span>
    </div>
    <RadioGroup value={isSelected ? method.id : ""}>
      <RadioGroupItem value={method.id} id={method.id} />
    </RadioGroup>
  </div>
);

// --- Komponen Halaman Utama ---

export default function PaymentSelectionPage() {
  const navigate = useNavigate();
  const [state, dispatch] = useCheckout();
  const { selectedPayment } = state;

  // State lokal untuk mengelola pilihan sebelum disimpan ke context
  const [currentSelection, setCurrentSelection] = useState(
    selectedPayment || null
  );

  const handleConfirmSelection = () => {
    dispatch({ type: "SELECT_PAYMENT", payload: currentSelection });
    navigate(-1); // Kembali ke halaman checkout
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header title="Metode Pembayaran" onBack={() => navigate(-1)} />

      <main className="flex-grow p-4">
        <RadioGroup
          value={currentSelection?.id || ""}
          onValueChange={(id) => {
            const newSelection = mockPaymentMethods
              .flatMap((group) => group.methods)
              .find((method) => method.id === id);
            setCurrentSelection(newSelection);
          }}
        >
          {mockPaymentMethods.map((group) => (
            <div key={group.category} className="mb-4">
              <h3 className="text-md font-semibold text-slate-800 dark:text-slate-200 mb-2">
                {group.category}
              </h3>
              <div className="space-y-2">
                {group.methods.map((method) => (
                  <PaymentMethodCard
                    key={method.id}
                    method={method}
                    isSelected={currentSelection?.id === method.id}
                    onSelect={setCurrentSelection}
                  />
                ))}
              </div>
            </div>
          ))}
        </RadioGroup>
      </main>

      <footer className="sticky bottom-0 bg-white dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 p-4">
        <Button
          className="w-full"
          onClick={handleConfirmSelection}
          disabled={!currentSelection}
        >
          Konfirmasi
        </Button>
      </footer>
    </div>
  );
}
