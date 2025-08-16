import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "@/components/Templates/vendor/sidebar/Sidebar";
import Topbar from "@/components/Templates/company/topbar/Topbar";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import HeaderAction from "@/components/Layouts/vendor/Product/product-detail/HeaderAction";
import ProductImages from "@/components/Layouts/vendor/Product/product-detail/ProductImages";
import DetailedInformationTabs from "@/components/Layouts/vendor/Product/product-detail/DetailedInformationTabs";
import ProductSummary from "@/components/Layouts/vendor/Product/product-detail/ProductSummary";
import Timestamps from "@/components/Layouts/vendor/Product/product-detail/Timestamps";
import QuickActions from "@/components/Layouts/vendor/Product/product-detail/QuickActions";
import PerformanceMetrics from "@/components/Layouts/vendor/Product/product-detail/PerformanceMetrics";
import InventoryAlert from "@/components/Layouts/vendor/Product/product-detail/InventoryAlert";
import axios from "axios";
import { toast } from "sonner";

// Utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString) => {
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
};

const calculateTotalStock = (product) => {
  if (product.variations && product.variations.length > 0) {
    return product.variations.reduce(
      (total, variation) => total + variation.stock,
      0
    );
  }
  return product.stock || 0;
};

const getStockStatus = (stock) => {
  if (stock === 0)
    return {
      variant: "destructive",
      label: "Out of Stock",
      icon: AlertTriangle,
      color: "text-red-600",
    };
  if (stock < 10)
    return {
      variant: "destructive",
      label: "Low Stock",
      icon: AlertTriangle,
      color: "text-orange-600",
    };
  if (stock < 50)
    return {
      variant: "secondary",
      label: "Medium Stock",
      icon: Clock,
      color: "text-yellow-600",
    };
  return {
    variant: "default",
    label: "In Stock",
    icon: CheckCircle,
    color: "text-green-600",
  };
};

const getStatusConfig = (status) => {
  const configs = {
    active: {
      variant: "default",
      label: "Active",
      color: "text-green-600",
      bg: "bg-green-50 border-green-200",
    },
    inactive: {
      variant: "secondary",
      label: "Inactive",
      color: "text-gray-600",
      bg: "bg-gray-50 border-gray-200",
    },
    draft: {
      variant: "outline",
      label: "Draft",
      color: "text-orange-600",
      bg: "bg-orange-50 border-orange-200",
    },
  };
  return configs[status] || configs.draft;
};

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchProductBySlug = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/vendor/product/details/${slug}`,
          {
            withCredentials: true,
          }
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    // Pastikan slug ada sebelum mencoba mengambil data
    if (slug) {
      fetchProductBySlug();
    }
  }, [slug]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    // Untuk sementara redirect ke halaman products
    // Nanti bisa diintegrasikan dengan edit modal atau halaman edit terpisah
    alert("Edit functionality - akan diintegrasikan dengan EditProductModal");
    navigate("/store/products");
    
  };

  const handleDelete = async () => {
    try {
      // Panggil API delete Anda di sini
      await axios.delete(`/api/vendor/product/${product._id}/delete`, {
        withCredentials: true,
      });
      toast.success("Product deleted successfully!");
      navigate("/store/products"); // Langsung navigasi
    } catch (error) {
      // ...
    }
  };

  const copyProductUrl = () => {
    // URL untuk customer store (bukan vendor dashboard)
    const customerProductUrl = `${window.location.origin}/product/${slug}`;
    navigator.clipboard.writeText(customerProductUrl);
    alert("Product URL copied to clipboard!");
  };

  const viewInCustomerStore = () => {
    // Buka halaman customer store di tab baru
    const customerProductUrl = `${window.location.origin}/product/${slug}`;
    window.open(customerProductUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen w-full bg-muted/40">
        <Sidebar isCollapsed={isCollapsed} />
        <div className="flex flex-col w-full">
          <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          <main className="flex-1 p-4 sm:px-6 sm:py-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-96 bg-muted rounded"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-6 bg-muted rounded w-1/4"></div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen w-full bg-muted/40">
        <Sidebar isCollapsed={isCollapsed} />
        <div className="flex flex-col w-full">
          <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          <main className="flex-1 p-4 sm:px-6 sm:py-6">
            <div className="text-center py-12">
              <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The product you're looking for doesn't exist or has been
                removed.
              </p>
              <Button onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const totalStock = calculateTotalStock(product);
  const stockStatus = getStockStatus(totalStock);
  const statusConfig = getStatusConfig(product.status);
  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <>
      <Helmet title={`${product.name} - Product Details`} />

      <div className="flex min-h-screen w-full bg-muted/40">
        <Sidebar isCollapsed={isCollapsed} />

        <div className="flex flex-col w-full">
          <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

          <main className="flex-1 p-4 sm:px-6 sm:py-6 space-y-6">
            {/* Header */}
            <HeaderAction
              product={product}
              handleBack={handleBack}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              copyProductUrl={copyProductUrl}
              viewInCustomerStore={viewInCustomerStore}
            />

            {/* Main Content */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Left Column - Product Images & Basic Info */}
              <div className="xl:col-span-2 space-y-6">
                {/* Product Images */}
                <ProductImages
                  product={product}
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                />

                {/* Detailed Information Tabs */}
                <DetailedInformationTabs
                  product={product}
                  totalStock={totalStock}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  formatCurrency={formatCurrency}
                  discountedPrice={discountedPrice}
                />
              </div>

              {/* Right Column - Product Summary & Actions */}
              <div className="xl:col-span-1 space-y-6">
                {/* Product Summary */}
                <ProductSummary
                  product={product}
                  totalStock={totalStock}
                  discountedPrice={discountedPrice}
                  stockStatus={stockStatus}
                  statusConfig={statusConfig}
                  formatCurrency={formatCurrency}
                />

                {/* Timestamps */}
                {(product.createdAt || product.updatedAt) && (
                  <Timestamps product={product} formatDate={formatDate} />
                )}

                {/* Quick Actions */}
                <QuickActions
                  product={product}
                  handleEdit={handleEdit}
                  copyProductUrl={copyProductUrl}
                  handleDelete={handleDelete}
                  viewInCustomerStore={viewInCustomerStore}
                />

                {/* Performance Metrics */}
                <PerformanceMetrics
                  product={product}
                  discountedPrice={discountedPrice}
                  formatCurrency={formatCurrency}
                />

                {/* Inventory Alert */}
                {totalStock < 10 && <InventoryAlert totalStock={totalStock} />}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
