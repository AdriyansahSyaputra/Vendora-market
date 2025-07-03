import { useState } from "react";
import Sidebar from "@/components/Templates/vendor/sidebar/Sidebar";
import Topbar from "@/components/Templates/vendor/topbar/Topbar";
import StoreProfile from "@/components/Layouts/vendor/Store-setting/StoreProfile";
import PaymentMethod from "@/components/Layouts/vendor/Store-setting/PaymentMethod";
import ShippingOption from "@/components/Layouts/vendor/Store-setting/ShippingOption";
import { Helmet } from "react-helmet-async";

const StoreSettingPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <Helmet title="Store Settings" />

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
                  Store Settings
                </h1>
                <p className="text-muted-foreground">
                  Manage all settings related to your store's appearance and
                  operations.
                </p>
              </div>

              <StoreProfile />
              <PaymentMethod />
              <ShippingOption />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default StoreSettingPage;
