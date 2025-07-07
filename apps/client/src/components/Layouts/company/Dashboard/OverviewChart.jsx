import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const OverviewChart = ({ salesData }) => {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Ringkasan Pertumbuhan</CardTitle>
        <CardDescription>
          Pertumbuhan pengguna dan transaksi dalam 7 bulan terakhir.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={salesData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(0 0% 100% / 0.1)"
            />
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(20, 20, 30, 0.8)",
                borderColor: "hsl(240 3.7% 15.9%)",
                borderRadius: "0.75rem",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="transactions"
              name="Transaksi"
              stroke="hsl(262 80% 58%)"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="users"
              name="Pengguna Baru"
              stroke="hsl(222 80% 58%)"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OverviewChart;
