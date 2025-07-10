import { useState } from "react";
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
import BannerCard from "@/components/Layouts/company/Advertisement/Ads/BannerCard";
import AddEditBannerModal from "@/components/Layouts/company/Advertisement/Ads/AddEditBannerModal";
import ConfirmationDialog from "@/components/Layouts/company/Advertisement/Ads/ConfirmationDialog";
import { Button } from "@/components/ui/button";

const initialBanners = [
  {
    id: 1,
    title: "Mega Sale 7.7",
    imageUrl: "https://placehold.co/600x300/7c3aed/ffffff?text=Mega+Sale+7.7",
    location: "Dashboard",
    startDate: "2025-07-01",
    endDate: "2025-07-07",
  },
  {
    id: 2,
    title: "New Electronics Arrivals",
    imageUrl: "https://placehold.co/600x300/16a34a/ffffff?text=New+Electronics",
    location: "Product",
    startDate: "2025-07-05",
    endDate: "2025-07-15",
  },
  {
    id: 3,
    title: "Fashion Fest Discount",
    imageUrl: "https://placehold.co/600x300/db2777/ffffff?text=Fashion+Fest",
    location: "Promo",
    startDate: "2025-07-10",
    endDate: "2025-07-20",
  },
];
const bannerLocations = ["Dashboard", "Product", "Promo", "Checkout"];

const AdvertisementPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [banners, setBanners] = useState(initialBanners);
  const [modalMode, setModalMode] = useState(null); // 'add' or 'edit'
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleSaveBanner = (bannerData) => {
    if (modalMode === "edit") {
      setBanners(banners.map((b) => (b.id === bannerData.id ? bannerData : b)));
    } else {
      const newBanner = { ...bannerData, id: Date.now() }; // Use timestamp for unique ID
      setBanners([newBanner, ...banners]);
    }
  };
  const handleDeleteBanner = () => {
    setBanners(banners.filter((b) => b.id !== selectedBanner.id));
    setDeleteConfirmOpen(false);
    setSelectedBanner(null);
  };

  return (
    <>
      <Helmet title="Advertisement" />

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
            <Card>
              <CardHeader>
                <CardTitle>Advertisement</CardTitle>
                <CardDescription>
                  Manage your advertisements here. You can create, edit, and
                  delete advertisements to promote your products or services.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 md:gap-8">
                  <Button
                    onClick={() => {
                      setSelectedBanner(null);
                      setModalMode("add");
                    }}
                  >
                    Add New Banner
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {banners.map((banner) => (
                      <BannerCard
                        key={banner.id}
                        banner={banner}
                        onEdit={() => {
                          setSelectedBanner(banner);
                          setModalMode("edit");
                        }}
                        onDelete={() => {
                          setSelectedBanner(banner);
                          setDeleteConfirmOpen(true);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>

        <AddEditBannerModal
          isOpen={modalMode !== null}
          onClose={() => setModalMode(null)}
          onSave={handleSaveBanner}
          initialData={modalMode === "edit" ? selectedBanner : null}
          bannerLocations={bannerLocations}
        />
        <ConfirmationDialog
          open={isDeleteConfirmOpen}
          onOpenChange={setDeleteConfirmOpen}
          onConfirm={handleDeleteBanner}
          title="Are you sure?"
          description={`This will permanently delete the "${selectedBanner?.title}" banner. This action cannot be undone.`}
        />
      </div>
    </>
  );
};

export default AdvertisementPage;
