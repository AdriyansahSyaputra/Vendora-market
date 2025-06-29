import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";

const statCards = [
  {
    title: "Today's Revenue",
    amount: "$1,482.50",
    description: "+15.2% from yesterday",
    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    color: "text-green-500",
  },
  {
    title: "New Customers",
    amount: "+32",
    description: "+5.8% from last week",
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
    color: "text-green-500",
  },
  {
    title: "Sales",
    amount: "+159",
    description: "Total sales transactions today",
    icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
    color: "text-blue-500",
  },
  {
    title: "Pending Orders",
    amount: "21",
    description: "Awaiting confirmation",
    icon: <Activity className="h-4 w-4 text-muted-foreground" />,
    color: "text-orange-500",
  },
];

const DashboardStatsGrid = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {statCards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.amount}</div>
            <p className={`text-xs ${card.color}`}>{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStatsGrid;
