import { ShoppingCart, MessageSquare, Search } from "lucide-react";

const MobileTopNav = () => {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 z-40">
      <div className="relative w-3/4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="search"
          placeholder="Search here..."
          className="w-full h-10 pl-10 pr-20 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <MessageSquare className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
};

export default MobileTopNav;
