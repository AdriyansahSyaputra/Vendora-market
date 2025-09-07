import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DialogFooter } from "@/components/ui/dialog";
import { useCheckout } from "@/context/checkout/checkoutContext";

const mockPaymentMethods = [
  {
    group: "E-Wallet",
    methods: [
      { id: "gopay", name: "GoPay" },
      { id: "ovo", name: "OVO" },
    ],
  },
  {
    group: "Virtual Account",
    methods: [
      { id: "bca_va", name: "BCA Virtual Account" },
      { id: "bri_va", name: "BRI Virtual Account" },
    ],
  },
  { group: "Lainnya", methods: [{ id: "cod", name: "Bayar di Tempat (COD)" }] },
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
      <div className="flex-grow overflow-y-auto pr-2">
        {mockPaymentMethods.map((group) => (
          <div key={group.group} className="mb-4">
            <h3 className="text-md font-semibold mb-2">{group.group}</h3>
            <RadioGroup
              value={selectedPaymentId}
              onValueChange={setSelectedPaymentId}
              className="space-y-2"
            >
              {group.methods.map((method) => (
                <Card
                  key={method.id}
                  className={`p-3 flex items-center justify-between cursor-pointer transition-all ${
                    selectedPaymentId === method.id
                      ? "border-sky-500 ring-2 ring-sky-500"
                      : ""
                  }`}
                >
                  <label
                    htmlFor={method.id}
                    className="font-medium text-sm cursor-pointer"
                  >
                    {method.name}
                  </label>
                  <RadioGroupItem value={method.id} id={method.id} />
                </Card>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
      <DialogFooter className="mt-4 border-t border-slate-200 dark:border-slate-800 pt-4">
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
