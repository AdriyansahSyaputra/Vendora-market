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
    <div className="flex items-center h-16 border-b px-4">
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
      <NavLink icon={<LayoutDashboard />} isCollapsed={isCollapsed}>
        Dashboard
      </NavLink>
      <CollapsibleNavLink
        icon={<Package />}
        title="Products"
        isCollapsed={isCollapsed}
      >
        <SubNavLink>All Products</SubNavLink>
        <SubNavLink>Add Product</SubNavLink>
        <SubNavLink>Categories</SubNavLink>
      </CollapsibleNavLink>
      <CollapsibleNavLink
        icon={<Store />}
        title="Store"
        isCollapsed={isCollapsed}
      >
        <SubNavLink>Store Profile</SubNavLink>
        <SubNavLink>Store Settings</SubNavLink>
      </CollapsibleNavLink>
      <CollapsibleNavLink
        icon={<ShoppingCart />}
        title="Orders"
        isCollapsed={isCollapsed}
      >
        <SubNavLink>All Orders</SubNavLink>
        <SubNavLink>Awaiting Confirmation</SubNavLink>
        <SubNavLink>In Shipment</SubNavLink>
        <SubNavLink>Order History</SubNavLink>
      </CollapsibleNavLink>
      <NavLink icon={<MessageCircle />} isCollapsed={isCollapsed}>
        Messages
      </NavLink>
      <NavLink icon={<BarChart />} isCollapsed={isCollapsed}>
        Analytics
      </NavLink>
      <NavLink icon={<Star />} isCollapsed={isCollapsed}>
        Reviews & Feedback
      </NavLink>
      <NavLink icon={<Receipt />} isCollapsed={isCollapsed}>
        Invoices
      </NavLink>
      <CollapsibleNavLink
        icon={<Wallet />}
        title="Finance"
        isCollapsed={isCollapsed}
      >
        <SubNavLink>Revenue</SubNavLink>
        <SubNavLink>Withdrawals</SubNavLink>
        <SubNavLink>Payment History</SubNavLink>
      </CollapsibleNavLink>
      <NavLink icon={<User />} isCollapsed={isCollapsed}>
        My Account
      </NavLink>
      <NavLink icon={<Ticket />} isCollapsed={isCollapsed}>
        Promotions
      </NavLink>
      <p
        className={`px-4 pt-6 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider ${
          isCollapsed ? "text-center" : ""
        }`}
      >
        {!isCollapsed && "Support"}
      </p>
      <NavLink icon={<HelpCircle />} isCollapsed={isCollapsed}>
        Help Center
      </NavLink>
      <NavLink icon={<Settings />} isCollapsed={isCollapsed}>
        Settings
      </NavLink>
    </nav>
    <div className="mt-auto border-t p-4">
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
