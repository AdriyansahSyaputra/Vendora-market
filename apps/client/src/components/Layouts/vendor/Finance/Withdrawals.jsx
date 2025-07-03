import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Banknote,
  Clock,
  CheckCircle,
  XCircle,
  Wallet,
  Plus,
} from "lucide-react";

// Dummy Data
const withdrawalHistory = [
  {
    id: "WDR-004",
    date: "2025-07-01",
    total: 3100.0,
    destination: "Mandiri •••• 5678",
    status: "Pending",
  },
  {
    id: "WDR-001",
    date: "2025-06-25",
    total: 1500.0,
    destination: "BCA •••• 1234",
    status: "Completed",
  },
  {
    id: "WDR-003",
    date: "2025-04-15",
    total: 850.0,
    destination: "BCA •••• 1234",
    status: "Failed",
  },
  {
    id: "WDR-002",
    date: "2025-05-20",
    total: 2200.5,
    destination: "Mandiri •••• 5678",
    status: "Completed",
  },
];

const Withdrawals = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 text-white">
        <CardHeader>
          <CardTitle className="text-white/90">Available Balance</CardTitle>
          <CardDescription className="text-white/60">
            This is the amount you can withdraw right now.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-5xl font-bold tracking-tight">$8,750.25</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="w-full md:w-auto bg-white hover:bg-slate-100 text-indigo-600 font-bold shadow-lg"
              >
                <Banknote className="mr-2 h-5 w-5" /> Withdraw Funds
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Withdraw Funds</DialogTitle>
                <DialogDescription>
                  Available to withdraw: $8,750.25
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      className="pl-7 text-lg font-semibold"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="destination">Destination Account</Label>
                  <Select defaultValue="bca">
                    <SelectTrigger id="destination" className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bca">BCA •••• 1234</SelectItem>
                      <SelectItem value="mandiri">Mandiri •••• 5678</SelectItem>
                      <SelectItem value="new">
                        <div className="flex items-center">
                          <Plus className="mr-2 h-4 w-4" /> Add New Account
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
                  <p>Fee: $1.00</p>
                  <p className="font-semibold">You will receive: $0.00</p>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full">
                  Confirm Withdrawal
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Withdrawal History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Destination
                  </TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {withdrawalHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="font-mono text-xs">
                      {item.id}
                    </TableCell>
                    <TableCell>${item.total.toFixed(2)}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {item.destination}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`capitalize ${
                          item.status === "Completed"
                            ? "text-green-600 border-green-500/50"
                            : item.status === "Pending"
                            ? "text-amber-600 border-amber-500/50"
                            : "text-red-600 border-red-500/50"
                        }`}
                      >
                        {item.status === "Completed" ? (
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
    </div>
  );
};

export default Withdrawals;
