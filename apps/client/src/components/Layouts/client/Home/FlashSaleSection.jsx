import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import ProductCard from "../../../Elements/ProductCard";
import { Button } from "@/components/ui/button";

const FlashSaleSection = () => {
  const flashSaleProducts = [
    {
      id: 1,
      name: "Smartwatch Pro X2",
      price: "Rp 799.000",
      discount: "50%",
      rating: "4.9",
      sold: "1.2k",
      image: "https://placehold.co/300x300/3B82F6/FFFFFF?text=Smartwatch",
    },
    {
      id: 2,
      name: "Headphone BassBoost 3",
      price: "Rp 450.000",
      discount: "40%",
      rating: "4.8",
      sold: "2.3k",
      image: "https://placehold.co/300x300/10B981/FFFFFF?text=Headphone",
    },
    {
      id: 3,
      name: "Mechanical Keyboard RGB",
      price: "Rp 850.000",
      discount: "30%",
      rating: "4.9",
      sold: "980",
      image: "https://placehold.co/300x300/F59E0B/FFFFFF?text=Keyboard",
    },
    {
      id: 4,
      name: "T-Shirt Katun Premium",
      price: "Rp 120.000",
      discount: "60%",
      rating: "4.7",
      sold: "5.1k",
      image: "https://placehold.co/300x300/6366F1/FFFFFF?text=T-Shirt",
    },
    {
      id: 5,
      name: "Blender Multifungsi",
      price: "Rp 350.000",
      discount: "25%",
      rating: "4.8",
      sold: "750",
      image: "https://placehold.co/300x300/EC4899/FFFFFF?text=Blender",
    },
  ];

  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 25,
    seconds: 40,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              return { hours: 3, minutes: 25, seconds: 40 };
            } // Reset timer for demo
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-2 md:gap-4">
          <h2 className="text-xl md:text-2xl font-bold text-red-600">
            Flash Sale
          </h2>
          <div className="flex items-center space-x-1">
            <span className="bg-gray-900 dark:bg-gray-800 text-white p-2 rounded-md font-mono text-base md:text-lg">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="font-bold text-xl">:</span>
            <span className="bg-gray-900 dark:bg-gray-800 text-white p-2 rounded-md font-mono text-base md:text-lg">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="font-bold text-xl">:</span>
            <span className="bg-gray-900 dark:bg-gray-800 text-white p-2 rounded-md font-mono text-base md:text-lg">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>
        </div>
        <Button variant="link">
          Lihat Semua <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {flashSaleProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default FlashSaleSection;
