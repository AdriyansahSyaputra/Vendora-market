import { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/Templates/vendor/sidebar/Sidebar";
import Topbar from "@/components/Templates/company/topbar/Topbar";
import CouponFormModal from "@/components/Layouts/vendor/Promotion/CouponFormModal";
import CouponCard from "@/components/Layouts/vendor/Promotion/CouponCard";
import FiltersVoucher from "@/components/Layouts/vendor/Promotion/FiltersVoucher";
import { Button } from "@/components/ui/button";
import { PlusCircle, LoaderCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const PromotionPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    searchTerm: "",
    selectedCategory: "all",
    selectedStatus: "all",
  });

  // State untuk debouncing input pencarian
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(
    filters.searchTerm
  );

  const handleAddNew = () => {
    setEditingCoupon(null);
    setIsModalOpen(true);
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setIsModalOpen(true);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(filters.searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [filters.searchTerm]);

  const fetchVouchersData = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();

      if (debouncedSearchTerm) {
        params.append("search", debouncedSearchTerm);
      }
      // Filter lain bisa langsung dari state 'filters'
      if (filters.selectedCategory && filters.selectedCategory !== "all") {
        params.append("category", filters.selectedCategory);
      }
      if (filters.selectedStatus && filters.selectedStatus !== "all") {
        params.append("status", filters.selectedStatus);
      }

      const { data } = await axios.get("/api/vendor/voucher/store", {
        params,
        withCredentials: true,
      });
      setCoupons(data.vouchers);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      toast.error("Failed to fetch coupons.");
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchTerm, filters.selectedCategory, filters.selectedStatus]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/vendor/product-category", {
          withCredentials: true,
        });
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchVouchersData();
  }, [fetchVouchersData]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/vendor/voucher/store/${id}/delete`, {
        withCredentials: true,
      });
      toast.success("Coupon deleted successfully!");

      fetchVouchersData();
    } catch (error) {
      console.error("Error deleting coupon:", error);
      toast.error("Failed to delete coupon.");
    }
  };

  const handleFormSubmit = async (formData) => {
    if (editingCoupon) {
      await axios.put(
        `/api/vendor/voucher/store/${editingCoupon._id}/update`,
        formData,
        {
          withCredentials: true,
        }
      );

      toast.success("Coupon updated successfully!");

      fetchVouchersData();
    } else {
      await axios.post("/api/vendor/voucher/store/create", formData, {
        withCredentials: true,
      });

      toast.success("Coupon created successfully!");

      fetchVouchersData();
    }
  };

  return (
    <>
      <Helmet title="Promotions" />

      <Toaster richColors position="top-center" />

      <div className="flex min-h-screen w-full bg-muted/40">
        {/* Sidebar Desktop */}
        <Sidebar isCollapsed={isCollapsed} />

        {/* Kontainer untuk Topbar dan Konten Utama */}
        <div className="flex flex-col w-full">
          <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

          {/* Konten Utama Halaman */}
          <main className="flex-1 p-4 sm:px-6 sm:py-6 space-y-4">
            <div className="flex flex-col gap-4 md:gap-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    Promotions
                  </h1>
                  <p className="text-muted-foreground">
                    Manage your store's discount coupons.
                  </p>
                </div>
                <Button onClick={handleAddNew}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Coupon
                </Button>
              </div>

              {/* Filters */}
              <FiltersVoucher
                categories={categories}
                filters={filters}
                handleFilterChange={handleFilterChange}
              />

              {/* Coupon Grid */}
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Loading coupons...
                  </span>
                </div>
              ) : coupons.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {coupons.map((coupon) => (
                    <CouponCard
                      key={coupon._id}
                      coupon={coupon}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground">
                    No coupons found. Create your first coupon!
                  </p>
                </div>
              )}

              {/* Modal */}
              <CouponFormModal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSubmit={handleFormSubmit}
                initialData={editingCoupon}
                categories={categories}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default PromotionPage;
