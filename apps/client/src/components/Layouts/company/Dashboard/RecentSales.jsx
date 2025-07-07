import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RecentSales = ({ recentSales }) => {
  return (
    <Card className="col-span-1 lg:col-span-2 xl:col-span-4">
      <CardHeader>
        <CardTitle>Transaksi Terbaru</CardTitle>
        <CardDescription>
          Ada {recentSales.length} transaksi baru bulan ini.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentSales.map((sale) => (
            <div key={sale.id} className="flex items-center gap-4">
              <img
                src={sale.avatar}
                alt={sale.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm font-medium leading-none">{sale.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {sale.email}
                </p>
              </div>
              <div className="font-medium text-right">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(sale.amount)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentSales;
