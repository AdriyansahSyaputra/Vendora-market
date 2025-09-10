import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useLocation, useParams } from "react-router-dom";
import DesktopNavbar from "@/components/Templates/client/navbar/DesktopNavbar";
import MobileTopNav from "@/components/Templates/client/navbar/MobileTopNav";
import MobileBottomNav from "@/components/Templates/client/navbar/MobileBottomNav";
import Footer from "@/components/Templates/client/footer/Footer";
import SearchView from "@/components/Elements/SearchView";
import ImageGallery from "@/components/Layouts/client/ProductDetail/ImageGallery";
import ProductInfo from "@/components/Layouts/client/ProductDetail/ProductInfo";
import VariationContent from "@/components/Layouts/client/ProductDetail/VariationContent";
import ReviewsSection from "@/components/Layouts/client/ProductDetail/ReviewsSection";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import VariationSelector from "@/components/Layouts/client/ProductDetail/VariationSelector";
import { Separator } from "@/components/ui/separator";
import FlashMessage from "@/components/Elements/FlashMessage";
import axios from "axios";
import { addToCartAsync, selectCartStatus } from "@/features/cart/cartSlice";

const ProductDetailPageClient = () => {
  const location = useLocation();
  const currentPage = location.pathname;
  const [isSearching, setIsSearching] = useState(false);
  const canSearch = currentPage === "/detail-product";

  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [notification, setNotification] = useState(null);

  const dispatch = useDispatch();
  const cartStatus = useSelector(selectCartStatus);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/client/product/${slug}`);
        setProduct(response.data);
      } catch (error) {
        setError("Failed to fetch product.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  const hasVariations = useMemo(
    () => Array.isArray(product?.variations) && product.variations.length > 0,
    [product]
  );

  // Dapatkan stok dari variasi yang dipilih
  const selectedVariationStock = useMemo(() => {
    if (!hasVariations || !selectedColor || !selectedSize) return null;
    const variation = product.variations.find(
      (v) => v.color === selectedColor && v.size === selectedSize
    );
    return variation ? variation.stock : null;
  }, [product, hasVariations, selectedColor, selectedSize]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
  };

  const handleSearchClick = () => {
    if (canSearch) {
      setIsSearching(true);
    }
  };

  const handleExitSearch = () => {
    setIsSearching(false);
  };

  useEffect(() => {
    setIsSearching(false);
  }, [currentPage]);

  const handleAddToCart = async () => {
    if (!product || (hasVariations && (!selectedColor || !selectedSize))) {
      setNotification({
        variant: "destructive",
        title: "Perhatian!",
        description: "Silakan pilih variasi produk terlebih dahulu.",
      });
      return;
    }

    let itemData;
    if (hasVariations) {
      const selectedVariation = product.variations.find(
        (v) => v.color === selectedColor && v.size === selectedSize
      );
      if (!selectedVariation) return;
      itemData = {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        variation: {
          variationId: selectedVariation._id,
          color: selectedVariation.color,
          size: selectedVariation.size,
        },
        quantity: 1,
        stock: selectedVariation.stock,
        storeId: product.storeId._id,
      };
    } else {
      itemData = {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        variation: null,
        quantity: 1,
        stock: product.stock,
        storeId: product.storeId._id,
      };
    }

    try {
      await dispatch(addToCartAsync(itemData)).unwrap();

      setNotification({
        variant: "success",
        title: "Berhasil!",
        description: `"${itemData.name}" telah ditambahkan ke keranjang.`,
      });
    } catch (error) {
      console.error("Gagal menambahkan ke keranjang:", error);
      setNotification({
        variant: "destructive",
        title: "Gagal Menambahkan",
        description: error.message || "Terjadi kesalahan. Coba lagi.",
      });
    }
  };

  const isAddToCartDisabled =
    (hasVariations ? !selectedColor || !selectedSize : product?.stock === 0) ||
    cartStatus === "loading";

  if (loading) return <div>Memuat produk...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Produk tidak ditemukan.</div>;

  return (
    <>
      <Helmet title="Product" />

      {notification && (
        <FlashMessage
          variant={notification.variant}
          title={notification.title}
          description={notification.description}
          onDismiss={() => setNotification(null)}
        />
      )}

      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        {/* Navbar Untuk Desktop */}
        <DesktopNavbar />

        {/* Navbar untuk Mobile */}
        <MobileTopNav page={currentPage} onSearchClick={handleSearchClick} />
        <MobileBottomNav />

        {isSearching && canSearch ? (
          <SearchView onBack={handleExitSearch} />
        ) : (
          <>
            {/* Konten Utama Halaman */}
            <main className="container mx-auto px-4 py-8 pt-24 md:pt-8 pb-24 md:pb-8 space-y-12 md:space-y-16 lg:space-y-20">
              <div className="bg-slate-100 dark:bg-slate-900 min-h-screen font-sans">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white dark:bg-slate-900 md:grid md:grid-cols-2 md:gap-8">
                    <div className="md:col-span-1">
                      <ImageGallery images={product.images} />
                    </div>

                    <div className="md:col-span-1">
                      <ProductInfo
                        product={product}
                        selectedVariationStock={selectedVariationStock}
                        hasVariations={hasVariations}
                      />

                      <Separator className="md:hidden" />

                      <Sheet>
                        <SheetTrigger asChild>
                          {hasVariations ? (
                            <button className="w-full text-left flex justify-between items-center p-4 md:hidden border-y border-slate-200 dark:border-slate-800">
                              <span className="text-slate-800 dark:text-slate-200 font-semibold">
                                Pilih Variasi (Warna, Ukuran)
                              </span>
                              <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                            </button>
                          ) : (
                            <div className="hidden"></div>
                          )}
                        </SheetTrigger>

                        <VariationContent
                          product={product}
                          selectedColor={selectedColor}
                          selectedSize={selectedSize}
                          selectedVariationStock={selectedVariationStock}
                          onColorSelect={handleColorSelect}
                          onSizeSelect={setSelectedSize}
                          isAddToCartDisabled={isAddToCartDisabled}
                        />
                      </Sheet>

                      <div className="hidden md:block p-6">
                        {hasVariations ? (
                          <VariationSelector
                            product={product}
                            selectedColor={selectedColor}
                            selectedSize={selectedSize}
                            onColorSelect={handleColorSelect}
                            onSizeSelect={setSelectedSize}
                          />
                        ) : (
                          <div className="hidden"></div>
                        )}

                        <Button
                          size="lg"
                          className="w-full mt-6"
                          disabled={isAddToCartDisabled}
                          onClick={handleAddToCart}
                        >
                          <ShoppingCart className="mr-2 h-5 w-5" />{" "}
                          {cartStatus === "loading"
                            ? "Menambahkan..."
                            : "Masukkan Keranjang"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator className="md:hidden" />

                  <div className="p-4 md:p-6 bg-white dark:bg-slate-900">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                      Deskripsi Produk
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                      {product.description}
                    </p>
                  </div>

                  <Separator className="md:hidden" />

                  <ReviewsSection />
                </div>
              </div>
            </main>
          </>
        )}

        <Footer />
      </div>
    </>
  );
};

export default ProductDetailPageClient;
