import { useState, useMemo } from "react";
import Sidebar from "@/components/Templates/company/sidebar/Sidebar";
import Topbar from "@/components/Templates/company/topbar/Topbar";
import { Helmet } from "react-helmet-async";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProductTable from "@/components/Layouts/company/Product/All-product/ProductTable";
import ProductDetailsModal from "@/components/Layouts/company/Product/All-product/ProductDetailModal";
import DeleteProductModal from "@/components/Layouts/company/Product/All-product/DeleteProductModal";
import PaginationTable from "@/components/Elements/Pagination";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectContent } from "@/components/ui/select";

const allProductsData = [
  {
    id: 1,
    sku: "SKU-001-XYZ",
    name: "Premium Wireless Headphones",
    category: "Electronics",
    type: "Audio",
    distributor: "Global Tech Inc.",
    sellerName: "Electro World",
    totalStock: 150,
    price: 249.99,
    description: "High-fidelity sound with noise-cancellation technology.",
  },
  {
    id: 2,
    sku: "SKU-002-ABC",
    name: "Organic Cotton T-Shirt",
    category: "Fashion",
    type: "Apparel",
    distributor: "Eco Threads",
    sellerName: "Green Style Co.",
    totalStock: 300,
    price: 29.99,
    description: "Made from 100% certified organic cotton.",
  },
  {
    id: 3,
    sku: "SKU-003-DEF",
    name: "Stainless Steel Water Bottle",
    category: "Home & Kitchen",
    type: "Drinkware",
    distributor: "Hydrate Well",
    sellerName: "Kitchen Essentials",
    totalStock: 500,
    price: 19.99,
    description: "Keeps drinks cold for 24 hours or hot for 12 hours.",
  },
  {
    id: 4,
    sku: "SKU-004-GHI",
    name: "Advanced Vitamin C Serum",
    category: "Beauty & Health",
    type: "Skincare",
    distributor: "Glow Up Cosmetics",
    sellerName: "Beauty Bliss",
    totalStock: 85,
    price: 45.0,
    description: "Brightens skin and reduces signs of aging.",
  },
  {
    id: 5,
    sku: "SKU-005-JKL",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    type: "Office",
    distributor: "Comfort Seating",
    sellerName: "Office Pro",
    totalStock: 40,
    price: 399.0,
    description: "Full-day comfort with adjustable lumbar support.",
  },
  {
    id: 6,
    sku: "SKU-006-MNO",
    name: "The Art of Programming",
    category: "Books",
    type: "Education",
    distributor: "Knowledge Press",
    sellerName: "Bookworm Haven",
    totalStock: 120,
    price: 59.5,
    description: "A comprehensive guide to modern software development.",
  },
  {
    id: 7,
    sku: "SKU-007-PQR",
    name: "Smart LED Light Bulb",
    category: "Electronics",
    type: "Smart Home",
    distributor: "Global Tech Inc.",
    sellerName: "Electro World",
    totalStock: 0,
    price: 15.99,
    description: "Controllable via app, supports 16 million colors.",
  },
  {
    id: 8,
    sku: "SKU-008-STU",
    name: "Gourmet Coffee Beans",
    category: "Groceries",
    type: "Beverages",
    distributor: "Fresh Roast Co.",
    sellerName: "The Daily Grind",
    totalStock: 250,
    price: 22.5,
    description: "Single-origin Arabica beans from Ethiopia.",
  },
  {
    id: 9,
    sku: "SKU-009-VWX",
    name: "Yoga Mat with Strap",
    category: "Sports",
    type: "Fitness",
    distributor: "Active Life Gear",
    sellerName: "Fit Zone",
    totalStock: 180,
    price: 35.0,
    description: "Non-slip, eco-friendly material for all types of yoga.",
  },
  {
    id: 10,
    sku: "SKU-010-YZA",
    name: "Leather Messenger Bag",
    category: "Fashion",
    type: "Accessories",
    distributor: "Urban Carry",
    sellerName: "Style Forward",
    totalStock: 60,
    price: 120.0,
    description: "Handcrafted from genuine full-grain leather.",
  },
  {
    id: 11,
    sku: "SKU-011-BCD",
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    type: "Audio",
    distributor: "Global Tech Inc.",
    sellerName: "Electro World",
    totalStock: 200,
    price: 79.99,
    description: "Waterproof with 12-hour battery life.",
  },
];

const categories = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty & Health",
  "Furniture",
  "Books",
  "Groceries",
  "Sports",
];

const AllProductPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [products, setProducts] = useState(allProductsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const ITEMS_PER_PAGE = 10;

  const filteredProducts = useMemo(() => {
    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(
        (product) =>
          categoryFilter === "All" || product.category === categoryFilter
      );
    // Note: Date filtering logic would require product creation dates and is omitted for simplicity.
  }, [products, searchQuery, categoryFilter]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const handleOpenDetailModal = (product) => {
    setSelectedProduct(product);
    setDetailModalOpen(true);
  };

  const handleOpenDeleteModal = (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = (productId, reason) => {
    console.log(`Deleting product ${productId} for reason: ${reason}`);
    setProducts(products.filter((p) => p.id !== productId));
    setDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <Helmet title="All Product" />

      <div className="flex min-h-screen max-w-full bg-muted/40">
        {/* Sidebar Desktop */}
        <Sidebar isCollapsed={isCollapsed} />

        <div
          className={`flex flex-col w-full transition-all duration-300 ${
            isCollapsed ? "md:ml-20" : "md:ml-64"
          }`}
        >
          <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

          <main className="flex-1 p-4 sm:px-6 sm:py-6 space-y-4 ">
            <div className="flex flex-col gap-4 md:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>All Users</CardTitle>
                  <CardDescription>
                    Manage, filter, and view all your company users.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Filter Section */}
                  <div className="flex flex-col sm:flex-row gap-2 mb-4">
                    <Input
                      placeholder="Search by name or SKU..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="flex-grow"
                    />
                    <div className="flex gap-2">
                      <Select
                        value={categoryFilter}
                        onChange={(e) => {
                          setCategoryFilter(e.target.value);
                          setCurrentPage(1);
                        }}
                      >
                        <SelectContent>
                          <SelectItem value="All">All Categories</SelectItem>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="w-full sm:w-auto"
                      />
                    </div>
                  </div>

                  {/* Product Table */}
                  <ProductTable
                    products={paginatedProducts}
                    handleOpenDetailModal={handleOpenDetailModal}
                    handleOpenDeleteModal={handleOpenDeleteModal}
                  />

                  {/* Pagination */}
                  <PaginationTable
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                  />
                </CardContent>
              </Card>
            </div>
          </main>

          {/* Modals */}
          <ProductDetailsModal
            product={selectedProduct}
            isOpen={isDetailModalOpen}
            onClose={() => setDetailModalOpen(false)}
          />
          <DeleteProductModal
            product={selectedProduct}
            isOpen={isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleDeleteConfirm}
          />
        </div>
      </div>
    </>
  );
};

export default AllProductPage;
