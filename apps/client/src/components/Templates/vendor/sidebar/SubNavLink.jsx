import { Button } from "@/components/ui/button";

const SubNavLink = ({ children }) => (
  <Button
    variant="ghost"
    className="w-full justify-start text-muted-foreground hover:text-foreground h-9"
  >
    {children}
  </Button>
);

export default SubNavLink;
