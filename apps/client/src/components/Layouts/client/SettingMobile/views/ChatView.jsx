import { Switch } from "@/components/ui/switch";

const ChatToggleItem = ({ title, description, defaultChecked = true }) => (
  <div className="flex items-start justify-between p-4 border-b dark:border-slate-800 last:border-b-0">
    <div className="pr-4">
      <p className="font-medium text-sm">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    <Switch defaultChecked={defaultChecked} />
  </div>
);

const ChatView = () => {
  return (
    <div className="animate-fade-in pt-4">
      <div className="bg-card border-y dark:border-slate-800">
        <ChatToggleItem
          title="Allow People to Send Chat"
          description="You can receive messages from other users."
        />
        <ChatToggleItem
          title="Receive Chats from Vendora"
          description="Get updates, promotions, and support via chat."
        />
      </div>
    </div>
  );
};

export default ChatView;
