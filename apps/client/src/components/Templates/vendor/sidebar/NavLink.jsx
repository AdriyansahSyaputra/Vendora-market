import { Button } from "@/components/ui/button";

const NavLink = ({ icon, children, isCollapsed, ...props }) => (
  <Button
    variant="ghost"
    className="w-full justify-start items-center gap-4 px-4"
  >
    {icon}
    {!isCollapsed && <span className="truncate">{children}</span>}
  </Button>
);

export default NavLink;
