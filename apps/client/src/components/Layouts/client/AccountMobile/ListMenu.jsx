import { Store, Heart, TicketPercent, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const menuList = [
  {
    name: "Wishlist",
    icon: Heart,
    link: "/wishlist",
  },
  {
    name: "Tickets",
    icon: TicketPercent,
    link: "/promo",
  },
  {
    name: "Open Store",
    icon: Store,
    link: "/store",
  },
];

const ListMenu = () => {
  return (
    <div className="w-full flex flex-col px-2 py-4 bg-white dark:bg-gray-800/50 shadow-sm dark:shadow-none transition-colors duration-200">
      <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 px-2">
        Menu
      </h4>

      <div className="mt-3 flex flex-col divide-y divide-gray-100 dark:divide-gray-700">
        {menuList.map((item, index) => (
          <Link
            to={item.link}
            key={index}
            className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
                <item.icon className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.name}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListMenu;
