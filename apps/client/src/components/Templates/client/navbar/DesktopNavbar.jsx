import { useSelector } from "react-redux";
import { ModeToggle } from "@/components/Elements/mode-toggle";
import {
  Search,
  ShoppingCart,
  MessageSquare,
  Bell,
  LifeBuoy,
  LogOut,
  Settings,
  User as UserIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import HoverPreviewCard from "./HoverPreviewCard";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth/authContext";
import NotificationListDesktop from "@/components/Layouts/client/Notification/NotificationListDesktop";
import { Badge } from "@/components/ui/badge";
import { selectCartItemCount} from "@/features/cart/cartSlice";

const navLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Trending",
    link: "/trending",
  },
  {
    name: "Produk",
    link: "/product",
  },
  {
    name: "Promo",
    link: "/promo",
  },
  {
    name: "Jadi Seller",
    link: "/seller-request",
  },
];

const DesktopNavbar = () => {
  const { user, logout } = useAuth();
  const totalQuantity = useSelector(selectCartItemCount);

  const userInitials =
    user?.username
      ?.replace(/[_\-.]/g, " ")
      .split(" ")
      .map((word) => word[0]?.toUpperCase())
      .join("") || "";

  return (
    <header className="hidden md:flex flex-col w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-40">
      <div className="container mx-auto lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            Vendora
            <span className="text-blue-600 dark:text-blue-500">Market</span>
          </a>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari produk, toko, atau merek..."
                className="w-full h-12 pl-12 pr-4 rounded-full bg-gray-100 dark:bg-gray-800 border border-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Ikon dan Tombol Aksi */}
          <div className="flex items-center space-x-4">
            <HoverPreviewCard
              trigger={
                <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </button>
              }
              title="Notifikasi"
            >
              {user && <NotificationListDesktop />}
            </HoverPreviewCard>

            <HoverPreviewCard
              trigger={
                <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <MessageSquare className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </button>
              }
              title="Pesan"
            >
              <p>Tidak ada pesan yang belum dibaca.</p>
            </HoverPreviewCard>

            <Link
              to="/cart"
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
            >
              <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-xs"
              >
                {totalQuantity}
              </Badge>
            </Link>

            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full cursor-pointer"
                  >
                    <Avatar className="h-10 w-10 border">
                      {/* Tampilkan gambar avatar jika ada, jika tidak, tampilkan fallback */}
                      <AvatarImage
                        src={user.avatarUrl || ""}
                        alt={`@${user.username}`}
                      />
                      <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.username}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span>Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-red-500 focus:text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button
                  size="lg"
                  className="px-6 py-2 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Log In
                </Button>
              </Link>
            )}

            <ModeToggle />
          </div>
        </div>

        {/* Navigasi Menu */}
        <nav className="flex items-center justify-center h-12 space-x-8">
          {navLinks.map((link) => (
            <Link
              to={link.link}
              key={link.link}
              href="#"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default DesktopNavbar;
