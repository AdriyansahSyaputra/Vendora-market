import { useState } from "react";
import Sidebar from "@/components/Templates/vendor/sidebar/Sidebar";
import Topbar from "@/components/Templates/vendor/topbar/Topbar";
import IndividualReviewCard from "@/components/Layouts/vendor/Review-feedback/IndividualReviewCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ProductReviewsPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;

  if (!product) {
    navigate("/store/reviews");
    return null;
  }

  return (
    <>
      <Helmet title="Product Reviews" />

      <div className="flex min-h-screen w-full bg-muted/40">
        {/* Sidebar Desktop */}
        <Sidebar isCollapsed={isCollapsed} />

        {/* Kontainer untuk Topbar dan Konten Utama */}
        <div className="flex flex-col w-full">
          <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

          {/* Konten Utama Halaman */}
          <main className="flex-1 p-4 sm:px-6 sm:py-6 space-y-4">
            <div className="flex flex-col gap-4 md:gap-8">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <p className="text-sm text-muted-foreground">Reviews for</p>
                  <h1 className="text-2xl font-bold">{product.name}</h1>
                </div>
              </div>

              {/* Grid Ulasan */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {product.reviews.map((review) => (
                  <IndividualReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProductReviewsPage;
