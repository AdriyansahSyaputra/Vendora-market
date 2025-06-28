import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import SettingsContentCard from "@/components/Elements/SettingsContentCard";

const PrivacySettingsView = () => {
  const PrivacyToggleItem = ({ title, description }) => (
    <div className="flex items-center justify-between p-4 border-b dark:border-slate-800 last:border-b-0">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch />
    </div>
  );

  return (
    <SettingsContentCard
      title="Privacy"
      description="Control your account privacy and data."
    >
      <div className="space-y-6">
        <div className="border rounded-lg dark:border-slate-800">
          <PrivacyToggleItem
            title="Hide Following/Followers List"
            description="Your following and followers lists will be private."
          />
          <PrivacyToggleItem
            title="Don't Appear in Contacts"
            description="Prevent others who have your contact from finding you."
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Data Management</h3>
          <div className="flex items-center justify-between p-4 border rounded-lg dark:border-slate-800">
            <div>
              <p className="font-medium">Clear Search History</p>
              <p className="text-sm text-muted-foreground">
                Remove all your past searches.
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Clear</Button>
              </AlertDialogTrigger>
              {/* Konten AlertDialog akan muncul di atas halaman saat di-trigger */}
            </AlertDialog>
          </div>
        </div>
      </div>
    </SettingsContentCard>
  );
};

export default PrivacySettingsView;
