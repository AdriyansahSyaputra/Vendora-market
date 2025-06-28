import { Helmet } from "react-helmet-async";
import { useState } from "react";
import SettingsAccordion from "@/components/Layouts/client/SettingMobile/SettingsAccordion";
import SettingsMenuItem from "@/components/Layouts/client/SettingMobile/SettingsMenuItem";
import {
  ChevronLeft,
  UserCog,
  MapPin,
  ShieldCheck,
  CreditCard,
  Bell,
  Palette,
  Lock,
  MessageSquare,
  Languages,
  HelpCircle,
  FileText,
  Info,
  Headset,
  Trash2,
  LogOut,
} from "lucide-react";
import AddressListView from "@/components/Layouts/client/SettingMobile/views/AddressListView";
import PaymentSettingsView from "@/components/Layouts/client/SettingMobile/views/PaymentSettingsView";
import AccountSecurityView from "@/components/Layouts/client/SettingMobile/views/AccountSecurityView";
import AppearanceView from "@/components/Layouts/client/SettingMobile/views/AppearanceView";
import HelpCenterView from "@/components/Layouts/client/SettingMobile/views/HelpCenterView";
import NotificationsView from "@/components/Layouts/client/SettingMobile/views/NotificationsView";
import PrivacyView from "@/components/Layouts/client/SettingMobile/views/PrivacyView";
import RequestDeletionView from "@/components/Layouts/client/SettingMobile/views/RequestDeletionView";
import LanguageView from "@/components/Layouts/client/SettingMobile/views/LanguageView";
import CustomerServiceView from "@/components/Layouts/client/SettingMobile/views/CustomerServiceView";
import InformationView from "@/components/Layouts/client/SettingMobile/views/InformationView";
import ChatView from "@/components/Layouts/client/SettingMobile/views/ChatView";
import ProfileView from "@/components/Layouts/client/SettingMobile/views/ProfileView";
import PoliciesView from "@/components/Layouts/client/SettingMobile/views/PoliciesView";

// Komponen untuk menu utama
const MainSettingsMenu = ({ onNavigate }) => (
  <>
    <div className="pt-4">
      <h2 className="px-4 pb-2 text-sm font-semibold text-muted-foreground">
        ACCOUNT SETTINGS
      </h2>
      <div className="bg-card border-y dark:border-slate-800">
        <SettingsMenuItem
          icon={UserCog}
          label="Edit Profile"
          onClick={() => onNavigate("profile")}
        />
        <div className="border-t border-border dark:border-slate-800 mx-4"></div>
        <SettingsMenuItem
          icon={MapPin}
          label="Address List"
          onClick={() => onNavigate("address")}
        />
        <div className="border-t border-border dark:border-slate-800 mx-4"></div>
        <SettingsMenuItem
          icon={ShieldCheck}
          label="Account Security"
          onClick={() => onNavigate("security")}
        />
        <div className="border-t border-border dark:border-slate-800 mx-4"></div>
        <SettingsMenuItem
          icon={CreditCard}
          label="Cards / Bank Accounts"
          onClick={() => onNavigate("payment")}
        />
      </div>
    </div>
    <div className="mt-6">
      <div className="bg-card border-y dark:border-slate-800">
        <SettingsAccordion title="General Settings">
          <SettingsMenuItem
            icon={Bell}
            label="Notifications"
            onClick={() => onNavigate("notifications")}
          />
          <SettingsMenuItem
            icon={Palette}
            label="Appearance"
            onClick={() => onNavigate("appearance")}
          />
          <SettingsMenuItem
            icon={Lock}
            label="Privacy"
            onClick={() => onNavigate("privacy")}
          />
          <SettingsMenuItem
            icon={MessageSquare}
            label="Chat"
            onClick={() => onNavigate("chat")}
          />
          <SettingsMenuItem
            icon={Languages}
            label="Language"
            onClick={() => onNavigate("language")}
          />
        </SettingsAccordion>
        <SettingsAccordion title="Help">
          <SettingsMenuItem
            icon={HelpCircle}
            label="Help Center"
            onClick={() => onNavigate("help-center")}
          />
          <SettingsMenuItem
            icon={FileText}
            label="Vendora Policies"
            onClick={() => onNavigate("policies")}
          />
          <SettingsMenuItem
            icon={Info}
            label="Information"
            onClick={() => onNavigate("information")}
          />
          <SettingsMenuItem
            icon={Headset}
            label="Customer Service"
            onClick={() => onNavigate("customer-service")}
          />
          <SettingsMenuItem
            icon={Trash2}
            label="Request Account Deletion"
            onClick={() => onNavigate("request-deletion")}
          />
        </SettingsAccordion>
      </div>
    </div>
    <div className="p-4 mt-8">
      <button className="w-full flex items-center justify-center gap-2 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 font-bold py-3 px-4 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  </>
);

const SettingPageMobile = () => {
  const [view, setView] = useState("main"); // 'main', 'profile', 'address', etc.

  const viewTitles = {
    main: "Settings",
    profile: "Edit Profile",
    address: "Address List",
    security: "Account Security",
    payment: "Cards & Bank Accounts",
    notifications: "Notifications",
    appearance: "Appearance",
    privacy: "Privacy",
    chat: "Chat",
    language: "Language",
    "help-center": "Help Center",
    policies: "Vendora Policies",
    information: "Information",
    "customer-service": "Customer Service",
    "request-deletion": "Delete Account",
  };

  const renderContent = () => {
    switch (view) {
      case "profile":
        return <ProfileView />;
      case "address":
        return <AddressListView />;
      case "security":
        return <AccountSecurityView />;
      case "payment":
        return <PaymentSettingsView />;
      case "notifications":
        return <NotificationsView />;
      case "appearance":
        return <AppearanceView />;
      case "privacy":
        return <PrivacyView />;
      case "chat":
        return <ChatView />;
      case "language":
        return <LanguageView />;
      case "help-center":
        return <HelpCenterView />;
      case "policies":
        return <PoliciesView />;
      case "information":
        return <InformationView />;
      case "customer-service":
        return <CustomerServiceView />;
      case "request-deletion":
        return <RequestDeletionView />;
      case "main":
      default:
        return <MainSettingsMenu onNavigate={setView} />;
    }
  };

  return (
    <>
      <Helmet title="Settings" />
      <div className="bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 min-h-screen">
        {/* Header Dinamis */}
        <header className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b dark:border-slate-800">
          <div className="flex items-center h-16 px-2">
            {view !== "main" && (
              <button
                onClick={() => setView("main")}
                className="p-2 rounded-full hover:bg-accent dark:hover:bg-slate-800"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            <h1 className="text-lg font-bold mx-auto pr-10">
              {viewTitles[view]}
            </h1>
          </div>
        </header>

        <main className="pb-20">{renderContent()}</main>
      </div>
    </>
  );
};

export default SettingPageMobile;
