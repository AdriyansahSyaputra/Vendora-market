import { ChevronRight } from "lucide-react";
import ProductCard from "../../../Elements/ProductCard";
import { Button } from "@/components/ui/button";

const NewArrivalsSection = () => {
  const newProducts = [
    {
      id: 6,
      name: "Kamera Mirrorless C100",
      price: "Rp 12.500.000",
      rating: "5.0",
      sold: "120",
      image: "https://placehold.co/300x300/22C55E/FFFFFF?text=Kamera",
    },
    {
      id: 7,
      name: "Sepatu Lari Ultralight",
      price: "Rp 950.000",
      rating: "4.9",
      sold: "340",
      image: "https://placehold.co/300x300/8B5CF6/FFFFFF?text=Sepatu",
    },
    {
      id: 8,
      name: "Meja Kerja Ergonomis",
      price: "Rp 2.100.000",
      rating: "4.8",
      sold: "210",
      image: "https://placehold.co/300x300/D97706/FFFFFF?text=Meja",
    },
    {
      id: 9,
      name: "Air Purifier Smart+",
      price: "Rp 1.800.000",
      rating: "4.9",
      sold: "450",
      image: "https://placehold.co/300x300/0EA5E9/FFFFFF?text=Air+Purifier",
    },
    {
      id: 10,
      name: "Powerbank 20000mAh",
      price: "Rp 350.000",
      rating: "4.8",
      sold: "3.2k",
      image: "https://placehold.co/300x300/71717A/FFFFFF?text=Powerbank",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Produk Terbaru</h2>
        <Button variant="link">
          Lihat Semua <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {newProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivalsSection;
