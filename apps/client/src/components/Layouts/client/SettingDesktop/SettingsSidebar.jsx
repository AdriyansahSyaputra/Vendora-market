import {
  UserCog,
  MapPin,
  ShieldCheck,
  CreditCard,
  Bell,
  Palette,
  Lock,
  MessageSquare,
  Languages,
  HelpCircle,
  FileText,
  Info,
  Headset,
  Trash2,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Helper component for menu items
const SidebarMenuItem = ({
  icon: Icon,
  label,
  isActive,
  isCollapsed,
  ...props
}) => (
  <button
    className={`flex items-center w-full text-left rounded-md p-2 transition-colors ${
      isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent"
    } ${isCollapsed ? "justify-center" : ""}`}
    {...props}
  >
    <Icon className={`w-5 h-5 ${isCollapsed ? "" : "mr-3"}`} />
    {!isCollapsed && (
      <span className="flex-grow text-sm font-medium">{label}</span>
    )}
  </button>
);

const SettingsSidebar = ({
  isCollapsed,
  toggleSidebar,
  activeView,
  setActiveView,
}) => {
  const menuStructure = [
    {
      title: "Account Settings",
      items: [
        { id: "profile", label: "Edit Profile", icon: UserCog },
        { id: "address", label: "Address List", icon: MapPin },
        { id: "security", label: "Account Security", icon: ShieldCheck },
        { id: "payment", label: "Cards / Bank Accounts", icon: CreditCard },
      ],
    },
    {
      title: "General Settings",
      items: [
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "appearance", label: "Appearance", icon: Palette },
        { id: "privacy", label: "Privacy", icon: Lock },
        { id: "chat", label: "Chat", icon: MessageSquare },
        { id: "language", label: "Language", icon: Languages },
      ],
    },
    {
      title: "Help",
      items: [
        { id: "help-center", label: "Help Center", icon: HelpCircle },
        { id: "policies", label: "Vendora Policies", icon: FileText },
        { id: "info", label: "Information", icon: Info },
        { id: "customer-service", label: "Customer Service", icon: Headset },
        { id: "delete-account", label: "Request Deletion", icon: Trash2 },
      ],
    },
  ];

  return (
    <aside
      className={`flex flex-col bg-card border-r border-border transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div
        className={`flex items-center p-4 border-b border-border ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!isCollapsed && <h2 className="text-lg font-bold">Settings</h2>}
        <Button variant="outline" size="icon" onClick={toggleSidebar}>
          {isCollapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <ChevronsLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <nav className="flex-grow p-2 space-y-4">
        {menuStructure.map((section) => (
          <div key={section.title}>
            {!isCollapsed && (
              <h3 className="px-2 mb-2 text-xs font-semibold uppercase text-muted-foreground">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <SidebarMenuItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  isActive={activeView === item.id}
                  isCollapsed={isCollapsed}
                  onClick={() => setActiveView(item.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default SettingsSidebar;
