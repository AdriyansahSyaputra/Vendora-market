import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import MobileBottomNav from "@/components/Templates/client/navbar/MobileBottomNav";
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

const SettingPageMobile = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet title="Settings" />

      <div className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
        <MobileBottomNav />

        {/* Header */}
        <header className="sticky top-0 backdrop-blur-sm z-10 border-b dark:border-gray-800">
          <div className="flex items-center h-16 px-2">
            <Link
              to={navigate(-1)}
              className="p-2 rounded-full hover:bg-accent dark:hover:bg-gray-800"
            >
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-lg font-bold mx-auto">Settings</h1>
            {/* Placeholder untuk menjaga judul tetap di tengah */}
            <div className="w-10"></div>
          </div>
        </header>

        {/* Konten Utama Halaman */}
        <main className="w-full max-w-md mx-auto text-foreground min-h-screen">
          {/* Account Settings Section */}
          <div className="pt-4">
            <h2 className="px-4 pb-2 text-sm font-semibold text-muted-foreground">
              ACCOUNT SETTINGS
            </h2>
            <div className="bg-card border-y dark:border-gray-800">
              <SettingsMenuItem icon={UserCog} label="Edit Profile" />
              <div className="border-t border-border dark:border-gray-800 mx-4"></div>
              <SettingsMenuItem icon={MapPin} label="Address List" />
              <div className="border-t border-border dark:border-gray-800 mx-4"></div>
              <SettingsMenuItem icon={ShieldCheck} label="Account Security" />
              <div className="border-t border-border dark:border-gray-800 mx-4"></div>
              <SettingsMenuItem
                icon={CreditCard}
                label="Cards / Bank Accounts"
              />
            </div>
          </div>

          {/* General Settings & Help Section (Accordions) */}
          <div className="mt-6">
            <div className="bg-card border-y dark:border-gray-800">
              <SettingsAccordion title="General Settings">
                <SettingsMenuItem icon={Bell} label="Notifications" />
                <SettingsMenuItem icon={Palette} label="Appearance" />
                <SettingsMenuItem icon={Lock} label="Privacy" />
                <SettingsMenuItem icon={MessageSquare} label="Chat" />
                <SettingsMenuItem icon={Languages} label="Language" />
              </SettingsAccordion>

              <SettingsAccordion title="Help">
                <SettingsMenuItem icon={HelpCircle} label="Help Center" />
                <SettingsMenuItem icon={FileText} label="Vendora Policies" />
                <SettingsMenuItem icon={Info} label="Information" />
                <SettingsMenuItem icon={Headset} label="Customer Service" />
                <SettingsMenuItem
                  icon={Trash2}
                  label="Request Account Deletion"
                />
              </SettingsAccordion>
            </div>
          </div>

          {/* Logout Button */}
          <div className="p-4 mt-8">
            <button className="w-full flex items-center justify-center gap-2 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 font-bold py-3 px-4 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default SettingPageMobile;
