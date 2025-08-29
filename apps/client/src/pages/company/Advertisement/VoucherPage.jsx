import { useState, useEffect } from "react";
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
import { PlusCircle, Loader2 } from "lucide-react";
import axios from "axios";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const voucherTypes = [
  { value: "product_discount", label: "Product Discount" },
  { value: "shipping_discount", label: "Shipping Discount" },
  { value: "cashback", label: "Cashback" },
];

const VoucherPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [vouchers, setVouchers] = useState([]);
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

  const fetchVouchers = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/api/company/voucher/platform", {
        withCredentials: true,
      });
      setVouchers(data.vouchers || []);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      toast.error("Failed to load vouchers. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const handleSaveVoucher = async (data, form) => {
    const { setError } = form;
    const loadingToast = toast.loading(
      `${editingVoucher ? "Updating" : "Creating"} voucher...`
    );

    try {
      const formData = new FormData();

      // Menangani data formulir
      Object.keys(data).forEach((key) => {
        const value = data[key];
        if (key !== "image") {
          if (value instanceof Date) {
            formData.append(key, value.toISOString());
          } else if (value !== null && value !== undefined) {
            formData.append(key, value);
          }
        }
      });

      // Menangani gambar
      if (data.image instanceof File) {
        formData.append("image", data.image);
      } else if (editingVoucher?.image) {
        formData.append(
          "existingImages",
          JSON.stringify([editingVoucher.image])
        );
      }

      formData.append("ownerType", "Platform");

      const endpoint = editingVoucher
        ? `/api/company/voucher/platform/${editingVoucher._id}/update`
        : "/api/company/voucher/platform/create";

      const response = await axios({
        method: editingVoucher ? "put" : "post",
        url: endpoint,
        data: formData,
        withCredentials: true,
      });

      const newVoucher =
        response.data?.data || response.data?.voucher || response.data;

      if (newVoucher && newVoucher._id) {
        // Jika data valid, perbarui state
        setVouchers((current) => {
          if (editingVoucher) {
            return current.map((v) =>
              v._id === editingVoucher._id ? newVoucher : v
            );
          }
          return [newVoucher, ...current];
        });
        toast.success(
          `Voucher ${editingVoucher ? "updated" : "created"} successfully!`
        );
        setIsModalOpen(false);
      } else {
        throw new Error("Invalid data structure received from server.");
      }
    } catch (error) {
      // Menangani error validasi
      if (error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(
          ([field, message]) => {
            setError(field, {
              type: "server",
              message: Array.isArray(message) ? message[0] : message,
            });
          }
        );
        toast.error("Please check the form for errors");
      } else {
        toast.error(
          error.message ||
            error.response?.data?.message ||
            "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!voucherToDelete) return;

    const previousVouchers = vouchers;

    setVouchers(vouchers.filter((v) => v._id !== voucherToDelete._id));
    setVoucherToDelete(null);
    toast.success("Voucher deleted successfully.");

    try {
      await axios.delete(
        `/api/company/voucher/platform/${voucherToDelete._id}/delete`,
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Failed to delete voucher:", err);
      setVouchers(previousVouchers);
      toast.error("Failed to delete voucher.", {
        description: err.response?.data?.message || "An error occurred.",
      });
    }
  };

  return (
    <>
      <Helmet title="All Product" />

      <Toaster richColors position="top-center" />

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

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                      <div className="col-span-full flex justify-center items-center">
                        <Loader2 className="animate-spin h-6 w-6 text-primary" />
                      </div>
                    ) : vouchers.length > 0 ? (
                      vouchers.map((voucher) => (
                        <VoucherCard
                          key={voucher._id}
                          voucher={voucher}
                          onEdit={() => handleEdit(voucher)}
                          onDelete={() => handleDeleteRequest(voucher)}
                        />
                      ))
                    ) : (
                      <div className="col-span-full text-center text-muted-foreground">
                        No vouchers found. Click "Add Voucher" to create one.
                      </div>
                    )}
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
