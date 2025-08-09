import { useState, useEffect } from "react";
import Sidebar from "@/components/Templates/vendor/sidebar/Sidebar";
import Topbar from "@/components/Templates/company/topbar/Topbar";
import CategoryCard from "@/components/Layouts/vendor/Product/categories/CategoryCard";
import CategoryFormDialog from "@/components/Layouts/vendor/Product/categories/CategoryFormDialog";
import DeleteConfirmationDialog from "@/components/Layouts/vendor/Product/categories/DeleteConfirmationDialog";
import { Helmet } from "react-helmet-async";
import { LoaderCircle } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const CategoryPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  console.log(categories);

  // State untuk dialog, dikontrol dari sini
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/vendor/product-category", {
        withCredentials: true,
      });
      if (Array.isArray(data.categories)) {
        setCategories(data.categories);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handler untuk membuka dialog tambah
  const handleAddClick = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  // Handler untuk membuka dialog edit
  const handleEditClick = (category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  // Handler untuk membuka dialog hapus
  const handleDeleteClick = (category) => {
    setDeletingCategory(category);
    setIsDeleteConfirmOpen(true);
  };

  // Handler untuk submit form (Create & Update)
  const handleFormSubmit = async (formData) => {
    const isEditing = Boolean(editingCategory);
    try {
      if (isEditing) {
        await axios.put(
          `/api/vendor/product-category/${editingCategory._id}/update`,
          formData,
          { withCredentials: true }
        );
        toast.success("Category updated successfully.");
      } else {
        await axios.post("/api/vendor/product-category/create", formData, {
          withCredentials: true,
        });
        toast.success("Category created successfully.");
      }
      fetchCategories();
      setIsFormOpen(false); // Tutup dialog setelah berhasil
    } catch (err) {
      console.error("Failed to save category:", err);
      toast.error("Failed to save category.", {
        description: err.response?.data?.message || "An error occurred.",
      });
    }
  };

  // Handler untuk konfirmasi hapus
  const handleDeleteConfirm = async () => {
    if (!deletingCategory) return;
    try {
      await axios.delete(
        `/api/vendor/product-category/${deletingCategory._id}/delete`,
        { withCredentials: true }
      );
      toast.success("Category deleted successfully.");
      fetchCategories();
      setIsDeleteConfirmOpen(false); // Tutup dialog setelah berhasil
    } catch (err) {
      console.error("Failed to delete category:", err);
      toast.error("Failed to delete category.", {
        description: err.response?.data?.message || "An error occurred.",
      });
    }
  };

  return (
    <>
      <Helmet title="Categories" />

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
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Product Categories
                </h1>
                <p className="text-muted-foreground">
                  Manage all categories related to your store's products.
                </p>
              </div>

              <div className="flex justify-end mb-8">
                <Button className="cursor-pointer" onClick={handleAddClick}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Category
                </Button>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <LoaderCircle className="animate-spin h-8 w-8" />
                </div>
              ) : categories.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <p className="text-lg font-medium text-muted-foreground mb-2">
                    No categories found
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create your first category to get started
                  </p>
                  <Button onClick={handleAddClick}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add First Category
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {categories.map((category) => (
                    <CategoryCard
                      key={category._id}
                      category={category}
                      onEditClick={() => handleEditClick(category)}
                      onDeleteClick={() => handleDeleteClick(category)}
                    />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Dialog dirender di sini, di luar loop, dan dikontrol oleh state */}
      <CategoryFormDialog
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        initialData={editingCategory}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
        onConfirm={handleDeleteConfirm}
        categoryName={deletingCategory?.name}
      />
    </>
  );
};

export default CategoryPage;
