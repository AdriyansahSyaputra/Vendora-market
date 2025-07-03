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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Clock, CheckCircle, XCircle } from "lucide-react";

// Dummy Data
const checkoutHistory = [
  {
    id: "TRN-105",
    date: "2025-07-02",
    customer: {
      name: "Liam Johnson",
      avatar: "https://i.pravatar.cc/150?u=liam",
    },
    product: "Pro Gaming Mouse",
    total: 150.0,
    via: "Credit Card",
    status: "Success",
  },
  {
    id: "TRN-104",
    date: "2025-07-02",
    customer: {
      name: "Olivia Smith",
      avatar: "https://i.pravatar.cc/150?u=olivia",
    },
    product: "4K Mechanical Keyboard",
    total: 180.5,
    via: "PayPal",
    status: "Pending",
  },
  {
    id: "TRN-103",
    date: "2025-07-01",
    customer: {
      name: "Noah Brown",
      avatar: "https://i.pravatar.cc/150?u=noah",
    },
    product: "HD Webcam Pro",
    total: 95.0,
    via: "Bank Transfer",
    status: "Success",
  },
  {
    id: "TRN-102",
    date: "2025-07-01",
    customer: {
      name: "Emma Garcia",
      avatar: "https://i.pravatar.cc/150?u=emma",
    },
    product: "UltraWide Monitor",
    total: 750.0,
    via: "Credit Card",
    status: "Failed",
  },
];

const PaymentHistory = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Customer Payment History</CardTitle>
            <CardDescription>
              A log of all recent customer checkout payments.
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="mt-4 sm:mt-0">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer or product..."
              className="pl-10"
            />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by Payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cc">Credit Card</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="bank">Bank Transfer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden lg:table-cell">Product</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="hidden md:table-cell">
                  Payment Via
                </TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {checkoutHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 hidden sm:flex">
                        <AvatarImage src={item.customer.avatar} />
                        <AvatarFallback>
                          {item.customer.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{item.customer.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {item.id}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {item.product}
                  </TableCell>
                  <TableCell>${item.total.toFixed(2)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.via}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`capitalize ${
                        item.status === "Success"
                          ? "text-green-600 border-green-500/50"
                          : item.status === "Pending"
                          ? "text-amber-600 border-amber-500/50"
                          : "text-red-600 border-red-500/50"
                      }`}
                    >
                      {item.status === "Success" ? (
                        <CheckCircle className="mr-1 h-3 w-3" />
                      ) : item.status === "Pending" ? (
                        <Clock className="mr-1 h-3 w-3" />
                      ) : (
                        <XCircle className="mr-1 h-3 w-3" />
                      )}
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentHistory;
