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
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { PlusCircle } from "lucide-react";

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

const voucherTypes = [
  { value: "product_discount", label: "Product Discount" },
  { value: "shipping_discount", label: "Shipping Discount" },
  { value: "cashback", label: "Cashback" },
];

const VoucherPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [vouchers, setVouchers] = useState(initialVouchers);
  const [editingVoucher, setEditingVoucher] = useState(null);
  const [voucherToDelete, setVoucherToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddNew = () => {
    setEditingVoucher(null);
    setIsModalOpen(true);
  };

  const handleEdit = (voucher) => {
    setEditingVoucher(voucher);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = (voucher) => {
    setVoucherToDelete(voucher);
  };

  const handleSaveVoucher = (voucherData) => {
    let imageUrl = editingVoucher?.image; 
    if (voucherData.image instanceof File) {
      imageUrl = URL.createObjectURL(voucherData.image);
      console.log("New image file to upload:", voucherData.image);
    }

    const finalVoucherData = { ...voucherData, image: imageUrl };

    if (editingVoucher) {
      console.log("Updating voucher:", {
        ...finalVoucherData,
        _id: editingVoucher._id,
      });
      setVouchers(
        vouchers.map((v) =>
          v._id === editingVoucher._id
            ? { ...finalVoucherData, _id: editingVoucher._id }
            : v
        )
      );
    } else {
      console.log("Creating new voucher:", finalVoucherData);
      const newVoucher = { ...finalVoucherData, _id: Date.now().toString() };
      setVouchers([newVoucher, ...vouchers]);
    }
  };

  const handleDeleteConfirm = () => {
    if (!voucherToDelete) return;
    console.log("Deleting voucher:", voucherToDelete._id);
    setVouchers(vouchers.filter((v) => v._id !== voucherToDelete._id));
    setVoucherToDelete(null);
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
                  <Button onClick={handleAddNew}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Voucher
                  </Button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {vouchers.map((voucher) => (
                      <VoucherCard
                        key={voucher.id}
                        voucher={voucher}
                        onEdit={() => handleEdit(voucher)}
                        onDelete={() => handleDeleteRequest(voucher)}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>

        <AddEditVoucherModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSaveVoucher}
          initialData={editingVoucher}
          voucherTypes={voucherTypes}
        />

        <AlertDialog
          open={!!voucherToDelete}
          onOpenChange={() => setVoucherToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the "{voucherToDelete?.name}"
                voucher. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setVoucherToDelete(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default VoucherPage;
