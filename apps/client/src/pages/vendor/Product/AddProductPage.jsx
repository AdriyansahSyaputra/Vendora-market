import { useState, useEffect } from "react";
import Sidebar from "@/components/Templates/vendor/sidebar/Sidebar";
import Topbar from "@/components/Templates/company/topbar/Topbar";
import AddProduct from "@/components/Layouts/vendor/Product/AddProduct";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const AddProductPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
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
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Helmet title="Add Product" />

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
                  Add Product
                </h1>
                <p className="text-muted-foreground">
                  Add a new product to your store.
                </p>
              </div>

              <AddProduct categories={categories} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AddProductPage;
