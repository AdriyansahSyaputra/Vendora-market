import { useState } from "react";
import Sidebar from "@/components/Templates/company/sidebar/Sidebar";
import Topbar from "@/components/Templates/company/topbar/Topbar";
import { Helmet } from "react-helmet-async";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VoucherCard from "@/components/Layouts/company/Advertisement/Voucher/VoucherCard";
import AddEditVoucherModal from "@/components/Layouts/company/Advertisement/Voucher/AddEditVoucherModal";
import ConfirmationDialog from "@/components/Layouts/company/Advertisement/Ads/ConfirmationDialog";
import { Button } from "@/components/ui/button";

const initialVouchers = [
  {
    id: 1,
    name: "Free Shipping",
    imageUrl: "https://placehold.co/100x100/0ea5e9/ffffff?text=FREE",
    category: "Shipping",
    discount: "100%",
    validFrom: "2025-07-01",
    validUntil: "2025-07-31",
  },
  {
    id: 2,
    name: "10% Off Electronics",
    imageUrl: "https://placehold.co/100x100/f97316/ffffff?text=10%25",
    category: "Electronics",
    discount: "10%",
    validFrom: "2025-07-05",
    validUntil: "2025-07-15",
  },
  {
    id: 3,
    name: "New User Bonus",
    imageUrl: "https://placehold.co/100x100/84cc16/ffffff?text=NEW",
    category: "General",
    discount: "$5",
    validFrom: "2025-01-01",
    validUntil: "2025-12-31",
  },
  {
    id: 4,
    name: "Fashion Friday",
    imageUrl: "https://placehold.co/100x100/db2777/ffffff?text=FF",
    category: "Fashion",
    discount: "15%",
    validFrom: "2025-07-11",
    validUntil: "2025-07-11",
  },
];
const voucherCategories = [
  "Shipping",
  "Electronics",
  "Fashion",
  "General",
  "Food",
  "Books",
];

const VoucherPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [vouchers, setVouchers] = useState(initialVouchers);
  const [modalMode, setModalMode] = useState(null);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleSaveVoucher = (voucherData) => {
    if (modalMode === "edit") {
      setVouchers(
        vouchers.map((v) => (v.id === voucherData.id ? voucherData : v))
      );
    } else {
      const newVoucher = { ...voucherData, id: Date.now() };
      setVouchers([newVoucher, ...vouchers]);
    }
  };
  const handleDeleteVoucher = () => {
    setVouchers(vouchers.filter((v) => v.id !== selectedVoucher.id));
    setDeleteConfirmOpen(false);
    setSelectedVoucher(null);
  };

  return (
    <>
      <Helmet title="All Product" />

      <div className="flex min-h-screen max-w-full bg-muted/40">
        {/* Sidebar Desktop */}
        <Sidebar isCollapsed={isCollapsed} />

        <div
          className={`flex flex-col w-full transition-all duration-300 ${
            isCollapsed ? "md:ml-20" : "md:ml-64"
          }`}
        >
          <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

          <main className="flex-1 p-4 sm:px-6 sm:py-6 space-y-4 ">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>
                  Manage, filter, and view all your company users.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 md:gap-8">
                  <Button
                    onClick={() => {
                      setSelectedVoucher(null);
                      setModalMode("add");
                    }}
                  >
                    Add New Voucher
                  </Button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {vouchers.map((voucher) => (
                      <VoucherCard
                        key={voucher.id}
                        voucher={voucher}
                        onEdit={() => {
                          setSelectedVoucher(voucher);
                          setModalMode("edit");
                        }}
                        onDelete={() => {
                          setSelectedVoucher(voucher);
                          setDeleteConfirmOpen(true);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>

        <AddEditVoucherModal
          isOpen={modalMode !== null}
          onClose={() => setModalMode(null)}
          onSave={handleSaveVoucher}
          initialData={modalMode === "edit" ? selectedVoucher : null}
          voucherCategories={voucherCategories}
        />
        <ConfirmationDialog
          open={isDeleteConfirmOpen}
          onOpenChange={setDeleteConfirmOpen}
          onConfirm={handleDeleteVoucher}
          title="Are you sure?"
          description={`This will permanently delete the "${selectedVoucher?.name}" voucher. This action cannot be undone.`}
        />
      </div>
    </>
  );
};

export default VoucherPage;
