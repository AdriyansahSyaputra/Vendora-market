import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const PrivacyView = () => {
  const PrivacyToggleItem = ({ title, description }) => (
    <div className="flex items-center justify-between p-4 border-b dark:border-slate-800 last:border-b-0">
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch />
    </div>
  );

  return (
    <div className="animate-fade-in">
      <div className="pt-4">
        <div className="bg-card border-y dark:border-slate-800">
          <PrivacyToggleItem
            title="Hide Following/Followers List"
            description="Your lists will be private."
          />
          <PrivacyToggleItem
            title="Don't Appear in Contacts"
            description="Prevent others from finding you."
          />
        </div>
      </div>
      <div className="p-4 mt-4">
        <div className="flex items-center justify-between p-4 border rounded-lg dark:border-slate-800">
          <div>
            <p className="font-medium text-sm">Clear Search History</p>
            <p className="text-xs text-muted-foreground">
              Remove all your past searches.
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                Clear
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete your search history.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default PrivacyView;
