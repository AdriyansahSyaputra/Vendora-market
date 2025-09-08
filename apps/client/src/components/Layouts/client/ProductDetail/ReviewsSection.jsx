import { useState } from "react";
import ReviewCard from "./ReviewCard";
import { Button } from "@/components/ui/button";

const dummyReviews = [
  {
    id: 1,
    user: {
      name: "Budi Santoso",
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    rating: 5,
    date: "2025-09-01",
    comment: "Produk sangat bagus, pengiriman cepat!",
    images: ["https://picsum.photos/100/100?random=1"],
    likes: 3,
    dislikes: 0,
    sellerReply: {
      sellerName: "Toko Sukses",
      comment: "Terima kasih banyak atas ulasannya 🙏",
    },
  },
  {
    id: 2,
    user: {
      name: "Siti Aisyah",
      avatar: "https://i.pravatar.cc/100?img=2",
    },
    rating: 4,
    date: "2025-08-28",
    comment: "Kualitas sesuai deskripsi, recommended seller 👍",
    images: [],
    likes: 5,
    dislikes: 1,
    sellerReply: null,
  },
  {
    id: 3,
    user: {
      name: "Andi Wijaya",
      avatar: "https://i.pravatar.cc/100?img=3",
    },
    rating: 3,
    date: "2025-08-20",
    comment: "Lumayan, tapi packing bisa lebih rapi lagi.",
    images: [],
    likes: 2,
    dislikes: 2,
    sellerReply: {
      sellerName: "Toko Sukses",
      comment: "Terima kasih masukannya, akan kami perbaiki 😊",
    },
  },
  {
    id: 4,
    user: {
      name: "Rahmawati",
      avatar: "https://i.pravatar.cc/100?img=4",
    },
    rating: 5,
    date: "2025-08-15",
    comment: "Harga terjangkau, kualitas mantap!",
    images: ["https://picsum.photos/100/100?random=2"],
    likes: 7,
    dislikes: 0,
    sellerReply: null,
  },
  {
    id: 5,
    user: {
      name: "Dewi Lestari",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    rating: 4,
    date: "2025-08-10",
    comment: "Barang sesuai pesanan, seller ramah sekali.",
    images: [],
    likes: 4,
    dislikes: 0,
    sellerReply: {
      sellerName: "Toko Sukses",
      comment: "Kami senang mendengar itu! 😊",
    },
  },
];

const ReviewsSection = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const showMore = () => setVisibleCount(dummyReviews.length);

  return (
    <div className="p-4 md:p-6 bg-white dark:bg-slate-900">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
        Ulasan Pembeli ({dummyReviews.length})
      </h2>
      <div className="md:hidden">
        {dummyReviews.slice(0, visibleCount).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
        {visibleCount < dummyReviews.length && (
          <Button variant="outline" className="w-full mt-4" onClick={showMore}>
            Lihat Semua Ulasan
          </Button>
        )}
      </div>
      <div className="hidden md:block">
        {dummyReviews.slice(0, 5).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
        {dummyReviews.length > 5 && (
          <Button variant="outline" className="w-full mt-4">
            Lihat Semua Ulasan
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
