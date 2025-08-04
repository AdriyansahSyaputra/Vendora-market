import { Helmet } from "react-helmet-async";
import MobileBottomNav from "@/components/Templates/client/navbar/MobileBottomNav";
import AccountInfo from "@/components/Layouts/client/AccountMobile/AccountInfo";
import OrderMenu from "@/components/Layouts/client/AccountMobile/OrderMenu";
import ListMenu from "@/components/Layouts/client/AccountMobile/ListMenu";
import { useAuth } from "@/context/auth/authContext";

const AccountPageMobile = () => {
  const { user } = useAuth();

  const userInitials =
    user?.username
      ?.replace(/[_\-.]/g, " ")
      .split(" ")
      .map((word) => word[0]?.toUpperCase())
      .join("") || "";

  return (
    <>
      <Helmet title="Account" />

      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <MobileBottomNav />

        {/* Konten Utama Halaman */}
        <main className="w-full max-w-md mx-auto text-foreground min-h-screen border-x dark:border-gray-800 space-y-3">
          {user ? (
            <>
              <AccountInfo user={user} userInitials={userInitials} />
              <OrderMenu />
              <ListMenu />
            </>
          ) : (
            // Tombol login yang berada di tengah
            <div className="flex items-center justify-center h-screen">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Login
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AccountPageMobile;
