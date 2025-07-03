import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FunnelChart,
  Funnel,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const funnelData = [
  { value: 12580, name: "Store Visits", fill: "#60a5fa" },
  { value: 9830, name: "Product Views", fill: "#3b82f6" },
  { value: 5120, name: "Added to Cart", fill: "#2563eb" },
  { value: 2450, name: "Purchased", fill: "#1d4ed8" },
];

const ConversionFunnelChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Conversion Funnel
        </CardTitle>
        <CardDescription>From initial visit to final purchase.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <FunnelChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                }}
              />
              <Funnel dataKey="value" data={funnelData} isAnimationActive>
                <LabelList
                  position="center"
                  fill="#fff"
                  stroke="none"
                  dataKey="name"
                  style={{ fontSize: "14px", fontWeight: "bold" }}
                />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionFunnelChart;
