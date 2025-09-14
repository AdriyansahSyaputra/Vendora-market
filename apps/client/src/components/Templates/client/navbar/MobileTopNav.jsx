import { ShoppingCart, MessageSquare, Search, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { selectCartItemCount } from "@/features/cart/cartSlice";
import { useSelector } from "react-redux";

const CartButton = () => {
  const totalQuantity = useSelector(selectCartItemCount);

  return (
    <Link
      to="/cart"
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 relative"
    >
      <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-300" />
      <Badge
        variant="destructive"
        className="absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-xs"
      >
        {totalQuantity}
      </Badge>
    </Link>
  );
};

const MessageButton = () => (
  <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
    <MessageSquare className="h-6 w-6 text-gray-600 dark:text-gray-300" />
  </button>
);

const SearchButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
  >
    <Search className="h-6 w-6 text-gray-600 dark:text-gray-300" />
  </button>
);

const HomeSearchBar = () => (
  <div className="relative w-full">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
    <input
      type="search"
      placeholder="Search here..."
      className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const MobileTopNav = ({ page, onSearchClick, view, handleBack }) => {
  let leftContent;
  let rightContent;

  // Conditional rendering based on the current page
  switch (page) {
    case "/trending":
      leftContent = <h1 className="text-lg font-bold">Trending</h1>;
      rightContent = (
        <>
          <SearchButton onClick={onSearchClick} />
          <CartButton />
        </>
      );
      break;

    case "/promo":
      leftContent = <h1 className="text-lg font-bold">Promo</h1>;
      rightContent = (
        <>
          <SearchButton onClick={onSearchClick} />
          <CartButton />
        </>
      );
      break;

    case "/notification":
      leftContent = (
        <div className="flex items-center h-16">
          {view === "detail" && (
            <button
              onClick={handleBack}
              className="p-2 -ml-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-lg font-bold">
            {view === "list" ? "Notifications" : "Notification Detail"}
          </h1>
        </div>
      );
      rightContent = (
        <>
          <CartButton />
          <MessageButton />
        </>
      );
      break;

    case "/":
    default:
      leftContent = <HomeSearchBar />;
      rightContent = (
        <>
          <CartButton />
          <MessageButton />
        </>
      );
      break;
  }

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 z-40 gap-4">
      <div className="flex-grow">{leftContent}</div>
      <div className="flex-shrink-0 flex items-center space-x-1">
        {rightContent}
      </div>
    </div>
  );
};

export default MobileTopNav;
