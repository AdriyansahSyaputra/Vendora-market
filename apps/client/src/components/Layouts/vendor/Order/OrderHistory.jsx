import React from "react";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Calendar as CalendarIcon,
  DollarSign,
  ShoppingBag,
  XCircle,
  Star,
} from "lucide-react";
import { format } from "date-fns";

// Dummy Data
const historyOrders = [
  {
    id: "INV-JL125",
    user: "Noah Brown",
    product: "Ergonomic Mouse",
    category: "Accessories",
    price: 75.5,
    qty: 2,
    status: "Completed",
  },
  {
    id: "INV-JL120",
    user: "Ben Carter",
    product: "Laptop Stand",
    category: "Accessories",
    price: 45.0,
    qty: 1,
    status: "Completed",
  },
  {
    id: "INV-JL119",
    user: "Mia Evans",
    product: "VR Headset",
    category: "Gaming",
    price: 499.0,
    qty: 1,
    status: "Cancelled",
  },
];

const historyStats = [
  {
    title: "Total Revenue",
    value: "$25,482",
    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Total Orders",
    value: "1,250",
    icon: <ShoppingBag className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Cancelled",
    value: "32",
    icon: <XCircle className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Avg. Rating",
    value: "4.8",
    icon: <Star className="h-4 w-4 text-muted-foreground" />,
  },
];

export default function OrderHistory() {
  const [date, setDate] = React.useState(null);

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {historyStats.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Card */}
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>
            A complete record of all past orders.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search history..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full md:w-[240px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Filter by date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Product
                  </TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.user}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order.product}
                    </TableCell>
                    <TableCell>
                      ${(order.price * order.qty).toFixed(2)}
                    </TableCell>
                    <TableCell
                      className={
                        order.status === "Cancelled" ? "text-red-500" : ""
                      }
                    >
                      {order.status}
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
}
