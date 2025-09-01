import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
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

const mockProduct = {
  name: "Pro-Level Wireless Over-Ear Headphones",
  images: [
    "https://placehold.co/600x600/E2E8F0/475569?text=Main+Image+1",
    "https://placehold.co/600x600/CBD5E1/475569?text=Side+View+2",
    "https://placehold.co/600x600/94A3B8/FFFFFF?text=Folded+3",
    "https://placehold.co/600x600/64748B/FFFFFF?text=Case+4",
    "https://placehold.co/600x600/475569/FFFFFF?text=Detail+5",
    "https://placehold.co/600x600/334155/FFFFFF?text=On+Stand+6",
  ],
  price: 2499000,
  originalPrice: 3200000,
  discountPercentage: 22,
  soldCount: 1738,
  stock: 215,
  description:
    "Experience unparalleled sound quality with our new Pro-Level headphones. Featuring active noise cancellation, a 30-hour battery life, and crystal-clear microphone for calls. Made with premium materials for maximum comfort, these headphones are perfect for audiophiles, gamers, and professionals on the go. Seamlessly connect to all your devices with Bluetooth 5.2 technology.",
  variations: {
    colors: [
      { name: "Midnight Black", value: "black", inStock: true },
      { name: "Arctic White", value: "white", inStock: true },
      { name: "Navy Blue", value: "blue", inStock: false },
      { name: "Crimson Red", value: "red", inStock: true },
    ],
    sizes: [{ name: "Standard Fit", value: "std", inStock: true }],
  },
  reviews: [
    {
      id: 1,
      user: {
        name: "Budi S.",
        avatar: "https://i.pravatar.cc/40?u=a042581f4e29026704d",
      },
      rating: 5,
      date: "2024-08-15",
      comment:
        "Kualitas suaranya luar biasa! ANC-nya berfungsi dengan sangat baik, nyaman dipakai berjam-jam. Worth every penny!",
      images: ["https://placehold.co/100x100/E2E8F0/475569?text=Review+1"],
      likes: 28,
      dislikes: 0,
      sellerReply: {
        sellerName: "AudioPhile Store",
        comment:
          "Terima kasih atas ulasan positifnya, Kak Budi! Senang mendengar Anda puas dengan produk kami. Selamat menikmati musik berkualitas!",
      },
    },
    {
      id: 2,
      user: {
        name: "Citra W.",
        avatar: "https://i.pravatar.cc/40?u=a042581f4e29026705d",
      },
      rating: 4,
      date: "2024-08-12",
      comment:
        "Desainnya elegan dan baterainya awet banget. Sedikit masukan, earcupnya agak panas kalau dipakai di luar ruangan. Tapi overall sangat memuaskan.",
      images: [],
      likes: 12,
      dislikes: 1,
      sellerReply: null,
    },
    {
      id: 3,
      user: {
        name: "Agus P.",
        avatar: "https://i.pravatar.cc/40?u=a042581f4e29026706d",
      },
      rating: 5,
      date: "2024-08-10",
      comment:
        "Mantap, pengiriman cepat, packing aman. Produk original dan berfungsi sempurna. Recommended seller!",
      images: [
        "https://placehold.co/100x100/CBD5E1/475569?text=Review+2",
        "https://placehold.co/100x100/94A3B8/FFFFFF?text=Review+3",
      ],
      likes: 19,
      dislikes: 0,
      sellerReply: null,
    },
    {
      id: 4,
      user: {
        name: "Dewi K.",
        avatar: "https://i.pravatar.cc/40?u=a042581f4e29026707d",
      },
      rating: 5,
      date: "2024-08-09",
      comment:
        "Suka banget sama warnanya. Koneksi Bluetooth stabil, gak pernah putus-putus. Keren!",
      images: [],
      likes: 8,
      dislikes: 0,
      sellerReply: null,
    },
    {
      id: 5,
      user: {
        name: "Eko N.",
        avatar: "https://i.pravatar.cc/40?u=a042581f4e29026708d",
      },
      rating: 4,
      date: "2024-08-05",
      comment:
        "Build quality-nya kokoh. Untuk harga segini, fitur yang didapat sangat lengkap. Mungkin bisa ditambahkan app companion untuk equalizer.",
      images: [],
      likes: 5,
      dislikes: 2,
      sellerReply: null,
    },
  ],
};

const ProductDetailPageClient = () => {
  const location = useLocation();
  const currentPage = location.pathname;
  const [isSearching, setIsSearching] = useState(false);
  const canSearch = currentPage === "/trending";

  const product = mockProduct;

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

  return (
    <>
      <Helmet title="Product" />

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
              <div className="bg-slate-100 dark:bg-slate-950 min-h-screen font-sans">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white dark:bg-slate-900 md:grid md:grid-cols-2 md:gap-8">
                    <div className="md:col-span-1">
                      <ImageGallery images={product.images} />
                    </div>
                    <div className="md:col-span-1">
                      <ProductInfo product={product} />
                      <div className="h-2 bg-slate-100 dark:bg-slate-950 md:hidden"></div>
                      <Sheet>
                        <SheetTrigger asChild>
                          <button className="w-full text-left flex justify-between items-center p-4 md:hidden border-y border-slate-200 dark:border-slate-800">
                            <span className="text-slate-800 dark:text-slate-200 font-semibold">
                              Pilih Variasi (Warna, Ukuran)
                            </span>
                            <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                          </button>
                        </SheetTrigger>
                        <VariationContent product={product} />
                      </Sheet>
                      <div className="hidden md:block p-6">
                        <div>
                          <h3 className="text-md font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Warna
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {product.variations.colors.map((color) => (
                              <Button
                                key={color.value}
                                variant={"outline"}
                                disabled={!color.inStock}
                                className="disabled:bg-slate-100 disabled:text-slate-400 disabled:line-through dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
                              >
                                {color.name}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <Button size="lg" className="w-full mt-6">
                          <ShoppingCart className="mr-2 h-5 w-5" /> Masukkan
                          Keranjang
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-950"></div>
                  <div className="p-4 md:p-6 bg-white dark:bg-slate-900">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                      Deskripsi Produk
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                      {product.description}
                    </p>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-950"></div>
                  <ReviewsSection reviews={product.reviews} />
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
