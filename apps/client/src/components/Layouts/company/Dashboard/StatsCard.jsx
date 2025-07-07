import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatCard = ({ title, value, icon: Icon, change, period }) => {
  const isIncrease = change >= 0;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span
            className={cn(
              "font-semibold",
              isIncrease ? "text-green-500" : "text-red-500"
            )}
          >
            {isIncrease ? `+${change}%` : `${change}%`}
          </span>{" "}
          dibanding {period}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
