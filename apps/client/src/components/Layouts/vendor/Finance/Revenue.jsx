import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Wallet,
  Percent,
  Landmark,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

// Dummy Data
const transactionActivityData = Array.from({ length: 12 }, (_, i) => ({
  month: new Date(2024, i, 1).toLocaleString("en-US", { month: "short" }),
  transactions: Math.floor(Math.random() * 8000) + 2000,
}));

const recentTransactions = [
  {
    id: "TRN-105",
    product: "Pro Gaming Mouse",
    qty: 2,
    cost: 150.0,
    status: "Success",
  },
  {
    id: "TRN-104",
    product: "4K Mechanical Keyboard",
    qty: 1,
    cost: 180.5,
    status: "Pending",
  },
  {
    id: "TRN-103",
    product: "HD Webcam Pro",
    qty: 1,
    cost: 95.0,
    status: "Success",
  },
  {
    id: "TRN-102",
    product: "UltraWide Monitor",
    qty: 1,
    cost: 750.0,
    status: "Failed",
  },
  {
    id: "TRN-101",
    product: "Ergonomic Keyboard",
    qty: 3,
    cost: 225.0,
    status: "Success",
  },
];

const Revenue = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards (Sama seperti sebelumnya) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Gross Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Net Revenue</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$38,971.50</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Platform Fees</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$6,260.39</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Clearance
            </CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,120.00</div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Activity Chart */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle>Transaction Activity</CardTitle>
              <p className="text-4xl font-bold text-emerald-500 mt-2">
                $128,430.50
              </p>
              <CardDescription>
                Total transaction value this year.
              </CardDescription>
            </div>
            <Select defaultValue="2024">
              <SelectTrigger className="w-full sm:w-[160px] mt-4 sm:mt-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <AreaChart
                data={transactionActivityData}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorActivity"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                  }}
                />
                <Area
                  type="step"
                  dataKey="transactions"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#colorActivity)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Quantity
                  </TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                    <TableCell className="font-medium">{tx.product}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {tx.qty}
                    </TableCell>
                    <TableCell>${tx.cost.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`capitalize ${
                          tx.status === "Success"
                            ? "text-green-600 border-green-500/50"
                            : tx.status === "Pending"
                            ? "text-amber-600 border-amber-500/50"
                            : "text-red-600 border-red-500/50"
                        }`}
                      >
                        {tx.status === "Success" ? (
                          <CheckCircle className="mr-1 h-3 w-3" />
                        ) : tx.status === "Pending" ? (
                          <Clock className="mr-1 h-3 w-3" />
                        ) : (
                          <XCircle className="mr-1 h-3 w-3" />
                        )}
                        {tx.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Revenue;
