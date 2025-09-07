import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/context/checkout/checkoutContext";
import PaymentModal from "@/components/Layouts/client/Checkout/PaymentModal";
import VoucherModal from "@/components/Layouts/client/Checkout/VoucherModal";
import ShoppingSummary from "@/components/Layouts/client/Checkout/ShoppingSummary";
import CartItemCard from "@/components/Layouts/client/Cart/CartItemCard";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { BadgeCheck } from "lucide-react";
import DesktopNavbar from "@/components/Templates/client/navbar/DesktopNavbar";
import Footer from "@/components/Templates/client/footer/Footer";
import Header from "@/components/Elements/Header";

function CartPage() {
  // ... State and handlers are mostly the same
  const navigate = useNavigate();
  const [state, dispatch] = useCheckout();
  const { cartItems, selectedItems } = state;
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleClick = () => {
    if (window.innerWidth >= 768) {
      alert("Checkout sedang diproses...");
    } else {
      // Mobile
      navigate("/checkout");
    }
  };

  const handleSelectItem = (itemId, isSelected) =>
    dispatch({
      type: "TOGGLE_ITEM_SELECTION",
      payload: { itemId, isSelected },
    });
  const handleSelectAll = (e) =>
    dispatch({ type: "TOGGLE_ALL_ITEMS", payload: e.target.checked });
  const handleQuantityChange = (itemId, quantity) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { itemId, quantity } });
  const handleRemoveItem = (itemId) =>
    dispatch({ type: "REMOVE_ITEM", payload: itemId });

  const subtotal = useMemo(
    () =>
      selectedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [selectedItems]
  );
  const allItemIdsInCart = useMemo(
    () =>
      Object.values(cartItems).flatMap((s) => s.items.map((item) => item.id)),
    [cartItems]
  );
  const isAllSelected =
    allItemIdsInCart.length > 0 &&
    selectedItems.length === allItemIdsInCart.length;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <DesktopNavbar />

      <Header title="Keranjang Saya" onBack={() => navigate(-1)} />

      <main className="container md:mx-auto md:px-4 md:py-8 md:pt-8 md:pb-8 md:space-y-16 lg:space-y-20">
        <h1 className="hidden md:block text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          Keranjang Saya
        </h1>

        <div className=" mx-auto px-2 py-6">
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            {/* ... Left Column: Product List */}
            <div className="flex-grow">
              <Card className="p-0 mb-24 lg:mb-4">
                <div className="flex items-center p-4 border-b border-slate-200 dark:border-slate-800">
                  <Checkbox
                    id="select-all"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                  <label
                    htmlFor="select-all"
                    className="ml-3 text-sm font-medium"
                  >
                    Pilih Semua ({selectedItems.length} produk)
                  </label>
                </div>
                {Object.keys(cartItems).length > 0 ? (
                  Object.entries(cartItems).map(([sellerId, sellerData]) => (
                    <div
                      key={sellerId}
                      className="border-b border-slate-200 dark:border-slate-800 last:border-b-0"
                    >
                      <div className="p-4 flex items-center gap-2">
                        <BadgeCheck
                          className={`h-5 w-5 ${
                            sellerData.isVerified
                              ? "text-sky-500"
                              : "text-slate-400"
                          }`}
                        />
                        <span className="font-semibold text-sm">
                          {sellerData.sellerName}
                        </span>
                      </div>
                      <div className="px-4 divide-y divide-slate-200 dark:divide-slate-800">
                        {sellerData.items.map((item) => (
                          <CartItemCard
                            key={item.id}
                            item={item}
                            isSelected={selectedItems.some(
                              (sel) => sel.id === item.id
                            )}
                            onCheckboxChange={handleSelectItem}
                            onQuantityChange={handleQuantityChange}
                            onRemove={handleRemoveItem}
                          />
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-slate-500">
                    Keranjang Anda kosong.
                  </div>
                )}
              </Card>
            </div>
            {/* ... Right Column: Shopping Summary (Desktop) */}
            <div className="w-full lg:w-[35%] lg:max-w-sm flex-shrink-0">
              <div className="hidden lg:block">
                <ShoppingSummary
                  subtotal={subtotal}
                  onVoucherClick={() => setIsVoucherModalOpen(true)}
                  onPaymentClick={() => setIsPaymentModalOpen(true)}
                  onCheckout={handleClick}
                />
              </div>
            </div>
          </div>
          {/* Mobile Footer */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-3 flex justify-between items-center">
            <div>
              <p className="text-xs">Total Harga</p>
              <p className="text-lg font-bold text-sky-600">
                {subtotal.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
            <Button
              onClick={() => navigate("/checkout")}
              disabled={selectedItems.length === 0}
              className="w-36"
            >
              Checkout ({selectedItems.length})
            </Button>
          </div>
          {/* Modals */}
          <Dialog
            open={isVoucherModalOpen}
            onOpenChange={setIsVoucherModalOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Pilih Voucher</DialogTitle>
                <DialogClose onClick={() => setIsVoucherModalOpen(false)} />
              </DialogHeader>
              <VoucherModal
                subtotal={subtotal}
                onClose={() => setIsVoucherModalOpen(false)}
              />
            </DialogContent>
          </Dialog>
          <Dialog
            open={isPaymentModalOpen}
            onOpenChange={setIsPaymentModalOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Pilih Metode Pembayaran</DialogTitle>
                <DialogClose onClick={() => setIsPaymentModalOpen(false)} />
              </DialogHeader>
              <PaymentModal onClose={() => setIsPaymentModalOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CartPage;
