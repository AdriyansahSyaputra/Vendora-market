import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Inbox, MailOpen, AlertCircle, CheckSquare } from "lucide-react";

const messageStats = [
  {
    title: "New Messages",
    value: "12",
    icon: <Inbox className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />,
    description: "Unread messages today",
  },
  {
    title: "Read Today",
    value: "45",
    icon: <MailOpen className="h-5 w-5 text-green-600 dark:text-green-400" />,
    description: "Total messages read",
  },
  {
    title: "Requires Action",
    value: "3",
    icon: (
      <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
    ),
    description: "Messages needing urgent reply",
  },
  {
    title: "Resolved",
    value: "28",
    icon: (
      <CheckSquare className="h-5 w-5 text-slate-600 dark:text-slate-400" />
    ),
    description: "Conversations closed today",
  },
];

const MessageStatCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {messageStats.map((stat) => (
        <Card
          key={stat.title}
          className="hover:border-cyan-500/50 dark:hover:border-cyan-400/50 transition-colors"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MessageStatCards;
