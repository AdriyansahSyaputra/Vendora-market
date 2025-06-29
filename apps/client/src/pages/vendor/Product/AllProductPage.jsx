import { useState } from "react";
import Sidebar from "@/components/Templates/vendor/sidebar/Sidebar";
import Topbar from "@/components/Templates/vendor/topbar/Topbar";
import FilterSearch from "@/components/Layouts/vendor/Product/all-product/FilterSearch";
import ProductTable from "@/components/Layouts/vendor/Product/all-product/ProductTable";
import PaginationTable from "@/components/Layouts/vendor/Product/all-product/Pagination";
import EditProductModal from "@/components/Layouts/vendor/Product/all-product/EditProductModal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Dummy Data
const products = Array.from({ length: 50 }, (_, i) => ({
  id: `PROD-${120 + i}`,
  imageUrl: `https://placehold.co/40x40/E2E8F0/4A5568?text=P${i + 1}`,
  name: `Premium Gadget ${i + 1}`,
  category:
    i % 3 === 0 ? "Electronics" : i % 3 === 1 ? "Accessories" : "Wearables",
  price: (Math.random() * 500 + 50).toFixed(2),
  stock: Math.floor(Math.random() * 100),
  sold: Math.floor(Math.random() * 500),
  description: `This is a detailed description for Premium Gadget ${
    i + 1
  }. It's the best in the market.`,
}));

const ITEMS_PER_PAGE = 15;

const AllProductPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const currentProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  return (
    <>
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
                    currentPage={currentPage}
                    totalItems={ITEMS_PER_PAGE}
                  />
                  <PaginationTable
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                  />
                </CardContent>

                <EditProductModal
                  isEditDialogOpen={isEditDialogOpen}
                  setIsEditDialogOpen={setIsEditDialogOpen}
                  selectedProduct={selectedProduct}
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
