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
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim("-"); // Remove leading/trailing hyphens
};

const ITEMS_PER_PAGE = 15;

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
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/vendor/products", {
        withCredentials: true,
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Categories data
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

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrors([]); // Bersihkan error sebelumnya

    // 1. Buat instance FormData
    const formData = new FormData();

    // 2. Pisahkan antara URL gambar lama (string) dan file gambar baru (object)
    const existingImageUrls = data.images.filter(
      (img) => typeof img === "string"
    );
    const newImageFiles = data.images.filter((img) => img instanceof File);

    // 3. Tambahkan URL lama ke field 'existingImages'. Backend akan menggunakan ini.
    // WAJIB di-stringify agar bisa dikirim sebagai satu field.
    formData.append("existingImages", JSON.stringify(existingImageUrls));

    // 4. Tambahkan file-file baru. Multer di backend akan menangkap ini di `req.files`.
    newImageFiles.forEach((file) => {
      formData.append("images", file); // Nama field 'images' harus cocok dengan multer
    });

    // 5. Tambahkan sisa data form ke FormData
    Object.keys(data).forEach((key) => {
      if (key !== "images") {
        // Lewati 'images' karena sudah diproses
        const value = data[key];
        // Objek/Array perlu di-stringify
        if (typeof value === "object" && value !== null) {
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      }
    });

    try {
      // 6. Kirim FormData ke API. Axios akan otomatis mengatur header yang benar.
      await axios.put(
        `/api/vendor/product/${selectedProduct._id}/update`,
        formData,
        { withCredentials: true }
      );

      toast.success("Product updated successfully!");
      fetchProducts(); // Muat ulang daftar produk
      setIsEditDialogOpen(false); // Tutup modal
    } catch (error) {
      console.error("Error updating product:", error);
      const errorData = error.response?.data;

      // Tampilkan error validasi dari server ke field yang sesuai
      if (errorData && errorData.errors) {
        Object.entries(errorData.errors).forEach(([field, message]) => {
          form.setError(field, { type: "server", message });
        });
        toast.error("Validation failed. Please check the form.");
      } else {
        // Tampilkan error umum
        setErrors([
          errorData?.message || "Failed to update product. Please try again.",
        ]);
      }
    } finally {
      setIsSubmitting(false); // Pastikan tombol submit aktif kembali
    }
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
