import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const CollapsibleNavLink = ({ icon, title, children, isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start items-center gap-4 px-4"
        >
          {icon}
          {!isCollapsed && (
            <span className="flex-1 text-left truncate">{title}</span>
          )}
          {!isCollapsed &&
            (isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            ))}
        </Button>
      </CollapsibleTrigger>
      {!isCollapsed && (
        <CollapsibleContent className="pl-12 py-1 space-y-1 bg-muted/50">
          {children}
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};

export default CollapsibleNavLink;
