import { ChevronRight } from "lucide-react";

const SettingsMenuItem = ({ icon: Icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center w-full text-left px-4 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
    >
      {Icon && <Icon className="w-5 h-5 mr-4 text-muted-foreground" />}
      <span className="flex-grow">{label}</span>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
  );
};

export default SettingsMenuItem;
