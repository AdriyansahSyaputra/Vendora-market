import { useState } from "react";
import Sidebar from "@/components/Templates/vendor/sidebar/Sidebar";
import Topbar from "@/components/Templates/vendor/topbar/Topbar";
import Withdrawals from "@/components/Layouts/vendor/Finance/Withdrawals";
import { Helmet } from "react-helmet-async";

const WithdrawalPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <Helmet title="Withdrawals" />
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
                <h1 className="text-3xl font-bold tracking-tight">
                  Withdrawals
                </h1>
                <p className="text-muted-foreground">
                  Manage all withdrawals related to your store.
                </p>
              </div>

              <Withdrawals />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default WithdrawalPage;
