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
import axios from "axios";

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

const initialFilters = {
  categories: [],
  rating: 0,
  withDiscount: false,
  priceRange: [10000000, 10000000],
};

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [sortOption, setSortOption] = useState("popular");
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  useEffect(() => {
    // Fetch products from backend API
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/client/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

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
