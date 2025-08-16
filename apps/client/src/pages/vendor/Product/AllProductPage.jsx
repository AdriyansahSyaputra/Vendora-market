import { useState, useEffect, useCallback } from "react";
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
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

const ITEMS_PER_PAGE = 10;

const AllProductPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    searchQuery: "",
    category: "all",
    stock: "",
  });
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      discount: 0,
      category: "",
      stock: 0,
      isPromo: false,
      status: "active",
      weight: 0,
      dimensions: {
        length: undefined,
        width: undefined,
        height: undefined,
      },
      variations: [],
      images: [],
    },
  });

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const currentProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Fetch products data
  const fetchFilteredProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        search: filters.searchQuery,
        category: filters.category !== "all" ? filters.category : undefined,
        stock: filters.stock,
      };
      const res = await axios.get("/api/vendor/products", {
        params,
        withCredentials: true,
      });
      setProducts(res.data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch Categories data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/vendor/product-category", {
          withCredentials: true,
        });
        setCategories(res.data.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchFilteredProducts();
  }, [fetchFilteredProducts]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  const createProductFormData = (data) => {
    const formData = new FormData();

    const existingImageUrls =
      data.images?.filter((img) => typeof img === "string") || [];
    const newImageFiles =
      data.images?.filter((img) => img instanceof File) || [];

    formData.append("existingImages", JSON.stringify(existingImageUrls));

    newImageFiles.forEach((file) => {
      formData.append("images", file);
    });

    Object.keys(data).forEach((key) => {
      if (key !== "images") {
        const value = data[key];
        if (typeof value === "object" && value !== null) {
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      }
    });

    return formData;
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrors([]);

    const formData = createProductFormData(data);

    try {
      await axios.put(
        `/api/vendor/product/${selectedProduct._id}/update`,
        formData,
        { withCredentials: true }
      );

      toast.success("Product updated successfully!");
      fetchFilteredProducts();
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
      const errorData = error.response?.data;

      // Handle jika ada error validasi dari server
      if (errorData && errorData.errors) {
        Object.entries(errorData.errors).forEach(([field, message]) => {
          form.setError(field, { type: "server", message });
        });
        toast.error("Validation failed. Please check the form.");
      } else {
        setErrors([
          errorData?.message || "Failed to update product. Please try again.",
        ]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewProduct = (product) => {
    const identifier = product.slug || product._id;
    navigate(`/store/products/details/${identifier}`);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      setLoading(true);

      await axios.delete(`/api/vendor/product/${productId}/delete`, {
        withCredentials: true,
      });

      toast.success("Product deleted successfully.");
      fetchFilteredProducts();
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

      <Toaster richColors position="top-center" />

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
                  <FilterSearch
                    categories={categories}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                  />
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
                  onSubmit={onSubmit}
                  isSubmitting={isSubmitting}
                  errors={errors}
                  setErrors={setErrors}
                  form={form}
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
