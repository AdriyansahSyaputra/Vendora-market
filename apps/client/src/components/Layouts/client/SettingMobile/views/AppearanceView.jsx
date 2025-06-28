import { Sun, Moon, Laptop } from "lucide-react";
import { useState } from "react";

const AppearanceView = () => {
  const [theme, setTheme] = useState("light");

  return (
    <div className="p-4 animate-fade-in">
      <h3 className="text-base font-semibold mb-2">Theme</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Select the theme for the app.
      </p>
      <div className="space-y-3">
        <button
          onClick={() => setTheme("light")}
          className={`flex items-center gap-4 p-4 border-2 w-full rounded-lg text-left transition-colors ${
            theme === "light"
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/50"
              : "border-border"
          }`}
        >
          <Sun className="h-5 w-5" />
          <p className="font-medium text-sm">Light</p>
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`flex items-center gap-4 p-4 border-2 w-full rounded-lg text-left transition-colors ${
            theme === "dark"
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/50"
              : "border-border"
          }`}
        >
          <Moon className="h-5 w-5" />
          <p className="font-medium text-sm">Dark</p>
        </button>
        <button
          onClick={() => setTheme("system")}
          className={`flex items-center gap-4 p-4 border-2 w-full rounded-lg text-left transition-colors ${
            theme === "system"
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/50"
              : "border-border"
          }`}
        >
          <Laptop className="h-5 w-5" />
          <p className="font-medium text-sm">System</p>
        </button>
      </div>
    </div>
  );
};

export default AppearanceView;
