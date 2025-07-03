import NavLink from "./NavLink";
import CollapsibleNavLink from "./CollabsibleNavLink";
import SubNavLink from "./SubNavLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Package,
  Store,
  ShoppingCart,
  MessageCircle,
  BarChart,
  Star,
  Receipt,
  Wallet,
  User,
  Ticket,
  HelpCircle,
  Settings,
  Store as StoreIcon,
} from "lucide-react";

export const SidebarMenuContent = ({ isCollapsed }) => (
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
      <NavLink
        to="/store/dashboard"
        icon={<LayoutDashboard />}
        isCollapsed={isCollapsed}
      >
        Dashboard
      </NavLink>

      <CollapsibleNavLink
        icon={<Package />}
        title="Products"
        isCollapsed={isCollapsed}
        basePath="/store/products"
      >
        <SubNavLink to="/store/products">All Products</SubNavLink>
        <SubNavLink to="/store/products/new">Add Product</SubNavLink>
        <SubNavLink to="/store/products/categories">Categories</SubNavLink>
      </CollapsibleNavLink>

      <NavLink
        to="/store/settings/store"
        icon={<Store />}
        isCollapsed={isCollapsed}
      >
        Store Settings
      </NavLink>

      <CollapsibleNavLink
        icon={<ShoppingCart />}
        title="Orders"
        isCollapsed={isCollapsed}
        basePath="/store/orders"
      >
        <SubNavLink to="/store/orders">All Orders</SubNavLink>
        <SubNavLink to="/store/orders/awaiting-confirmation">
          Awaiting Confirmation
        </SubNavLink>
        <SubNavLink to="/store/orders/shipment">In Shipment</SubNavLink>
        <SubNavLink to="/store/orders/history">Order History</SubNavLink>
      </CollapsibleNavLink>

      <NavLink
        to="/store/messages"
        icon={<MessageCircle />}
        isCollapsed={isCollapsed}
      >
        Messages
      </NavLink>

      <NavLink
        to="/store/analytics"
        icon={<BarChart />}
        isCollapsed={isCollapsed}
      >
        Analytics
      </NavLink>

      <NavLink to="/store/reviews" icon={<Star />} isCollapsed={isCollapsed}>
        Reviews & Feedback
      </NavLink>

      <NavLink icon={<Receipt />} isCollapsed={isCollapsed}>
        Invoices
      </NavLink>

      <CollapsibleNavLink
        icon={<Wallet />}
        title="Finance"
        isCollapsed={isCollapsed}
        basePath="/store/finance"
      >
        <SubNavLink to="/store/finance">Revenue</SubNavLink>
        <SubNavLink to="/store/finance/withdrawals">Withdrawals</SubNavLink>
        <SubNavLink to="/store/finance/payment-history">
          Payment History
        </SubNavLink>
      </CollapsibleNavLink>

      <NavLink
        to="/store/promotions"
        icon={<Ticket />}
        isCollapsed={isCollapsed}
      >
        Promotions
      </NavLink>
      <p
        className={`px-4 pt-6 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider ${
          isCollapsed ? "text-center" : ""
        }`}
      >
        {!isCollapsed && "Support"}
      </p>
      <NavLink
        to="/store/support"
        icon={<HelpCircle />}
        isCollapsed={isCollapsed}
      >
        Help Center
      </NavLink>
      <NavLink icon={<Settings />} isCollapsed={isCollapsed}>
        Settings
      </NavLink>
    </nav>
    <div className="mt-auto border-t p-4 flex-shrink-0">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <div className="overflow-hidden">
            <p className="font-semibold truncate">shadcn</p>
            <p className="text-xs text-muted-foreground truncate">
              shadcn@example.com
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);

const Sidebar = ({ isCollapsed }) => {
  return (
    <aside
      className={`hidden md:flex flex-col border-r bg-background transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <SidebarMenuContent isCollapsed={isCollapsed} />
    </aside>
  );
};

export default Sidebar;
