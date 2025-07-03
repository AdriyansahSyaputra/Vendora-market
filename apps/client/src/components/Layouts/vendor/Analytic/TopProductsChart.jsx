import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const topProductsData = [
  { name: "Smart Watch Pro X", sold: 482 },
  { name: "Ergonomic Keyboard", sold: 391 },
  { name: "4K Ultra HD Monitor", sold: 356 },
  { name: "Noise-Cancelling Buds", sold: 289 },
  { name: "Portable SSD 2TB", sold: 215 },
].sort((a, b) => a.sold - b.sold); // Sort for ascending display in chart

const TopProductsChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Best-Selling Products
        </CardTitle>
        <CardDescription>Top 5 products by sales volume.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart
              data={topProductsData}
              layout="vertical"
              margin={{ left: 20, right: 40 }}
            >
              <defs>
                <linearGradient
                  id="colorTopProduct"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={1} />
                </linearGradient>
              </defs>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={120}
              />
              <Tooltip
                cursor={{ fill: "hsl(var(--muted) / 0.5)" }}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                }}
              />
              <Bar
                dataKey="sold"
                fill="url(#colorTopProduct)"
                radius={[0, 8, 8, 0]}
              >
                <LabelList
                  dataKey="sold"
                  position="right"
                  offset={10}
                  style={{ fill: "hsl(var(--foreground))", fontSize: "12px" }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopProductsChart;
