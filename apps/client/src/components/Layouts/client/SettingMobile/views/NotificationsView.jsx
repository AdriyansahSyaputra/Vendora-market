import { Switch } from "@/components/ui/switch";

const NotificationToggleItem = ({ title, description }) => (
  <div className="flex items-center justify-between p-4 border-b dark:border-slate-800 last:border-b-0">
    <div>
      <p className="font-medium text-sm">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    <Switch />
  </div>
);

const NotificationsView = () => {
  return (
    <div className="animate-fade-in">
      <div className="pt-4">
        <h2 className="px-4 pb-2 text-sm font-semibold text-muted-foreground">
          APP NOTIFICATIONS
        </h2>
        <div className="bg-card border-y dark:border-slate-800">
          <NotificationToggleItem
            title="Sounds"
            description="Play sounds for incoming notifications."
          />
          <NotificationToggleItem
            title="Orders"
            description="Updates on your order status."
          />
          <NotificationToggleItem
            title="Chats"
            description="New messages from sellers or buyers."
          />
          <NotificationToggleItem
            title="Promotions"
            description="Receive special offers and deals."
          />
        </div>
      </div>
      <div className="pt-6">
        <h2 className="px-4 pb-2 text-sm font-semibold text-muted-foreground">
          EMAIL
        </h2>
        <div className="bg-card border-y dark:border-slate-800">
          <NotificationToggleItem
            title="Order Status"
            description="Get email updates for your orders."
          />
          <NotificationToggleItem
            title="Promotions"
            description="Newsletters and special offers."
          />
          <NotificationToggleItem
            title="Surveys"
            description="Participate in surveys to improve our service."
          />
        </div>
      </div>
      <div className="pt-6">
        <h2 className="px-4 pb-2 text-sm font-semibold text-muted-foreground">
          SMS
        </h2>
        <div className="bg-card border-y dark:border-slate-800">
          <NotificationToggleItem
            title="SMS Notifications"
            description="Receive critical alerts via SMS."
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationsView;
