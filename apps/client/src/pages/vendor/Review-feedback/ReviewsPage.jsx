import { useState } from "react";
import Sidebar from "@/components/Templates/vendor/sidebar/Sidebar";
import Topbar from "@/components/Templates/company/topbar/Topbar";
import ProductReviewSummaryCard from "@/components/Layouts/vendor/Review-feedback/ProductReviewSummaryCard";
import { Helmet } from "react-helmet-async";

// Dummy Data Lengkap
const productsData = [
  {
    id: 1,
    name: "Pro Gaming Mouse",
    imageUrl: "https://placehold.co/600x400/8b5cf6/ffffff?text=Mouse",
    avgRating: 4.8,
    totalReviews: 128,
    reviews: [
      {
        id: 101,
        user: { name: "Alice", avatar: "https://i.pravatar.cc/150?u=alice" },
        rating: 5,
        text: "Amazing mouse, very responsive!",
      },
      {
        id: 102,
        user: { name: "Bob", avatar: "https://i.pravatar.cc/150?u=bob" },
        rating: 4,
        text: "Good product, but the cable is a bit short.",
        sellerReply:
          "Thanks for the feedback, Bob! We will consider this for future versions.",
      },
    ],
  },
  {
    id: 2,
    name: "4K Mechanical Keyboard",
    imageUrl: "https://placehold.co/600x400/3b82f6/ffffff?text=Keyboard",
    avgRating: 4.5,
    totalReviews: 97,
    reviews: [
      {
        id: 201,
        user: {
          name: "Charlie",
          avatar: "https://i.pravatar.cc/150?u=charlie",
        },
        rating: 5,
        text: "The typing experience is sublime.",
      },
    ],
  },
  {
    id: 3,
    name: "UltraWide Monitor",
    imageUrl: "https://placehold.co/600x400/10b981/ffffff?text=Monitor",
    avgRating: 4.9,
    totalReviews: 210,
    reviews: [],
  },
  {
    id: 4,
    name: "HD Webcam Pro",
    imageUrl: "https://placehold.co/600x400/f97316/ffffff?text=Webcam",
    avgRating: 4.2,
    totalReviews: 76,
    reviews: [],
  },
];

const ReviewsPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <Helmet title="Reviews & Feedback" />

      <div className="flex min-h-screen w-full bg-muted/40">
        {/* Sidebar Desktop */}
        <Sidebar isCollapsed={isCollapsed} />

        {/* Kontainer untuk Topbar dan Konten Utama */}
        <div className="flex flex-col w-full">
          <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

          {/* Konten Utama Halaman */}
          <main className="flex-1 p-4 sm:px-6 sm:py-6 space-y-4">
            <div className="flex flex-col gap-4 md:gap-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">
                  Reviews & Feedback
                </h1>
                <p className="text-muted-foreground">
                  Select a product to view its reviews.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productsData.map((product) => (
                  <ProductReviewSummaryCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ReviewsPage;
