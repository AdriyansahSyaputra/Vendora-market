import { useState } from "react";
import Sidebar from "@/components/Templates/vendor/sidebar/Sidebar";
import Topbar from "@/components/Templates/company/topbar/Topbar";
import DashboardStatsGrid from "@/components/Layouts/vendor/Dashboard/DashboardStatsGrid";
import FinancialPieChart from "@/components/Layouts/vendor/Dashboard/FinancialPieChart";
import RecentCheckoutsTable from "@/components/Layouts/vendor/Dashboard/RecentCheckoutsTable";
import RecentPaymentsList from "@/components/Layouts/vendor/Dashboard/RecentPaymentsList";
import SalesChart from "@/components/Layouts/vendor/Dashboard/SalesChart";
import { Helmet } from "react-helmet-async";

const DashboardPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <Helmet title="Dashboard" />

      <div className="flex min-h-screen w-full bg-muted/40">
        {/* Sidebar Desktop */}
        <Sidebar isCollapsed={isCollapsed} />

        {/* Kontainer untuk Topbar dan Konten Utama */}
        <div className="flex flex-col w-full">
          <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

          {/* Konten Utama Halaman */}
          <main className="flex-1 p-4 sm:px-6 sm:py-6 space-y-4">
            <div className="flex flex-col gap-4 md:gap-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                  An overview of your store's performance and customer behavior.
                </p>
              </div>

              {/* Bagian Atas: Kartu Statistik */}
              <DashboardStatsGrid />

              {/* Bagian Tengah: Grafik */}
              <div className="grid gap-4 md:gap-8 lg:grid-cols-7">
                <div className="lg:col-span-4">
                  <SalesChart />
                </div>
                <div className="lg:col-span-3">
                  <FinancialPieChart />
                </div>
              </div>

              {/* Bagian Bawah: Tabel dan Daftar */}
              <div className="grid gap-4 md:gap-8 lg:grid-cols-7">
                <div className="lg:col-span-5">
                  <RecentCheckoutsTable />
                </div>
                <div className="lg:col-span-2">
                  <RecentPaymentsList />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
