import { useState, useMemo } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import DesktopNavbar from "@/components/Templates/client/navbar/DesktopNavbar";
import MobileTopNav from "@/components/Templates/client/navbar/MobileTopNav";
import MobileBottomNav from "@/components/Templates/client/navbar/MobileBottomNav";
import Footer from "@/components/Templates/client/footer/Footer";
import PersonalInfoSection from "@/components/Layouts/client/SellerRequest/PersonalInfoSection";
import AddressSection from "@/components/Layouts/client/SellerRequest/AddressSection";
import StoreInfoSection from "@/components/Layouts/client/SellerRequest/StoreInfoSection";
import AgreementSection from "@/components/Layouts/client/SellerRequest/AgreementSection";
import DocumentUploadSection from "@/components/Layouts/client/SellerRequest/DocumentUploadSection";

const SellerRequestPage = () => {
  const [formData, setFormData] = useState({
    phone: "",
    storeName: "",
    storeDescription: "",
    categories: [],
    address: {
      location: "",
      street: "",
      village: "",
      district: "",
      city: "",
      postalCode: "",
    },
    operatingAreas: [],
    documents: {},
  });
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simple validation to enable the submit button
  const isSubmittable = useMemo(() => {
    const { phone, storeName, storeDescription, address, documents } = formData;
    const isPersonalInfoValid = phone.length > 8;
    const isStoreInfoValid =
      storeName && storeDescription && (formData.categories || []).length > 0;
    const isAddressValid =
      address?.location &&
      address?.street &&
      address?.city &&
      address?.postalCode;
    const isDocumentValid = address?.location ? !!documents?.identity : false;

    return (
      isPersonalInfoValid &&
      isStoreInfoValid &&
      isAddressValid &&
      isDocumentValid &&
      isAgreed
    );
  }, [formData, isAgreed]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSubmittable) {
      toast.error("Form Incomplete", {
        description: "Please review all required fields before submitting.",
      });
      return;
    }

    setIsLoading(true);
    console.log("Submitting form data:", formData);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Request Sent!", {
        description:
          "Your seller application is being processed. We will notify you via email.",
      });
      // Here you can reset the form or redirect the user
    }, 2000);
  };

  return (
    <>
      <Helmet title="Seller Request" />

      <Toaster richColors position="top-center" />

      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        {/* Navbar Untuk Desktop */}
        <DesktopNavbar />

        {/* Navbar untuk Mobile */}
        <MobileTopNav />
        <MobileBottomNav />

        {/* Konten Utama Halaman */}
        <main className="container mx-auto px-4 py-8 pt-24 md:pt-8 pb-24 md:pb-8 space-y-12 md:space-y-16 lg:space-y-20">
          <div className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Become a Seller on Our Platform
              </h1>
              <p className="text-muted-foreground mt-2">
                Complete the form below to start your journey as a seller.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8">
              <PersonalInfoSection
                formData={formData}
                setFormData={setFormData}
              />
              <StoreInfoSection formData={formData} setFormData={setFormData} />
              <AddressSection formData={formData} setFormData={setFormData} />
              <DocumentUploadSection
                formData={formData}
                setFormData={setFormData}
              />
              <AgreementSection
                isAgreed={isAgreed}
                setIsAgreed={setIsAgreed}
                isSubmittable={isSubmittable}
                isLoading={isLoading}
              />
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SellerRequestPage;
