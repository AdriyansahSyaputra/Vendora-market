import {
  Smartphone,
  Laptop,
  Shirt,
  HeartPulse,
  Gamepad2,
  Sofa,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const CategoriesSection = () => {
  const categories = [
    { name: "Elektronik", icon: Smartphone },
    { name: "Komputer", icon: Laptop },
    { name: "Fashion", icon: Shirt },
    { name: "Kesehatan", icon: HeartPulse },
    { name: "Hobi & Game", icon: Gamepad2 },
    { name: "Rumah Tangga", icon: Sofa },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Kategori Pilihan</h2>
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <Card
            key={cat.name}
            className="flex flex-col items-center justify-center p-4 md:p-6 aspect-square transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer dark:bg-gray-800/50"
          >
            <cat.icon className="w-8 h-8 md:w-10 md:h-10 mb-2 text-blue-600 dark:text-blue-400" />
            <p className="font-semibold text-center text-sm md:text-base">
              {cat.name}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
