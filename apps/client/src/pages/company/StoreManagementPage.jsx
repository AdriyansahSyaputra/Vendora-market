import { useState, useMemo } from "react";
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
import PaginationTable from "@/components/Elements/Pagination";
import StoreDetailModal from "@/components/Layouts/company/Store-management/StoreDetailModal";
import UpdateStatusModal from "@/components/Layouts/company/Store-management/UpdateStatusModal";
import MessageModal from "@/components/Layouts/company/Store-management/MessageModal";
import DeleteStoreModal from "@/components/Layouts/company/Store-management/DeleteStoreModal";
import CardStats from "@/components/Layouts/company/Store-management/CardStats";
import StoreTable from "@/components/Layouts/company/Store-management/StoreTable";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const storeData = [
  {
    id: 1,
    sellerName: "Budi Santoso",
    storeName: "Gadget Store Jakarta",
    location: "Jakarta, Indonesia",
    joinDate: "2023-01-15",
    reputation: 5,
    status: "Active",
    profilePic: "https://i.pravatar.cc/150?u=store1",
    fullAddress: "Jl. Sudirman No. 123, Jakarta Pusat",
    salesStats: { totalSales: 1250, totalProfit: 45000000 },
    products: 85,
  },
  {
    id: 2,
    sellerName: "Citra Lestari",
    storeName: "Fashionista Bandung",
    location: "Bandung, Indonesia",
    joinDate: "2023-02-20",
    reputation: 4,
    status: "Active",
    profilePic: "https://i.pravatar.cc/150?u=store2",
    fullAddress: "Jl. Braga No. 45, Bandung",
    salesStats: { totalSales: 850, totalProfit: 25000000 },
    products: 150,
  },
  {
    id: 3,
    sellerName: "Eko Wahyudi",
    storeName: "Surabaya Electronics",
    location: "Surabaya, Indonesia",
    joinDate: "2023-03-10",
    reputation: 3,
    status: "Suspended",
    profilePic: "https://i.pravatar.cc/150?u=store3",
    fullAddress: "Jl. Tunjungan No. 67, Surabaya",
    salesStats: { totalSales: 300, totalProfit: 8000000 },
    products: 40,
  },
  {
    id: 4,
    sellerName: "Dewi Anggraini",
    storeName: "Medan Books & Beyond",
    location: "Medan, Indonesia",
    joinDate: "2023-04-01",
    reputation: 5,
    status: "Active",
    profilePic: "https://i.pravatar.cc/150?u=store4",
    fullAddress: "Jl. Kesawan No. 89, Medan",
    salesStats: { totalSales: 2100, totalProfit: 75000000 },
    products: 500,
  },
  {
    id: 5,
    sellerName: "Rian Hidayat",
    storeName: "Makassar Home Goods",
    location: "Makassar, Indonesia",
    joinDate: "2023-05-18",
    reputation: 2,
    status: "Banned",
    profilePic: "https://i.pravatar.cc/150?u=store5",
    fullAddress: "Jl. Somba Opu No. 101, Makassar",
    salesStats: { totalSales: 50, totalProfit: 1500000 },
    products: 25,
  },
  {
    id: 6,
    sellerName: "Fitriani",
    storeName: "Yogya Craft Center",
    location: "Yogyakarta, Indonesia",
    joinDate: "2023-06-22",
    reputation: 5,
    status: "Active",
    profilePic: "https://i.pravatar.cc/150?u=store6",
    fullAddress: "Jl. Malioboro No. 112, Yogyakarta",
    salesStats: { totalSales: 980, totalProfit: 32000000 },
    products: 120,
  },
  {
    id: 7,
    sellerName: "Agus Setiawan",
    storeName: "Bali Sports Gear",
    location: "Denpasar, Indonesia",
    joinDate: "2023-07-30",
    reputation: 4,
    status: "Active",
    profilePic: "https://i.pravatar.cc/150?u=store7",
    fullAddress: "Jl. Legian No. 134, Kuta, Bali",
    salesStats: { totalSales: 640, totalProfit: 18000000 },
    products: 75,
  },
];

const StoreManagementPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [stores, setStores] = useState(storeData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [reputationFilter, setReputationFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStore, setSelectedStore] = useState(null);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [isStatusModalOpen, setStatusModalOpen] = useState(false);
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const ITEMS_PER_PAGE = 10;

  const filteredStores = useMemo(() => {
    return stores
      .filter(
        (store) =>
          store.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.sellerName.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(
        (store) => statusFilter === "All" || store.status === statusFilter
      )
      .filter(
        (store) =>
          reputationFilter === "All" ||
          store.reputation === parseInt(reputationFilter)
      );
  }, [stores, searchQuery, statusFilter, reputationFilter]);

  const paginatedStores = filteredStores.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredStores.length / ITEMS_PER_PAGE);

  const handleOpenDetailModal = (store) => {
    setSelectedStore(store);
    setDetailModalOpen(true);
  };

  const handleOpenStatusModal = (store) => {
    setSelectedStore(store);
    setStatusModalOpen(true);
  };

  const handleOpenMessageModal = (store) => {
    setSelectedStore(store);
    setMessageModalOpen(true);
  };

  const handleUpdateStatus = (storeId, newStatus, reason) => {
    console.log(
      `Updating store ${storeId} to ${newStatus} for reason: ${reason}`
    );
    setStores(
      stores.map((s) => (s.id === storeId ? { ...s, status: newStatus } : s))
    );
    setStatusModalOpen(false);
  };

  const handleDeleteStore = (storeId, reason) => {
    console.log(`Deleting store ${storeId} for reason: ${reason}`);
    setStores(stores.filter((s) => s.id !== storeId));
    setDeleteModalOpen(false);
  };

  return (
    <>
      <Helmet title="Store Management" />

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
                <CardTitle>Store Management</CardTitle>
                <CardDescription>
                  Manage your store settings, products, and orders from this
                  page.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 md:gap-8">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <CardStats stores={stores} />
                  </div>

                  {/* Search and Filter Controls */}
                  <div className="flex flex-col md:flex-row gap-2">
                    <Input
                      placeholder="Cari nama toko atau penjual..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="flex-grow"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:flex gap-2">
                      <Select
                        value={statusFilter}
                        onValueChange={(value) => {
                          setStatusFilter(value);
                          setCurrentPage(1);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Semua Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">Semua Status</SelectItem>
                          <SelectItem value="Active">Aktif</SelectItem>
                          <SelectItem value="Suspended">
                            Ditangguhkan
                          </SelectItem>
                          <SelectItem value="Banned">Banned</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select
                        value={reputationFilter}
                        onValueChange={(value) => {
                          setReputationFilter(value);
                          setCurrentPage(1);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Semua Reputasi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">Semua Reputasi</SelectItem>
                          <SelectItem value="5">5 Bintang</SelectItem>
                          <SelectItem value="4">4 Bintang</SelectItem>
                          <SelectItem value="3">3 Bintang</SelectItem>
                          <SelectItem value="2">2 Bintang</SelectItem>
                          <SelectItem value="1">1 Bintang</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>  
                  </div>

                  {/* Table data */}
                  <StoreTable
                    stores={paginatedStores}
                    handleOpenDetailModal={handleOpenDetailModal}
                    handleOpenStatusModal={handleOpenStatusModal}
                    handleOpenMessageModal={handleOpenMessageModal}
                    handleOpenDeleteModal={setDeleteModalOpen}
                  />

                  {/* Pagination */}
                  <div className="flex justify-end mt-4">
                    <PaginationTable
                      currentPage={currentPage}
                      totalPages={totalPages}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>

        <StoreDetailModal
          store={selectedStore}
          isOpen={isDetailModalOpen}
          onClose={() => setDetailModalOpen(false)}
        />
        <UpdateStatusModal
          store={selectedStore}
          isOpen={isStatusModalOpen}
          onClose={() => setStatusModalOpen(false)}
          onConfirm={handleUpdateStatus}
        />
        <MessageModal
          store={selectedStore}
          isOpen={isMessageModalOpen}
          onClose={() => setMessageModalOpen(false)}
        />
        <DeleteStoreModal
          store={selectedStore}
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteStore}
        />
      </div>
    </>
  );
};

export default StoreManagementPage;
