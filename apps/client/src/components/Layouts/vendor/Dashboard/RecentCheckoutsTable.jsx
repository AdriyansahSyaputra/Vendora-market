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

const checkouts = [
  {
    id: "INV-PLK123",
    user: "John Doe",
    item: "Gaming Mouse Pro",
    method: "Credit Card",
    date: "2024-06-28",
  },
  {
    id: "INV-PLK124",
    user: "Jane Smith",
    item: "Mechanical Keyboard",
    method: "PayPal",
    date: "2024-06-28",
  },
  {
    id: "INV-PLK125",
    user: "Mike Johnson",
    item: "4K Monitor",
    method: "Bank Transfer",
    date: "2024-06-27",
  },
  {
    id: "INV-PLK126",
    user: "Emily Davis",
    item: "Ergonomic Chair",
    method: "Credit Card",
    date: "2024-06-27",
  },
  {
    id: "INV-PLK127",
    user: "Chris Lee",
    item: "Webcam HD",
    method: "GoPay",
    date: "2024-06-26",
  },
];

const RecentCheckoutsTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Checkouts</CardTitle>
        <CardDescription>
          The 5 most recent checkout activities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="hidden sm:table-cell">Item</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {checkouts.map((checkout) => (
              <TableRow key={checkout.id}>
                <TableCell className="font-medium">{checkout.id}</TableCell>
                <TableCell>{checkout.user}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {checkout.item}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{checkout.method}</Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {checkout.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentCheckoutsTable;
