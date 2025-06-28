import { Switch } from "@/components/ui/switch";
import SettingsContentCard from "@/components/Elements/SettingsContentCard";

const NotificationToggleItem = ({ title, description }) => (
  <div className="flex items-center justify-between p-4 border-b dark:border-slate-800 last:border-b-0">
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <Switch />
  </div>
);

const NotificationSettingsView = () => {
  return (
    <SettingsContentCard
      title="Notifications"
      description="Manage how you receive notifications from us."
    >
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-2">App Notifications</h3>
          <div className="border rounded-lg dark:border-slate-800">
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
        <div>
          <h3 className="text-lg font-medium mb-2">Email</h3>
          <div className="border rounded-lg dark:border-slate-800">
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
        <div>
          <h3 className="text-lg font-medium mb-2">SMS</h3>
          <div className="border rounded-lg dark:border-slate-800">
            <NotificationToggleItem
              title="SMS Notifications"
              description="Receive critical alerts via SMS."
            />
          </div>
        </div>
      </div>
    </SettingsContentCard>
  );
};

export default NotificationSettingsView;
