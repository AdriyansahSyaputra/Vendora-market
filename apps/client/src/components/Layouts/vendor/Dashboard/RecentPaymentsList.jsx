import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const payments = [
  {
    name: "Olivia Martin",
    method: "BCA - 11182342",
    time: "5m ago",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    name: "Jackson Lee",
    method: "Mandiri - 23498712",
    time: "15m ago",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d",
  },
  {
    name: "Isabella Nguyen",
    method: "OVO - 0812345678",
    time: "30m ago",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d",
  },
  {
    name: "William Kim",
    method: "Credit Card",
    time: "1h ago",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026707d",
  },
  {
    name: "Sofia Davis",
    method: "PayPal",
    time: "1 day ago",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026708d",
  },
];

const RecentPaymentsList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Payments</CardTitle>
        <CardDescription>
          Users who recently completed their payments.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {payments.map((payment, index) => (
          <div
            key={index}
            className="flex items-center justify-between space-x-4"
          >
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={payment.avatar} alt="Avatar" />
                <AvatarFallback>{payment.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">
                  {payment.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {payment.method}
                </p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">{payment.time}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentPaymentsList;
