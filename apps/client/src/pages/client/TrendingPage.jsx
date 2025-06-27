import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import DesktopNavbar from "@/components/Templates/client/navbar/DesktopNavbar";
import MobileTopNav from "@/components/Templates/client/navbar/MobileTopNav";
import MobileBottomNav from "@/components/Templates/client/navbar/MobileBottomNav";
import Footer from "@/components/Templates/client/footer/Footer";
import BannerCarousel from "@/components/Elements/BannerCarousel";
import {
  FilterControls,
  FilterPanel,
} from "@/components/Layouts/client/Trending/FilterControls";
import ProductCard from "@/components/Elements/ProductCard";
import SearchView from "@/components/Elements/SearchView";

const allTrendingProducts = [
  {
    id: 1,
    name: "Noise Cancelling Headphone P-5 Pro",
    price: "Rp 1.499.000",
    rating: 4.9,
    sold: 2100,
    image: "https://placehold.co/300x300/1E40AF/FFFFFF?text=Headphone",
    category: "Elektronik",
    price_val: 1499000,
    date: "2025-06-25",
  },
  {
    id: 2,
    name: "Jaket Bomber Pria Edisi Terbatas",
    price: "Rp 450.000",
    rating: 4.8,
    sold: 3500,
    image: "https://placehold.co/300x300/BE123C/FFFFFF?text=Jaket",
    category: "Fashion",
    price_val: 450000,
    date: "2025-06-24",
  },
  {
    id: 3,
    name: "Air Fryer Digital 5L - Less Oil",
    price: "Rp 850.000",
    rating: 4.9,
    sold: 1800,
    image: "https://placehold.co/300x300/047857/FFFFFF?text=Air+Fryer",
    category: "Rumah Tangga",
    price_val: 850000,
    date: "2025-06-26",
  },
  {
    id: 4,
    name: "Serum Wajah Vitamin C Brightening",
    price: "Rp 180.000",
    rating: 4.8,
    sold: 11000,
    image: "https://placehold.co/300x300/f59e0b/FFFFFF?text=Serum",
    category: "Kecantikan",
    price_val: 180000,
    date: "2025-06-22",
  },
  {
    id: 5,
    name: "Kursi Gaming Ergonomis RGB",
    price: "Rp 2.800.000",
    rating: 4.9,
    sold: 980,
    image: "https://placehold.co/300x300/8B5CF6/FFFFFF?text=Kursi",
    category: "Elektronik",
    price_val: 2800000,
    date: "2025-06-20",
  },
  {
    id: 6,
    name: "Sneakers Lari Pria Ultra Boost",
    price: "Rp 1.250.000",
    rating: 4.7,
    sold: 4200,
    image: "https://placehold.co/300x300/0284C7/FFFFFF?text=Sneakers",
    category: "Fashion",
    price_val: 1250000,
    date: "2025-06-23",
  },
];
const initialFilters = { categories: [], rating: 0 };

const slides = [
  {
    img: "https://placehold.co/1200x500/DC2626/FFFFFF?text=Diskon+Gila+90%25",
    title: "Diskon Gila 90%",
    desc: "Hanya untuk produk-produk paling tren minggu ini.",
    cta: "Klaim Sekarang",
  },
  {
    img: "https://placehold.co/1200x500/2563EB/FFFFFF?text=Cashback+50%25+Elektronik",
    title: "Cashback 50% Elektronik",
    desc: "Upgrade gadget-mu dengan penawaran terbaik.",
    cta: "Lihat Produk",
  },
  {
    img: "https://placehold.co/1200x500/059669/FFFFFF?text=Koleksi+Fashion+Terbaru",
    title: "Koleksi Fashion Terbaru",
    desc: "Tampil paling update dengan gaya terkini.",
    cta: "Jelajahi Koleksi",
  },
];

const TrendingPage = () => {
  const location = useLocation();
  const currentPage = location.pathname;
  const [isSearching, setIsSearching] = useState(false);
  const canSearch = currentPage === "/trending";

  const [products, setProducts] = useState(allTrendingProducts);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [sortOption, setSortOption] = useState("popular");
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  const handleSearchClick = () => {
    if (canSearch) {
      setIsSearching(true);
    }
  };

  const handleExitSearch = () => {
    setIsSearching(false);
  };

  useEffect(() => {
    setIsSearching(false);
  }, [currentPage]);

  useEffect(() => {
    let filtered = [...allTrendingProducts];

    // 1. Filtering
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
        filters.categories.includes(p.category)
      );
    }
    if (filters.rating > 0) {
      filtered = filtered.filter((p) => p.rating >= filters.rating);
    }

    // 2. Sorting
    switch (sortOption) {
      case "newest":
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "lowPrice":
        filtered.sort((a, b) => a.price_val - b.price_val);
        break;
      case "highPrice":
        filtered.sort((a, b) => b.price_val - a.price_val);
        break;
      case "popular":
      default:
        filtered.sort((a, b) => b.sold - a.sold);
        break;
    }

    setProducts(filtered);

    // 3. Update active filter count
    const count = filters.categories.length + (filters.rating > 0 ? 1 : 0);
    setActiveFilterCount(count);
  }, [filters, sortOption]);

  const handleFilterChange = (key, value) => {
    if (key === "reset") {
      setFilters(initialFilters);
      return;
    }
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Helmet title="Trending" />

      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        {/* Navbar Untuk Desktop */}
        <DesktopNavbar />

        {/* Navbar untuk Mobile */}
        <MobileTopNav page={currentPage} onSearchClick={handleSearchClick} />
        <MobileBottomNav />

        {isSearching && canSearch ? (
          <SearchView onBack={handleExitSearch} />
        ) : (
          <>
            {/* Konten Utama Halaman */}
            <main className="container mx-auto px-4 py-8 pt-24 md:pt-8 pb-24 md:pb-8 space-y-12 md:space-y-16 lg:space-y-20">
              <BannerCarousel slides={slides} />
              <FilterControls
                filters={filters}
                onFilterChange={handleFilterChange}
                sortOption={sortOption}
                onSortChange={setSortOption}
                onOpenFilterPanel={() => setIsFilterPanelOpen(true)}
                activeFilterCount={activeFilterCount}
              />

              {products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h4 className="text-xl font-semibold mb-2">
                    Yah, produk tidak ditemukan
                  </h4>
                  <p className="text-muted-foreground">
                    Coba ubah filter kamu, yuk!
                  </p>
                </div>
              )}

              <FilterPanel
                isOpen={isFilterPanelOpen}
                onClose={() => setIsFilterPanelOpen(false)}
                filters={filters}
                onFilterChange={handleFilterChange}
                sortOption={sortOption}
                onSortChange={setSortOption}
              />
            </main>
          </>
        )}

        <Footer />
      </div>
    </>
  );
};

export default TrendingPage;
