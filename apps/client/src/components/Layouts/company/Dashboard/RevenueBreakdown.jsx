import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RevenueBreakdown = ({ revenueData }) => {
  const totalRevenue = revenueData.reduce((acc, item) => acc + item.value, 0);
  return (
    <Card className="col-span-1 lg:col-span-1">
      <CardHeader>
        <CardTitle>Sumber Pendapatan</CardTitle>
        <CardDescription>Pembagian pendapatan platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={revenueData}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {revenueData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) =>
                new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(value)
              }
              contentStyle={{
                backgroundColor: "rgba(20, 20, 30, 0.8)",
                borderColor: "hsl(240 3.7% 15.9%)",
                borderRadius: "0.75rem",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2 text-sm">
          {revenueData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="text-gray-600 dark:text-gray-400">
                  {item.name}
                </span>
              </div>
              <span className="font-medium">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(item.value)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueBreakdown;
