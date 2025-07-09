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
import TransactionTable from "@/components/Layouts/company/Order-management/TransactionTable";
import OrderDetailModal from "@/components/Layouts/company/Order-management/OrderDetailModal";
import ConfirmationDialog from "@/components/Layouts/company/Order-management/ConfirmationDialog";
import PaginationTable from "@/components/Elements/Pagination";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const orderData = [
  {
    id: "TRX-001",
    productName: "Premium Wireless Headphones",
    category: "Electronics",
    quantity: 1,
    totalPrice: 249.99,
    seller: "Electro World",
    buyer: "John Doe",
    status: "Completed",
    shippingAddress: "123 Main St, New York, NY 10001",
    shippingVia: "JNE Express",
    paymentVia: "Credit Card",
  },
  {
    id: "TRX-002",
    productName: "Organic Cotton T-Shirt",
    category: "Fashion",
    quantity: 2,
    totalPrice: 59.98,
    seller: "Green Style Co.",
    buyer: "Jane Smith",
    status: "Processing",
    shippingAddress: "456 Oak Ave, London, SW1A 0AA",
    shippingVia: "Sicepat",
    paymentVia: "PayPal",
  },
  {
    id: "TRX-003",
    productName: "Advanced Vitamin C Serum",
    category: "Beauty & Health",
    quantity: 1,
    totalPrice: 45.0,
    seller: "Beauty Bliss",
    buyer: "Aisha Khan",
    status: "Pending",
    shippingAddress: "101 Palm Jumeirah, Dubai",
    shippingVia: "Anteraja",
    paymentVia: "Bank Transfer",
  },
  {
    id: "TRX-004",
    productName: "Smart LED Light Bulb",
    category: "Electronics",
    quantity: 5,
    totalPrice: 79.95,
    seller: "Electro World",
    buyer: "Kenji Tanaka",
    status: "Failed",
    shippingAddress: "202 Shibuya Crossing, Tokyo, 150-0043",
    shippingVia: "J&T Express",
    paymentVia: "Credit Card",
  },
  {
    id: "TRX-005",
    productName: "Gourmet Coffee Beans",
    category: "Groceries",
    quantity: 1,
    totalPrice: 22.5,
    seller: "The Daily Grind",
    buyer: "Carlos Garcia",
    status: "Refund",
    shippingAddress: "789 Pine Ln, Madrid, 28001",
    shippingVia: "JNE Express",
    paymentVia: "GoPay",
  },
  {
    id: "TRX-006",
    productName: "Yoga Mat with Strap",
    category: "Sports",
    quantity: 1,
    totalPrice: 35.0,
    seller: "Fit Zone",
    buyer: "Fatima Al-Fassi",
    status: "Completed",
    shippingAddress: "303 Kasbah of the Udayas, Rabat",
    shippingVia: "Sicepat",
    paymentVia: "Credit Card",
  },
  {
    id: "TRX-007",
    productName: "Leather Messenger Bag",
    category: "Fashion",
    quantity: 1,
    totalPrice: 120.0,
    seller: "Style Forward",
    buyer: "Michael Brown",
    status: "Processing",
    shippingAddress: "404 Bondi Beach, Sydney, NSW 2026",
    shippingVia: "J&T Express",
    paymentVia: "OVO",
  },
  {
    id: "TRX-008",
    productName: "The Art of Programming",
    category: "Books",
    quantity: 1,
    totalPrice: 59.5,
    seller: "Bookworm Haven",
    buyer: "Sophia Loren",
    status: "Pending",
    shippingAddress: "505 Via del Corso, Rome, 00186",
    shippingVia: "Anteraja",
    paymentVia: "Bank Transfer",
  },
  {
    id: "TRX-009",
    productName: "Ergonomic Office Chair",
    category: "Furniture",
    quantity: 1,
    totalPrice: 399.0,
    seller: "Office Pro",
    buyer: "David Chen",
    status: "Completed",
    shippingAddress: "606 The Bund, Shanghai, 200002",
    shippingVia: "Internal Delivery",
    paymentVia: "Credit Card",
  },
  {
    id: "TRX-010",
    productName: "Stainless Steel Water Bottle",
    category: "Home & Kitchen",
    quantity: 3,
    totalPrice: 59.97,
    seller: "Kitchen Essentials",
    buyer: "Isabella Rossi",
    status: "Failed",
    shippingAddress: "707 Galleria Vittorio, Milan, 20121",
    shippingVia: "JNE Express",
    paymentVia: "Credit Card",
  },
  {
    id: "TRX-011",
    productName: "Portable Bluetooth Speaker",
    category: "Electronics",
    quantity: 1,
    totalPrice: 79.99,
    seller: "Electro World",
    buyer: "Liam Wilson",
    status: "Processing",
    shippingAddress: "808 CN Tower, Toronto, M5V 2T6",
    shippingVia: "Sicepat",
    paymentVia: "PayPal",
  },
];

