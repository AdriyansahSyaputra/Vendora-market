import { Home, Flame, TicketPercent, Bell, User } from "lucide-react";

const MobileBottomNav = () => {
  const menuItems = [
    { icon: Home, label: "Home" },
    { icon: Flame, label: "Trending" },
    { icon: TicketPercent, label: "Promo" },
    { icon: Bell, label: "Notifikasi" },
    { icon: User, label: "Akun" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-around items-center z-40">
      {menuItems.map((item, index) => (
        <a
          href="#"
          key={index}
          className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
        >
          <item.icon className="h-6 w-6 mb-1" />
          <span className="text-xs font-medium">{item.label}</span>
        </a>
      ))}
    </div>
  );
};

export default MobileBottomNav;