import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import DesktopNavbar from "@/components/Templates/client/navbar/DesktopNavbar";
import MobileTopNav from "@/components/Templates/client/navbar/MobileTopNav";
import MobileBottomNav from "@/components/Templates/client/navbar/MobileBottomNav";
import Footer from "@/components/Templates/client/footer/Footer";
import BannerCarousel from "@/components/Elements/BannerCarousel";
import ProductCard from "@/components/Elements/ProductCard";
import {
  PromoFilterControls,
  PromoFilterPanel,
} from "@/components/Layouts/client/Promo/FilterControls";

const slides = [
  {
    img: "https://placehold.co/1200x500/059669/FFFFFF?text=Mid-Year+Mega+Deals",
    title: "Mid-Year Mega Deals",
    desc: "Unbeatable prices on thousands of items. Up to 80% off!",
    cta: "Shop Deals",
  },
  {
    img: "https://placehold.co/1200x500/7C3AED/FFFFFF?text=Exclusive+Vouchers+Inside",
    title: "Exclusive Vouchers Inside",
    desc: "Claim your special discount vouchers for extra savings.",
    cta: "Claim Now",
  },
  {
    img: "https://placehold.co/1200x500/DB2777/FFFFFF?text=Beauty+Product+Sale",
    title: "Beauty Product Sale",
    desc: "Get your glow on with buy 1 get 1 free on selected beauty products.",
    cta: "Explore Beauty",
  },
];

const allPromoProducts = [
  {
    id: 1,
    name: "Wireless Gaming Mouse RGB",
    price: "Rp 450.000",
    originalPrice: "Rp 900.000",
    discount: 50,
    rating: "4.9",
    sold: "1.5k",
    image: "https://placehold.co/300x300/4F46E5/FFFFFF?text=Mouse",
    category: "Electronics",
    price_val: 450000,
  },
  {
    id: 2,
    name: "Premium Cotton Hoodie",
    price: "Rp 299.000",
    originalPrice: "Rp 400.000",
    discount: 25,
    rating: "4.8",
    sold: "2.8k",
    image: "https://placehold.co/300x300/0D9488/FFFFFF?text=Hoodie",
    category: "Fashion",
    price_val: 299000,
  },
  {
    id: 3,
    name: "Robot Vacuum Cleaner Pro",
    price: "Rp 2.500.000",
    originalPrice: "Rp 3.500.000",
    discount: 28,
    rating: "4.9",
    sold: "800",
    image: "https://placehold.co/300x300/9333EA/FFFFFF?text=Vacuum",
    category: "Home & Kitchen",
    price_val: 2500000,
  },
  {
    id: 4,
    name: "Anti-Aging Face Serum",
    price: "Rp 150.000",
    originalPrice: "Rp 200.000",
    discount: 25,
    rating: "4.8",
    sold: "15k",
    image: "https://placehold.co/300x300/E11D48/FFFFFF?text=Serum",
    category: "Beauty",
    price_val: 150000,
  },
  {
    id: 5,
    name: "Professional Drawing Tablet",
    price: "Rp 999.000",
    originalPrice: "Rp 1.500.000",
    discount: 33,
    rating: "4.9",
    sold: "1.1k",
    image: "https://placehold.co/300x300/65A30D/FFFFFF?text=Tablet",
    category: "Hobbies",
    price_val: 999000,
  },
  {
    id: 6,
    name: "Smartwatch with GPS",
    price: "Rp 800.000",
    originalPrice: "Rp 1.000.000",
    discount: 20,
    rating: "4.7",
    sold: "3.2k",
    image: "https://placehold.co/300x300/1D4ED8/FFFFFF?text=Smartwatch",
    category: "Electronics",
    price_val: 800000,
  },
];

const initialFilters = { categories: [], minDiscount: 0 };

const PromoPage = () => {
  const [products, setProducts] = useState(allPromoProducts);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  useEffect(() => {
    let filtered = [...allPromoProducts];

    // Filtering logic
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
        filters.categories.includes(p.category)
      );
    }
    if (filters.minDiscount > 0) {
      filtered = filtered.filter((p) => p.discount >= filters.minDiscount);
    }

    setProducts(filtered);

    // Update active filter count
    const count = filters.categories.length + (filters.minDiscount > 0 ? 1 : 0);
    setActiveFilterCount(count);
  }, [filters]);

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
        <MobileTopNav />
        <MobileBottomNav />

        {/* Konten Utama Halaman */}
        <main className="container mx-auto px-4 py-8 pt-24 md:pt-8 pb-24 md:pb-8 space-y-12 md:space-y-16 lg:space-y-20">
          <BannerCarousel slides={slides} />

          <PromoFilterControls
            filters={filters}
            onFilterChange={handleFilterChange}
            onOpenFilterPanel={() => setIsFilterPanelOpen(true)}
            activeFilterCount={activeFilterCount}
          />

          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Today's Hottest Deals
          </h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h4 className="text-xl font-semibold mb-2">
                Oops! No deals found.
              </h4>
              <p className="text-muted-foreground">
                Try adjusting your filters to find amazing promotions.
              </p>
            </div>
          )}

          <PromoFilterPanel
            isOpen={isFilterPanelOpen}
            onClose={() => setIsFilterPanelOpen(false)}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PromoPage;