const categories = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty & Health",
  "Furniture",
  "Books",
  "Groceries",
  "Sports",
];

const statuses = ["Pending", "Processing", "Completed", "Failed", "Refund"];

const OrderManagementPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [orders, setOrders] = useState(orderData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const ITEMS_PER_PAGE = 10;

  const filteredOrders = useMemo(() => {
    return orders
      .filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.buyer.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(
        (order) => statusFilter === "All" || order.status === statusFilter
      )
      .filter(
        (order) => categoryFilter === "All" || order.category === categoryFilter
      );
  }, [orders, searchQuery, statusFilter, categoryFilter]);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const handleOpenDetailModal = (order) => {
    setSelectedOrder(order);
    setDetailModalOpen(true);
  };
  const handleOpenDeleteConfirm = (order) => {
    setSelectedOrder(order);
    setDeleteConfirmOpen(true);
  };
  const handleDeleteConfirm = () => {
    setOrders(orders.filter((o) => o.id !== selectedOrder.id));
    setDeleteConfirmOpen(false);
    setSelectedOrder(null);
  };

  const totalRevenue = orders
    .filter((o) => o.status === "Completed")
    .reduce((sum, order) => sum + order.totalPrice, 0);
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;

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
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Total Pendapatan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    $
                    {totalRevenue.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pesanan Tertunda</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingOrders}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Pesanan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{orders.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tingkat Refund</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(
                      (orders.filter((o) => o.status === "Refund").length /
                        orders.length) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>
                  Manage, filter, and view all your company users.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 md:gap-8">
                  <div className="flex flex-col md:flex-row gap-2">
                    <Input
                      placeholder="Cari ID, produk, atau pembeli..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="flex-grow"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:flex gap-2">
                      <Input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="w-full"
                      />
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
                          {statuses.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={categoryFilter}
                        onValueChange={(value) => {
                          setCategoryFilter(value);
                          setCurrentPage(1);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Semua Kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">Semua Kategori</SelectItem>
                          {categories.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <TransactionTable
                    orders={paginatedOrders}
                    handleOpenDetailModal={handleOpenDetailModal}
                    handleOpenDeleteModal={handleOpenDeleteConfirm}
                  />

                  <PaginationTable
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </CardContent>
            </Card>
          </main>
        </div>

        <OrderDetailModal
          order={selectedOrder}
          isOpen={isDetailModalOpen}
          onClose={() => setDetailModalOpen(false)}
        />
        <ConfirmationDialog
          open={isDeleteConfirmOpen}
          onOpenChange={setDeleteConfirmOpen}
          onConfirm={handleDeleteConfirm}
          title="Apakah Anda yakin?"
          description={`Tindakan ini akan menghapus pesanan dengan ID ${selectedOrder?.id} secara permanen. Aksi ini tidak dapat dibatalkan.`}
        />
      </div>
    </>
  );
};

export default OrderManagementPage;
