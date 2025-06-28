import { useState } from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import SettingsContentCard from "@/components/Elements/SettingsContentCard";

const AppearanceSettingsView = () => {
  const [theme, setTheme] = useState("light");

  return (
    <SettingsContentCard
      title="Appearance"
      description="Customize the look and feel of the app."
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Theme</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select the theme for the app.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setTheme("light")}
              className={`p-4 border-2 rounded-lg text-center space-y-2 transition-colors ${
                theme === "light"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/50"
                  : "border-border"
              }`}
            >
              <Sun className="mx-auto h-6 w-6" />
              <p className="font-medium">Light</p>
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`p-4 border-2 rounded-lg text-center space-y-2 transition-colors ${
                theme === "dark"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/50"
                  : "border-border"
              }`}
            >
              <Moon className="mx-auto h-6 w-6" />
              <p className="font-medium">Dark</p>
            </button>
            <button
              onClick={() => setTheme("system")}
              className={`p-4 border-2 rounded-lg text-center space-y-2 transition-colors ${
                theme === "system"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/50"
                  : "border-border"
              }`}
            >
              <Laptop className="mx-auto h-6 w-6" />
              <p className="font-medium">System</p>
            </button>
          </div>
        </div>
        {/* Anda bisa menambahkan pengaturan lain seperti ukuran font di sini */}
      </div>
    </SettingsContentCard>
  );
};

export default AppearanceSettingsView;
