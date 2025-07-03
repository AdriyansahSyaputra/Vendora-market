import { useState } from "react";
import Sidebar from "@/components/Templates/vendor/sidebar/Sidebar";
import Topbar from "@/components/Templates/vendor/topbar/Topbar";
import SalesAnalysisChart from "@/components/Layouts/vendor/Analytic/SalesAnalysisChart";
import TopProductsChart from "@/components/Layouts/vendor/Analytic/TopProductsChart";
import ConversionFunnelChart from "@/components/Layouts/vendor/Analytic/ConversionFunnelChart";
import { Helmet } from "react-helmet-async";

const AnalyticPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <Helmet title="Analytics" />

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
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                  Store Analytics
                </h1>
                <p className="text-muted-foreground">
                  An overview of your store's performance and customer behavior.
                </p>
              </div>

              {/* Komponen Analisis Penjualan */}
              <div className="w-full">
                <SalesAnalysisChart />
              </div>

              {/* Grid untuk dua chart di bawah */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
                <div className="lg:col-span-3">
                  <TopProductsChart />
                </div>
                <div className="lg:col-span-2">
                  <ConversionFunnelChart />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AnalyticPage;
