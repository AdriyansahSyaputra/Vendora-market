import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TopProduct = ({ topProducts }) => {
  return (
    <Card className="lg:col-span-6">
      <CardHeader>
        <CardTitle>Produk Terlaris</CardTitle>
        <CardDescription>
          Produk dengan penjualan terbanyak sepanjang masa.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-sm leading-tight">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {product.category}
                </p>
                <p className="text-sm font-bold text-indigo-500 dark:text-indigo-400 mt-2">
                  {product.sales}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopProduct;
