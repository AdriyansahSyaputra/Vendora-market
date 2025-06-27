import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import DesktopNavbar from "@/components/Templates/client/navbar/DesktopNavbar";
import MobileTopNav from "@/components/Templates/client/navbar/MobileTopNav";
import MobileBottomNav from "@/components/Templates/client/navbar/MobileBottomNav";
import Footer from "@/components/Templates/client/footer/Footer";
import BannerCarousel from "@/components/Elements/BannerCarousel";
import {
  AllProductsFilterControls,
  AllProductsFilterPanel,
} from "@/components/Layouts/client/Product/ProductFilters";
import ProductCard from "@/components/Elements/ProductCard";

const slides = [
  {
    img: "https://placehold.co/1200x500/111827/FFFFFF?text=Vendora+Collection",
    title: "Vendora Collection",
    desc: "Discover the latest fashion trends from Vendora Collection.",
    cta: "Shop Now",
  },
  {
    img: "https://placehold.co/1200x500/059669/FFFFFF?text=Mid-Year+Mega+Deals",
    title: "Mid-Year Mega Deals",
    desc: "Unbeatable prices on thousands of items. Up to 80% off!",
    cta: "Shop Deals",
  },
  {
    img: "https://placehold.co/1200x500/DB2777/FFFFFF?text=Beauty+Product+Sale",
    title: "Beauty Product Sale",
    desc: "Get your glow on with buy 1 get 1 free on selected beauty products.",
    cta: "Explore Beauty",
  },
];

const allProductsFromDB = [
  {
    id: 1,
    name: "Wireless Gaming Mouse RGB",
    price: "Rp 450.000",
    originalPrice: "Rp 900.000",
    discount: 50,
    rating: 4.9,
    sold: 1500,
    image: "https://placehold.co/300x300/4F46E5/FFFFFF?text=Mouse",
    category: "Electronics",
    price_val: 450000,
    date: "2025-06-25",
  },
  {
    id: 2,
    name: "Premium Cotton Hoodie",
    price: "Rp 400.000",
    originalPrice: null,
    discount: null,
    rating: 4.8,
    sold: 2800,
    image: "https://placehold.co/300x300/0D9488/FFFFFF?text=Hoodie",
    category: "Fashion",
    price_val: 400000,
    date: "2025-06-24",
  },
  {
    id: 3,
    name: "Robot Vacuum Cleaner Pro",
    price: "Rp 2.500.000",
    originalPrice: "Rp 3.500.000",
    discount: 28,
    rating: 4.9,
    sold: 800,
    image: "https://placehold.co/300x300/9333EA/FFFFFF?text=Vacuum",
    category: "Home & Kitchen",
    price_val: 2500000,
    date: "2025-06-26",
  },
  {
    id: 4,
    name: "Anti-Aging Face Serum",
    price: "Rp 200.000",
    originalPrice: null,
    discount: null,
    rating: 4.8,
    sold: 15000,
    image: "https://placehold.co/300x300/E11D48/FFFFFF?text=Serum",
    category: "Beauty",
    price_val: 200000,
    date: "2025-06-22",
  },
  {
    id: 5,
    name: "Professional Drawing Tablet",
    price: "Rp 999.000",
    originalPrice: "Rp 1.500.000",
    discount: 33,
    rating: 4.9,
    sold: 1100,
    image: "https://placehold.co/300x300/65A30D/FFFFFF?text=Tablet",
    category: "Hobbies",
    price_val: 999000,
    date: "2025-06-20",
  },
  {
    id: 6,
    name: "Smartwatch with GPS",
    price: "Rp 1.000.000",
    originalPrice: null,
    discount: null,
    rating: 4.7,
    sold: 3200,
    image: "https://placehold.co/300x300/1D4ED8/FFFFFF?text=Smartwatch",
    category: "Electronics",
    price_val: 1000000,
    date: "2025-06-23",
  },
  {
    id: 7,
    name: "Yoga Mat Non-Slip",
    price: "Rp 350.000",
    originalPrice: null,
    discount: null,
    rating: 4.6,
    sold: 5000,
    image: "https://placehold.co/300x300/16A34A/FFFFFF?text=Yoga+Mat",
    category: "Sports",
    price_val: 350000,
    date: "2025-05-10",
  },
];

const initialFilters = {
  categories: [],
  rating: 0,
  withDiscount: false,
  priceRange: [10000000, 10000000],
};

const ProductPage = () => {
  const [products, setProducts] = useState(allProductsFromDB);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [sortOption, setSortOption] = useState("popular");
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  useEffect(() => {
    let filtered = [...allProductsFromDB];

    // Apply filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
        filters.categories.includes(p.category)
      );
    }
    if (filters.rating > 0) {
      filtered = filtered.filter((p) => p.rating >= filters.rating);
    }
    if (filters.withDiscount) {
      filtered = filtered.filter((p) => p.discount);
    }
    filtered = filtered.filter((p) => p.price_val <= filters.priceRange[0]);

    // Apply sorting
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

    // Update active filter count
    const count =
      filters.categories.length +
      (filters.rating > 0 ? 1 : 0) +
      (filters.withDiscount ? 1 : 0) +
      (filters.priceRange[0] < 10000000 ? 1 : 0);
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
        <MobileTopNav />
        <MobileBottomNav />

        {/* Konten Utama Halaman */}
        <main className="container mx-auto px-4 py-8 pt-24 md:pt-8 pb-24 md:pb-8 space-y-12 md:space-y-16 lg:space-y-20">
          <BannerCarousel slides={slides} />
          <AllProductsFilterControls
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
              <h4 className="text-xl font-semibold mb-2">No Products Found</h4>
              <p className="text-muted-foreground">
                Try adjusting your filters to find what you're looking for.
              </p>
            </div>
          )}

          <AllProductsFilterPanel
            isOpen={isFilterPanelOpen}
            onClose={() => setIsFilterPanelOpen(false)}
            filters={filters}
            onFilterChange={handleFilterChange}
            sortOption={sortOption}
            onSortChange={setSortOption}
          />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProductPage;
