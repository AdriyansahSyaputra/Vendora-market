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
import { Badge } from "@/components/ui/badge";
import { Search, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

// Dummy Data
const shippingOrders = [
  {
    id: "INV-JL123",
    user: "Liam Johnson",
    carrier: "JNE Express",
    tracking: "JN1002938475",
    estDelivery: "2024-07-02",
  },
  {
    id: "INV-JL126",
    user: "Emma Garcia",
    carrier: "SiCepat",
    tracking: "SC192837465",
    estDelivery: "2024-07-03",
  },
  {
    id: "INV-JL128",
    user: "Oliver Wilson",
    carrier: "AnterAja",
    tracking: "AA293847561",
    estDelivery: "2024-07-01",
  },
];

const InShipment = () => {
  const [date, setDate] = React.useState(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>In Shipment</CardTitle>
        <CardDescription>
          Track all orders currently in transit to customers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by tracking number or user..."
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
                {date ? format(date, "PPP") : <span>Filter by ship date</span>}
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
                <TableHead>Order ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="hidden md:table-cell">Carrier</TableHead>
                <TableHead>Tracking #</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Est. Delivery
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shippingOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.user}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{order.carrier}</Badge>
                  </TableCell>
                  <TableCell>{order.tracking}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {order.estDelivery}
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

export default InShipment;
