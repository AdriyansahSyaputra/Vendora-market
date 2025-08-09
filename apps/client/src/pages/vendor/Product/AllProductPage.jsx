import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Templates/vendor/sidebar/Sidebar";
import Topbar from "@/components/Templates/company/topbar/Topbar";
import FilterSearch from "@/components/Layouts/vendor/Product/all-product/FilterSearch";
import ProductTable from "@/components/Layouts/vendor/Product/all-product/ProductTable";
import PaginationTable from "@/components/Elements/Pagination";
import EditProductModal from "@/components/Layouts/vendor/Product/all-product/EditProductModal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim("-"); // Remove leading/trailing hyphens
};

const categories = [
  { _id: "cat_electronics_123", name: "Electronics" },
  { _id: "cat_furniture_456", name: "Furniture" },
  { _id: "cat_wearables_789", name: "Wearables" },
];

// Enhanced dummy data with proper structure
const products = [
  {
    _id: "prod_12345",
    storeId: "store_abc",
    name: "Premium Wireless Headphones",
    description:
      "Experience immersive sound with these noise-cancelling headphones. Features a 20-hour battery life, comfortable earcups, and a sleek, modern design.",
    price: 1499000,
    discount: 15,
    category: "cat_electronics_123",
    stock: 0, // Main stock is 0 because it has variations
    isPromo: true,
    soldCount: 152,
    variations: [
      { size: "M", color: "Matte Black", stock: 25 },
      { size: "M", color: "Pearl White", stock: 18 },
    ],
    images: [
      "https://placehold.co/600x600/000000/FFFFFF?text=Main+Image",
      "https://placehold.co/600x600/e2e8f0/334155?text=Side+View",
    ],
    weight: 250,
    dimensions: { length: 18, width: 15, height: 8 },
    status: "active",
    averageRating: 4.8,
    totalReviews: 88,
    createdAt: "2024-02-10T10:15:00Z",
    updatedAt: "2024-03-08T16:45:00Z",
    tags: ["ergonomic", "office", "furniture", "productivity"],
    specifications: {
      Material: "Mesh and Plastic",
      "Weight Capacity": "120kg",
      "Height Adjustment": "Yes",
      "Lumbar Support": "Yes",
      Armrests: "Adjustable",
      Warranty: "3 years",
    },
  },
  {
    _id: "prod_12346",
    storeId: "store_abc",
    name: "Ergonomic Office Chair",
    description:
      "Stay comfortable during long working hours with this ergonomic chair. Adjustable height, lumbar support, and breathable mesh back.",
    price: 2499000,
    discount: 10,
    category: "cat_furniture_456",
    stock: 7, // Has main stock, no variations
    isPromo: false,
    soldCount: 78,
    variations: [],
    images: ["https://placehold.co/600x600/1e293b/FFFFFF?text=Front+View"],
    weight: 15000,
    dimensions: { length: 65, width: 65, height: 110 },
    status: "active",
    averageRating: 4.5,
    totalReviews: 45,
    createdAt: "2024-01-20T12:00:00Z",
    updatedAt: "2024-03-05T09:30:00Z",
    tags: ["smartwatch", "fitness", "health", "gps"],
    specifications: {
      Display: "1.4-inch AMOLED",
      "Battery Life": "7 days",
      "Water Resistance": "50 meters",
      GPS: "Built-in",
      "Heart Rate Monitor": "Yes",
      "Sleep Tracking": "Yes",
      Warranty: "2 years",
    },
  },
  {
    _id: "prod_12347",
    storeId: "store_abc",
    name: "Smart Fitness Watch",
    description:
      "Track your health and fitness goals with this advanced smartwatch. Features heart rate monitoring, GPS, and 7-day battery life.",
    price: 3299000,
    discount: 20,
    category: "cat_electronics_123",
    stock: 0,
    isPromo: true,
    soldCount: 234,
    variations: [
      { size: "42mm", color: "Space Gray", stock: 15 },
      { size: "42mm", color: "Silver", stock: 22 },
      { size: "46mm", color: "Space Gray", stock: 18 },
    ],
    images: [
      "https://placehold.co/600x600/1f2937/FFFFFF?text=Watch+Front",
      "https://placehold.co/600x600/374151/FFFFFF?text=Watch+Side",
    ],
    weight: 45,
    dimensions: { length: 4.5, width: 4.0, height: 1.2 },
    status: "active",
    averageRating: 4.6,
    totalReviews: 156,
    createdAt: "2024-01-15T08:30:00Z",
    updatedAt: "2024-03-10T14:22:00Z",
    tags: ["wireless", "bluetooth", "noise-cancelling", "premium"],
    specifications: {
      "Battery Life": "20 hours",
      Connectivity: "Bluetooth 5.0",
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 ohms",
      "Charging Port": "USB-C",
      Warranty: "2 years",
    },
  },
];

const ITEMS_PER_PAGE = 15;

const AllProductPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const currentProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleViewProduct = (product) => {
    const slug = createSlug(product.name);
    // Store product data in sessionStorage untuk diakses di detail page
    sessionStorage.setItem("currentProduct", JSON.stringify(product));
    // Navigate ke detail page dengan slug
    navigate(`/store/products/details/${slug}`);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      setLoading(true);
      // Add your delete API call here
      console.log("Deleting product:", productId);
      // await axios.delete(`/api/vendor/products/${productId}`, { withCredentials: true });

      // For now, just show success message
      alert("Product deleted successfully!");

      // Refresh the products list or remove from state
      // setProducts(products.filter(p => p._id !== productId));
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet title="All Products" />

      <div className="flex min-h-screen w-full bg-muted/40">
        {/* Sidebar Desktop */}
        <Sidebar isCollapsed={isCollapsed} />

        {/* Kontainer untuk Topbar dan Konten Utama */}
        <div className="flex flex-col w-full">
          <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

          {/* Konten Utama Halaman */}
          <main className="flex-1 p-4 sm:px-6 sm:py-6 space-y-4">
            <div className="flex flex-col gap-4 md:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>All Products</CardTitle>
                  <CardDescription>
                    Manage, filter, and view all your store products.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FilterSearch />
                  <ProductTable
                    currentProducts={currentProducts}
                    handleEditClick={handleEditClick}
                    handleViewProduct={handleViewProduct}
                    handleDeleteProduct={handleDeleteProduct}
                    currentPage={currentPage}
                    totalItems={ITEMS_PER_PAGE}
                    loading={loading}
                  />
                  {totalPages > 1 && (
                    <PaginationTable
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      totalPages={totalPages}
                    />
                  )}
                </CardContent>

                <EditProductModal
                  isEditDialogOpen={isEditDialogOpen}
                  selectedProduct={selectedProduct}
                  categories={categories}
                  onOpenChange={setIsEditDialogOpen}
                />
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AllProductPage;
