import { Home, Flame, TicketPercent, Bell, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MobileBottomNav = () => {
  const location = useLocation();
  const menuItems = [
    { icon: Home, label: "Home", link: "/" },
    { icon: Flame, label: "Trending", link: "/trending" },
    { icon: TicketPercent, label: "Promo", link: "/promo" },
    { icon: Bell, label: "Notifikasi", link: "/notification" },
    { icon: User, label: "Akun", link: "/account" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-around items-center z-40">
      {menuItems.map((item, index) => (
        <Link
          to={item.link}
          key={index}
          className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
            location.pathname === item.link
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          }`}
        >
          <item.icon className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default MobileBottomNav;
