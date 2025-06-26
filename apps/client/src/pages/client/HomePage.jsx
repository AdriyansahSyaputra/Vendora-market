import { Helmet } from "react-helmet-async";
import DesktopNavbar from "@/components/Templates/client/navbar/DesktopNavbar";
import MobileTopNav from "@/components/Templates/client/navbar/MobileTopNav";
import MobileBottomNav from "@/components/Templates/client/navbar/MobileBottomNav";
import Footer from "@/components/Templates/client/footer/Footer";
import HeroSection from "@/components/Layouts/client/Home/HeroSection";
import BrandsSection from "@/components/Layouts/client/Home/BrandsSection";
import CategoriesSection from "@/components/Layouts/client/Home/CategoriesSection";
import FlashSaleSection from "@/components/Layouts/client/Home/FlashSaleSection";
import AdBannerSection from "@/components/Layouts/client/Home/AdBannerSection";
import NewArrivalsSection from "@/components/Layouts/client/Home/NewArrivalsSection";

const HomePage = () => {
  return (
    <>
      <Helmet title="Home" />

      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        {/* Navbar Untuk Desktop */}
        <DesktopNavbar />

        {/* Navbar untuk Mobile */}
        <MobileTopNav />
        <MobileBottomNav />

        {/* Konten Utama Halaman */}
        <main className="container mx-auto px-4 py-8 pt-24 md:pt-8 pb-24 md:pb-8 space-y-12 md:space-y-16 lg:space-y-20">
          <HeroSection />
          <BrandsSection />
          <CategoriesSection />
          <FlashSaleSection />
          <AdBannerSection />
          <NewArrivalsSection />
        </main>

        {/* Footer for Desktop */}
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
