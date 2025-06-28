import { Switch } from "@/components/ui/switch";
import SettingsContentCard from "@/components/Elements/SettingsContentCard";

const ChatSettingsView = () => {
  const ChatToggleItem = ({ title, description }) => (
    <div className="flex items-center justify-between p-4 border-b dark:border-slate-800 last:border-b-0">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked />
    </div>
  );

  return (
    <SettingsContentCard
      title="Chat"
      description="Manage your chat preferences."
    >
      <div className="border rounded-lg dark:border-slate-800">
        <ChatToggleItem
          title="Allow People to Send Chat"
          description="You can receive messages from other users."
        />
        <ChatToggleItem
          title="Receive Chats from Vendora"
          description="Get updates, promotions, and support via chat."
        />
      </div>
    </SettingsContentCard>
  );
};

export default ChatSettingsView;
