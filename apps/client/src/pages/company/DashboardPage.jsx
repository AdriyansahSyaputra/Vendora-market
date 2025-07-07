import { useState } from "react";
import Sidebar from "@/components/Templates/company/sidebar/Sidebar";
import Topbar from "@/components/Templates/company/topbar/Topbar";
import { Helmet } from "react-helmet-async";
import StatCard from "@/components/Layouts/company/Dashboard/StatsCard";
import OverviewChart from "@/components/Layouts/company/Dashboard/OverviewChart";
import RevenueBreakdown from "@/components/Layouts/company/Dashboard/RevenueBreakdown";
import RecentSales from "@/components/Layouts/company/Dashboard/RecentSales";
import {
  DollarSign,
  Users,
  ShoppingCart,
  BarChart2,
  UserPlus,
  Package,
} from "lucide-react";
import TopSeller from "@/components/Layouts/company/Dashboard/TopSeller";
import TopProduct from "@/components/Layouts/company/Dashboard/TopProduct";

const salesData = [
  { name: "Jan", users: 210, transactions: 400 },
  { name: "Feb", users: 250, transactions: 300 },
  { name: "Mar", users: 310, transactions: 500 },
  { name: "Apr", users: 290, transactions: 450 },
  { name: "May", users: 350, transactions: 550 },
  { name: "Jun", users: 420, transactions: 600 },
  { name: "Jul", users: 480, transactions: 720 },
];

const revenueData = [
  { name: "Komisi Penjual", value: 75000000, color: "hsl(262 80% 50%)" },
  { name: "Pendapatan Iklan", value: 25000000, color: "hsl(222 80% 50%)" },
];

const recentSales = [
  {
    id: 1,
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: 1999000,
    avatar: "https://placehold.co/40x40/E879F9/FFFFFF?text=OM",
  },
  {
    id: 2,
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: 390000,
    avatar: "https://placehold.co/40x40/38BDF8/FFFFFF?text=JL",
  },
  {
    id: 3,
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: 2990000,
    avatar: "https://placehold.co/40x40/F472B6/FFFFFF?text=IN",
  },
  {
    id: 4,
    name: "William Kim",
    email: "will@email.com",
    amount: 990000,
    avatar: "https://placehold.co/40x40/818CF8/FFFFFF?text=WK",
  },
  {
    id: 5,
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: 599000,
    avatar: "https://placehold.co/40x40/A78BFA/FFFFFF?text=SD",
  },
];

const topSellers = [
  {
    id: 1,
    name: "Toko Elektronik Jaya",
    sales: 124000000,
    avatar: "https://placehold.co/40x40/F9A8D4/000000?text=EJ",
  },
  {
    id: 2,
    name: "Fashionista Store",
    sales: 98500000,
    avatar: "https://placehold.co/40x40/F0ABFC/000000?text=FS",
  },
  {
    id: 3,
    name: "Dapur Bunda",
    sales: 76200000,
    avatar: "https://placehold.co/40x40/A5B4FC/000000?text=DB",
  },
  {
    id: 4,
    name: "Asus Store",
    sales: 65000000,
    avatar: "https://placehold.co/40x40/F0ABFC/000000?text=AS",
  },
  {
    id: 5,
    name: "Toko Sepatu",
    sales: 52000000,
    avatar: "https://placehold.co/40x40/818CF8/000000?text=TS",
  },
];

const topProducts = [
  {
    id: 1,
    name: "Smart TV 4K 55 Inch",
    category: "Elektronik",
    sales: "1.2k terjual",
    image: "https://placehold.co/80x80/6366F1/FFFFFF?text=TV",
  },
  {
    id: 2,
    name: "Sepatu Lari Pro-Series",
    category: "Olahraga",
    sales: "980 terjual",
    image: "https://placehold.co/80x80/34D399/FFFFFF?text=Sepatu",
  },
  {
    id: 3,
    name: "Blender Multifungsi",
    category: "Peralatan Rumah",
    sales: "850 terjual",
    image: "https://placehold.co/80x80/FBBF24/FFFFFF?text=Blender",
  },
];

const DashboardPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <Helmet title="Dashboard" />

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
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your store and track your sales.
              </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard
                title="Total Pendapatan"
                value="Rp 452.318.900"
                icon={DollarSign}
                change={20.1}
                period="bulan lalu"
              />
              <StatCard
                title="Total Pengguna"
                value="23.500"
                icon={Users}
                change={18.1}
                period="bulan lalu"
              />
              <StatCard
                title="Total Transaksi"
                value="+12.234"
                icon={ShoppingCart}
                change={19}
                period="bulan lalu"
              />
              <StatCard
                title="Penjualan Aktif"
                value="+573"
                icon={BarChart2}
                change={-2.1}
                period="kemarin"
              />
              <StatCard
                title="Produk Terdaftar"
                value="89.1k"
                icon={Package}
                change={5.2}
                period="bulan lalu"
              />
              <StatCard
                title="Permintaan Seller"
                value="128"
                icon={UserPlus}
                change={-10}
                period="kemarin"
              />
            </div>

            {/* Main Charts and Lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <OverviewChart salesData={salesData} />
              <RevenueBreakdown revenueData={revenueData} />
            </div>

            {/* Fourth Row: Top Products */}
            <div className="grid grid-cols-1">
              <TopProduct topProducts={topProducts} />
            </div>

            {/* Third Row: Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
              <RecentSales recentSales={recentSales} />
              <TopSeller topSellers={topSellers} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
