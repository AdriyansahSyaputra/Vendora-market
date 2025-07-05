import { Button } from "@/components/ui/button";
import { NavLink as RouterNavLink } from "react-router-dom";

const Navlink = ({ to, icon, children, isCollapsed, ...props }) => (
  <RouterNavLink to={to} end className="w-full">
    {({ isActive }) => (
      <Button
        // 'variant' berubah menjadi 'secondary' jika link sedang aktif
        variant={isActive ? "secondary" : "ghost"}
        className="w-full justify-start items-center gap-4 px-4"
      >
        {icon}
        {!isCollapsed && <span className="truncate">{children}</span>}
      </Button>
    )}
  </RouterNavLink>
);

export default Navlink;
