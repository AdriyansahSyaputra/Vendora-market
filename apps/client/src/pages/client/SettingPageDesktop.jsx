import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Search } from "lucide-react";
import SettingsSidebar from "@/components/Layouts/client/SettingDesktop/SettingsSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileSettingsView from "@/components/Layouts/client/SettingDesktop/views/ProfileSettingsView";
import AddressSettingsView from "@/components/Layouts/client/SettingDesktop/views/AddressSettingsView";
import PaymentSettingsView from "@/components/Layouts/client/SettingDesktop/views/PaymentSettingsView";
import AccountSecurityView from "@/components/Layouts/client/SettingDesktop/views/AccountSecurityView";
import NotificationSettingsView from "@/components/Layouts/client/SettingDesktop/views/NotificationSettingsView";
import AppearanceSettingsView from "@/components/Layouts/client/SettingDesktop/views/AppearanceSettingsView";
import PrivacySettingsView from "@/components/Layouts/client/SettingDesktop/views/PrivacySettingsView";
import ChatSettingsView from "@/components/Layouts/client/SettingDesktop/views/ChatSettingsView";
import LanguageSettingsView from "@/components/Layouts/client/SettingDesktop/views/LanguageSettingsView";
import HelpCenterView from "@/components/Layouts/client/SettingDesktop/views/HelpCenterView";
import PoliciesView from "@/components/Layouts/client/SettingDesktop/views/PoliciesView";
import RequestDeletionView from "@/components/Layouts/client/SettingDesktop/views/RequestDeletion";

const SettingPageDesktop = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState("profile"); // Default view

  const renderActiveView = () => {
    switch (activeView) {
      case "profile":
        return <ProfileSettingsView />;
      case "address":
        return <AddressSettingsView />;
      case "security":
        return <AccountSecurityView />;
      case "payment":
        return <PaymentSettingsView />;
      case "notifications":
        return <NotificationSettingsView />;
      case "appearance":
        return <AppearanceSettingsView />;
      case "privacy":
        return <PrivacySettingsView />;
      case "chat":
        return <ChatSettingsView />;
      case "language":
        return <LanguageSettingsView />;
      case "help-center":
        return <HelpCenterView />;
      case "policies":
        return <PoliciesView />;
      case "delete-account":
        return <RequestDeletionView />;
      default:
        return <ProfileSettingsView />;
    }
  };

  return (
    <>
      <Helmet title="Settings" />

      <div className="hidden md:flex h-screen w-full bg-background text-foreground">
        <SettingsSidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          activeView={activeView}
          setActiveView={setActiveView}
        />
        <div className="flex flex-col flex-grow">
          {/* Topbar */}
          <header className="flex items-center h-16 px-6 border-b border-border bg-card flex-shrink-0">
            <Button variant="outline" size="icon" className="mr-4">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search settings..." className="pl-10" />
            </div>
            <div className="ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                {/* Tambahkan DropdownMenuContent di sini */}
              </DropdownMenu>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-grow overflow-y-auto p-6 lg:p-8">
            {renderActiveView()}
          </main>
        </div>
      </div>
    </>
  );
};

export default SettingPageDesktop;
