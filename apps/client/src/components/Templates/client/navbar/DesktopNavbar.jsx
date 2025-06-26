import { ModeToggle } from "@/components/Elements/mode-toggle";
import { Search, ShoppingCart, MessageSquare, Bell } from "lucide-react";
import HoverPreviewCard from "./HoverPreviewCard";

const DesktopNavbar = () => {
  const navLinks = [
    "Home",
    "Trending",
    "Produk",
    "Promo",
    "Jadi Seller",
  ];

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
              <p>Belum ada notifikasi baru untuk Anda.</p>
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

            <HoverPreviewCard
              trigger={
                <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </button>
              }
              title="Keranjang Belanja"
            >
              <p>Keranjang Anda kosong. Yuk, mulai belanja!</p>
            </HoverPreviewCard>

            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

            <button className="px-6 py-2 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              Login
            </button>
            <ModeToggle />
          </div>
        </div>

        {/* Navigasi Menu */}
        <nav className="flex items-center justify-center h-12 space-x-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default DesktopNavbar;
