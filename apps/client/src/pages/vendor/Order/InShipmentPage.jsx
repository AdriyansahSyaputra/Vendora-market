import { useState } from "react";
import Sidebar from "@/components/Templates/vendor/sidebar/Sidebar";
import Topbar from "@/components/Templates/vendor/topbar/Topbar";
import InShipment from "@/components/Layouts/vendor/Order/InShipment";

const InShipmentPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <div className="flex min-h-screen w-full bg-muted/40">
        {/* Sidebar Desktop */}
        <Sidebar isCollapsed={isCollapsed} />

        {/* Kontainer untuk Topbar dan Konten Utama */}
        <div className="flex flex-col w-full">
          <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

          {/* Konten Utama Halaman */}
          <main className="flex-1 p-4 sm:px-6 sm:py-6 space-y-4">
            <div className="flex flex-col gap-4 md:gap-8">
              <InShipment />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default InShipmentPage;
