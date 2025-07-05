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
          to="/store/dashboard"
          icon={<LayoutDashboard />}
          isCollapsed={isCollapsed}
        >
          Dashboard
        </Navlink>

        <CollapsibleNavLink
          icon={<Package />}
          title="Products"
          isCollapsed={isCollapsed}
          basePath="/store/products"
        >
          <SubNavlink to="/store/products">All Products</SubNavlink>
          <SubNavlink to="/store/products/new">Add Product</SubNavlink>
          <SubNavlink to="/store/products/categories">Categories</SubNavlink>
        </CollapsibleNavLink>

        <Navlink
          to="/store/settings/store"
          icon={<Store />}
          isCollapsed={isCollapsed}
        >
          Store Settings
        </Navlink>

        <CollapsibleNavLink
          icon={<ShoppingCart />}
          title="Orders"
          isCollapsed={isCollapsed}
          basePath="/store/orders"
        >
          <SubNavlink to="/store/orders">All Orders</SubNavlink>
          <SubNavlink to="/store/orders/awaiting-confirmation">
            Awaiting Confirmation
          </SubNavlink>
          <SubNavlink to="/store/orders/shipment">In Shipment</SubNavlink>
          <SubNavlink to="/store/orders/history">Order History</SubNavlink>
        </CollapsibleNavLink>

        <Navlink
          to="/store/messages"
          icon={<MessageCircle />}
          isCollapsed={isCollapsed}
        >
          Messages
        </Navlink>

        <Navlink
          to="/store/analytics"
          icon={<BarChart />}
          isCollapsed={isCollapsed}
        >
          Analytics
        </Navlink>

        <Navlink to="/store/reviews" icon={<Star />} isCollapsed={isCollapsed}>
          Reviews & Feedback
        </Navlink>

        <Navlink icon={<Receipt />} isCollapsed={isCollapsed}>
          Invoices
        </Navlink>

        <CollapsibleNavLink
          icon={<Wallet />}
          title="Finance"
          isCollapsed={isCollapsed}
          basePath="/store/finance"
        >
          <SubNavlink to="/store/finance">Revenue</SubNavlink>
          <SubNavlink to="/store/finance/withdrawals">Withdrawals</SubNavlink>
          <SubNavlink to="/store/finance/payment-history">
            Payment History
          </SubNavlink>
        </CollapsibleNavLink>

        <Navlink
          to="/store/promotions"
          icon={<Ticket />}
          isCollapsed={isCollapsed}
        >
          Promotions
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
      className={`fixed top-0 left-0 bottom-0 hidden md:flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <SidebarMenuContent isCollapsed={isCollapsed} />
    </aside>
  );
};

export default Sidebar;
