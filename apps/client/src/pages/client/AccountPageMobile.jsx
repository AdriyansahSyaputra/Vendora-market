import { Helmet } from "react-helmet-async";
import MobileBottomNav from "@/components/Templates/client/navbar/MobileBottomNav";
import AccountInfo from "@/components/Layouts/client/AccountMobile/AccountInfo";
import OrderMenu from "@/components/Layouts/client/AccountMobile/OrderMenu";
import ListMenu from "@/components/Layouts/client/AccountMobile/ListMenu";

const AccountPageMobile = () => {
  return (
    <>
      <Helmet title="Account" />

      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <MobileBottomNav />

        {/* Konten Utama Halaman */}
        <main className="w-full max-w-md mx-auto text-foreground min-h-screen border-x dark:border-gray-800 space-y-3">
          <AccountInfo />
          <OrderMenu />
          <ListMenu />
        </main>
      </div>
    </>
  );
};

export default AccountPageMobile;
