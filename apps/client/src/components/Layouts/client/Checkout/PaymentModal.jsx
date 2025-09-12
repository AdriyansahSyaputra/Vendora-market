import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DialogFooter } from "@/components/ui/dialog";
import { useCheckout } from "@/context/checkout/checkoutContext";
import { CheckCircle } from "lucide-react";

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

const PaymentModal = ({ onClose }) => {
  const [state, dispatch] = useCheckout();
  const [selectedPaymentId, setSelectedPaymentId] = useState(
    state.selectedPayment?.id
  );

  const handleConfirm = () => {
    const selected = mockPaymentMethods
      .flatMap((g) => g.methods)
      .find((m) => m.id === selectedPaymentId);
    dispatch({ type: "SELECT_PAYMENT", payload: selected });
    onClose();
  };

  return (
    <div className="flex flex-col max-h-[70vh]">
      <div className="flex-grow overflow-y-auto p-1">
        {" "}
        {mockPaymentMethods.map((group) => (
          <div key={group.category} className="mb-4">
            <h3 className="text-md font-semibold mb-3 px-2 text-slate-800 dark:text-slate-200">
              {group.category}
            </h3>
            <RadioGroup
              value={selectedPaymentId}
              onValueChange={setSelectedPaymentId}
            >
              {group.methods.map((method) => (
                <Card
                  key={method.id}
                  onClick={() => setSelectedPaymentId(method.id)}
                  className={`
                    p-4 flex items-center justify-between cursor-pointer transition-all duration-200 ease-in-out 
                    hover:bg-slate-50 dark:hover:bg-slate-800/50
                    ${
                      selectedPaymentId === method.id
                        ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20 ring-2 ring-sky-500"
                        : "border-slate-200 dark:border-slate-800"
                    }
                  `}
                >
                  <label
                    htmlFor={method.id}
                    className="flex items-center gap-4 font-medium text-sm cursor-pointer text-slate-800 dark:text-slate-200 flex-grow"
                  >
                    <img
                      src={method.logo}
                      alt={method.name}
                      className="h-7 rounded-sm object-contain"
                    />
                    <span>{method.name}</span>
                  </label>

                  {selectedPaymentId === method.id ? (
                    <CheckCircle className="h-5 w-5 text-sky-500" />
                  ) : (
                    <RadioGroupItem value={method.id} id={method.id} />
                  )}
                </Card>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
      <DialogFooter className="mt-4 border-t border-slate-200 dark:border-slate-800 pt-4 px-1">
        <Button
          className="w-full"
          onClick={handleConfirm}
          disabled={!selectedPaymentId}
        >
          Konfirmasi
        </Button>
      </DialogFooter>
    </div>
  );
};

export default PaymentModal;
