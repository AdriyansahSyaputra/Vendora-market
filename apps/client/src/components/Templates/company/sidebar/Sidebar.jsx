import Navlink from "./Navlink";
import SubNavlink from "./SubNavlink";
import CollapsibleNavLink from "../../vendor/sidebar/CollabsibleNavLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  User,
  Package,
  ShoppingCart,
  Store,
  CircleAlert,
  Bell,
  Settings,
  ChartNoAxesCombined,
  Store as StoreIcon,
  MessageCircle,
  BarChart,
  Star,
  Receipt,
  Wallet,
  Ticket,
  HelpCircle,
  Truck,
  ServerCog,
  History,
} from "lucide-react";

export const SidebarMenuContent = ({ isCollapsed }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center h-16 border-b px-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg text-primary-foreground">
            <StoreIcon className="h-6 w-6" />
          </div>
          {!isCollapsed && (
            <div>
              <p className="font-bold text-lg leading-tight">Asus Store</p>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        <p
          className={`px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider ${
            isCollapsed ? "text-center" : ""
          }`}
        >
          {!isCollapsed && "Main Menu"}
        </p>
        <Navlink
          to="/dashboard"
          icon={<LayoutDashboard />}
          isCollapsed={isCollapsed}
        >
          Dashboard
        </Navlink>

        <CollapsibleNavLink
          icon={<User />}
          title="Users"
          isCollapsed={isCollapsed}
          basePath="/dashboard/users"
        >
          <SubNavlink to="/dashboard/users">All Users</SubNavlink>
          <SubNavlink to="/dashboard/users/active">
            Seller Verification
          </SubNavlink>
        </CollapsibleNavLink>

        <CollapsibleNavLink
          icon={<Package />}
          title="Products"
          isCollapsed={isCollapsed}
          basePath="/dashboard/products"
        >
          <SubNavlink to="/dashboard/products">All Products</SubNavlink>
          <SubNavlink to="/dashboard/products/new">
            Category Management
          </SubNavlink>
        </CollapsibleNavLink>

        <Navlink
          to="/dashboard/orders"
          icon={<Truck />}
          isCollapsed={isCollapsed}
        >
          Order Management
        </Navlink>

        <CollapsibleNavLink
          icon={<Receipt />}
          title="Transactions & Finance"
          isCollapsed={isCollapsed}
          basePath="/dashboard/transactions"
        >
          <SubNavlink to="/dashboard/transactions">List Transaction</SubNavlink>
          <SubNavlink to="/dashboard/transactions/payout">
            Payout Seller
          </SubNavlink>
          <SubNavlink to="/dashboard/transactions/refunds">Refunds</SubNavlink>
          <SubNavlink to="/dashboard/transactions/commission">
            Platform Commission
          </SubNavlink>
          <SubNavlink to="/dashboard/transactions/complain">
            Complain
          </SubNavlink>
        </CollapsibleNavLink>

        <Navlink
          to="/dashboard/stores"
          icon={<Store />}
          isCollapsed={isCollapsed}
        >
          Store Management
        </Navlink>

        <CollapsibleNavLink
          icon={<Ticket />}
          title="Advertisements"
          isCollapsed={isCollapsed}
          basePath="/dashboard/advertisements"
        >
          <SubNavlink to="/dashboard/advertisements">Advertisement</SubNavlink>
          <SubNavlink to="/dashboard/advertisements/voucher">
            Voucher
          </SubNavlink>
        </CollapsibleNavLink>

        <Navlink
          to="/dashboard/analytics"
          icon={<BarChart />}
          isCollapsed={isCollapsed}
        >
          Analytics
        </Navlink>

        <CollapsibleNavLink
          icon={<ServerCog />}
          title="System Settings"
          isCollapsed={isCollapsed}
          basePath="/dashboard/system-settings"
        >
          <SubNavlink to="/dashboard/system-settings/policies">
            Platform Policy
          </SubNavlink>
          <SubNavlink to="/dashboard/system-settings/notification">
            System Notification
          </SubNavlink>
          <SubNavlink to="/dashboard/system-settings/backup">
            Backup Database
          </SubNavlink>
        </CollapsibleNavLink>

        <Navlink
          to="/dashboard/activity"
          icon={<History />}
          isCollapsed={isCollapsed}
        >
          Log Activity
        </Navlink>
        <p
          className={`px-4 pt-6 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider ${
            isCollapsed ? "text-center" : ""
          }`}
        >
          {!isCollapsed && "Support"}
        </p>
        <Navlink
          to="/store/support"
          icon={<HelpCircle />}
          isCollapsed={isCollapsed}
        >
          Help Center
        </Navlink>
        <Navlink icon={<Settings />} isCollapsed={isCollapsed}>
          Settings
        </Navlink>
      </nav>
    </div>
  );
};

const Sidebar = ({ isCollapsed }) => {
  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 hidden md:flex flex-col bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <SidebarMenuContent isCollapsed={isCollapsed} />
    </aside>
  );
};

export default Sidebar;
