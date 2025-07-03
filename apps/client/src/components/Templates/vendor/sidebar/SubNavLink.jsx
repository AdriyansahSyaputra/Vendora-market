import { Button } from "@/components/ui/button";
import { NavLink as RouterNavLink } from "react-router-dom";

const SubNavLink = ({ to, children }) => (
  <RouterNavLink to={to} end className="w-full">
    {({ isActive }) => (
      <Button
        variant="ghost"
        className={`w-full justify-start h-9 pl-8 ${
          isActive
            ? "text-foreground bg-muted"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {children}
      </Button>
    )}
  </RouterNavLink>
);

export default SubNavLink;
