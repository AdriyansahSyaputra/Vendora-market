import { useState } from "react";
import Sidebar from "@/components/Templates/vendor/sidebar/Sidebar";
import Topbar from "@/components/Templates/company/topbar/Topbar";
import CouponFormModal from "@/components/Layouts/vendor/Promotion/CouponFormModal";
import CouponCard from "@/components/Layouts/vendor/Promotion/CouponCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, PlusCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";

const initialCoupons = [
  {
    id: 1,
    name: "Mid-Year Madness",
    description: "Special discount for all electronics.",
    category: "electronics",
    discount: 25,
  },
  {
    id: 2,
    name: "Fashionista Sale",
    description: "Get the latest trends for less.",
    category: "fashion",
    discount: 15,
  },
  {
    id: 3,
    name: "Storewide Welcome",
    description: "A special gift for our new customers.",
    category: "all",
    discount: 10,
  },
  {
    id: 4,
    name: "Gadget Bonanza",
    description: "Limited time offer on all accessories.",
    category: "electronics",
    discount: 30,
  },
];

const PromotionPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [coupons, setCoupons] = useState(initialCoupons);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);

  const handleAddNew = () => {
    setEditingCoupon(null);
    setIsModalOpen(true);
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  const handleFormSubmit = (formData) => {
    if (editingCoupon) {
      // Edit logic
      setCoupons((prev) =>
        prev.map((c) => (c.id === editingCoupon.id ? { ...c, ...formData } : c))
      );
    } else {
      // Add new logic
      const newCoupon = { id: Date.now(), ...formData };
      setCoupons((prev) => [newCoupon, ...prev]);
    }
  };

  return (
    <>
      <Helmet title="Promotions" />

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
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search coupon name..."
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Coupon Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {coupons.map((coupon) => (
                  <CouponCard
                    key={coupon.id}
                    coupon={coupon}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>

              {/* Modal */}
              <CouponFormModal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSubmit={handleFormSubmit}
                initialData={editingCoupon}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default PromotionPage;
