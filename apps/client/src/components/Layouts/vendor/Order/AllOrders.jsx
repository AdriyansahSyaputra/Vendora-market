import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Search,
  Calendar as CalendarIcon,
  Package,
  Truck,
  CheckCircle,
} from "lucide-react";
import { format } from "date-fns";

// Dummy Data
const orders = [
  {
    id: "INV-JL123",
    user: "Liam Johnson",
    product: "Smart Watch X",
    category: "Wearables",
    price: 299.99,
    qty: 1,
    status: "Shipped",
  },
  {
    id: "INV-JL124",
    user: "Olivia Smith",
    product: "Noise Cancelling Headphones",
    category: "Audio",
    price: 199.0,
    qty: 1,
    status: "Packed",
  },
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
    id: "INV-JL126",
    user: "Emma Garcia",
    product: "4K Webcam",
    category: "Electronics",
    price: 120.0,
    qty: 1,
    status: "Shipped",
  },
  {
    id: "INV-JL127",
    user: "Ava Martinez",
    product: "Mechanical Keyboard",
    category: "Accessories",
    price: 150.0,
    qty: 1,
    status: "Packed",
  },
];

const statCards = [
  {
    title: "Awaiting Packing",
    value: "12",
    icon: <Package className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "In Shipment",
    value: "34",
    icon: <Truck className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Completed Today",
    value: "56",
    icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />,
  },
];

const AllOrders = () => {
  const [date, setDate] = React.useState(null);

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {statCards.map((card) => (
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
          <CardTitle>Ongoing Orders</CardTitle>
          <CardDescription>
            All current orders that are being processed or in transit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by user or product..."
                className="pl-10"
              />
            </div>
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
                  <TableHead className="hidden lg:table-cell">
                    Product
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.user}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {order.product}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      ${(order.price * order.qty).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "Shipped"
                            ? "default"
                            : order.status === "Packed"
                            ? "secondary"
                            : "outline"
                        }
                        className={
                          order.status === "Shipped"
                            ? "bg-blue-500/20 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-500/20"
                            : order.status === "Packed"
                            ? "bg-orange-500/20 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400 border-orange-500/20"
                            : "bg-green-500/20 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-500/20"
                        }
                      >
                        {order.status}
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

export default AllOrders;
