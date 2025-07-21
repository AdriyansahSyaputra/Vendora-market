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
import { fileToBase64 } from "@/utils/fileToBase64";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/context/auth/authContext";

const SellerRequestPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
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
      documents: {
        ktp: null,
        npwp: null,
        passport: null,
        businessLicense: null,
      },
      agreement: false,
    },
  });

  const watchedValues = form.watch();

  // Simple validation to enable the submit button
  const isSubmittable = useMemo(() => {
    const {
      phone,
      storeName,
      storeDescription,
      categories,
      location,
      address,
      operatingArea,
      documents,
      agreement,
    } = watchedValues;

    // Pengecekan dasar apakah field sudah diisi
    const isPersonalInfoValid = phone?.length > 9;
    const isStoreInfoValid =
      storeName && storeDescription && categories?.length > 0;
    const isAddressValid =
      location && address?.street && address?.city && address?.postalCode;
    const isOperatingAreaValid = operatingArea?.length > 0;

    // Pengecekan dokumen kondisional
    let isDocumentValid = false;
    if (location === "ID") {
      isDocumentValid = !!documents?.ktp && !!documents?.npwp;
    } else if (location) {
      // Jika lokasi bukan ID tapi sudah dipilih
      isDocumentValid = !!documents?.passport && !!documents?.businessLicense;
    }

    return (
      isPersonalInfoValid &&
      isStoreInfoValid &&
      isAddressValid &&
      isOperatingAreaValid &&
      isDocumentValid &&
      agreement
    );
  }, [watchedValues]);

  const handleFileChange = async (fieldName, file) => {
    if (!file) {
      form.setValue(fieldName, null);
      return;
    }
    try {
      const base64String = await fileToBase64(file);
      form.setValue(fieldName, base64String);
    } catch (error) {
      toast.error("Gagal memproses file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSubmittable) {
      toast.error("Form Incomplete", {
        description: "Please review all required fields before submitting.",
      });
      return;
    }

    setIsLoading(true);
    const formData = form.getValues();

    try {
      const response = await fetch("/api/client/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // --- Penanganan Error dari Backend ---
      if (!response.ok) {
        // Jika backend mengirim detail error (dari Zod), tampilkan semuanya
        if (result.details && Array.isArray(result.details)) {
          result.details.forEach((err) => {
            toast.error(`Error pada field: ${err.path}`, {
              description: err.message,
            });
          });
        } else {
          // Jika hanya ada pesan error umum
          throw new Error(result.message || "Terjadi kesalahan pada server.");
        }
        return; // Hentikan eksekusi jika ada error
      }

      toast.success("Request Terkirim!", {
        description:
          "Aplikasi seller Anda sedang diproses. Kami akan memberitahu Anda via email.",
      });
      form.reset();
    } catch (error) {
      toast.error("Gagal Mengirim Aplikasi", {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
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

            <Form {...form}>
              <form onSubmit={handleSubmit} className="space-y-8">
                <PersonalInfoSection form={form} />
                <StoreInfoSection form={form} />
                <AddressSection form={form} />
                <DocumentUploadSection
                  form={form}
                  onFileChange={handleFileChange}
                />
                <AgreementSection
                  isSubmittable={isSubmittable}
                  isLoading={isLoading}
                  form={form}
                />
              </form>
            </Form>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SellerRequestPage;
