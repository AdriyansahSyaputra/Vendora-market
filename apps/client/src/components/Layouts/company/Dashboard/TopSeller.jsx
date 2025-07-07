import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";

const TopSeller = ({ topSellers }) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Seller Teratas</CardTitle>
        <CardDescription>
          Berdasarkan total penjualan bulan ini.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {topSellers.map((seller, index) => (
            <li key={seller.id} className="flex items-center gap-4">
              <span className="font-bold text-lg text-indigo-400">
                #{index + 1}
              </span>
              <img
                src={seller.avatar}
                alt={seller.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold">{seller.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    notation: "compact",
                  }).format(seller.sales)}
                </p>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-bold">5.0</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TopSeller;
