import {
  Wallet,
  PackageCheck,
  Truck,
  PenLine,
  ChevronRight,
  Package,
} from "lucide-react";
import { Link } from "react-router-dom";

const menuOrder = [
  {
    name: "Payment",
    icon: Wallet,
    link: "/payment",
  },
  {
    name: "Packed",
    icon: Package,
    link: "/packed",
  },
  {
    name: "Delivery",
    icon: Truck,
    link: "/delivery",
  },
  {
    name: "Received",
    icon: PackageCheck,
    link: "/received",
  },
  {
    name: "Review",
    icon: PenLine,
    link: "/review",
  },
];

const OrderMenu = () => {
  return (
    <div className="w-full flex flex-col bg-white dark:bg-gray-800/50 shadow-sm dark:shadow-none px-2 py-4 transition-colors duration-200">
      {/* Header Section */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          My Orders
        </p>

        <button className="flex items-center space-x-1 group">
          <span className="text-xs font-medium dark:text-gray-200 transition-colors">
            View Review History
          </span>
          <ChevronRight className="w-4 h-4 dark:text-gray-200 transition-colors" />
        </button>
      </div>

      {/* Order Menu Grid */}
      <div className="mt-4 grid grid-cols-5 gap-4 px-2">
        {menuOrder.map((item, index) => (
          <Link
            to={item.link}
            key={index}
            className="flex flex-col items-center  space-y-2 cursor-pointer rounded-lg transition-colors duration-200 group"
          >
            <div className="p-2.5 rounded-full bg-gray-50 dark:bg-gray-700 transition-colors">
              <item.icon className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-300" />
            </div>
            <p className="text-xs font-medium text-gray-600 dark:text-gray-300 text-center group-hover:text-blue-600 dark:group-hover:text-blue-300">
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OrderMenu;
