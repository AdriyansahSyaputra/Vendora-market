import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from "recharts";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

// Dummy data untuk 30 hari terakhir
const salesData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    sales: Math.floor(Math.random() * 50) + 10,
    revenue: Math.floor(Math.random() * 3000) + 500,
  };
});
const SalesAnalysisChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              Sales Performance
            </CardTitle>
            <CardDescription>
              Revenue and sales volume over the last 30 days.
            </CardDescription>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0">
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>Date Range</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <ComposedChart data={salesData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4fd1c5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#38b2ac" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "0.5rem",
                  boxShadow:
                    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "14px" }} />
              <Bar
                yAxisId="right"
                dataKey="sales"
                fill="url(#colorSales)"
                name="Sales Volume"
                barSize={20}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#c026d3"
                strokeWidth={2}
                name="Revenue"
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesAnalysisChart;
    