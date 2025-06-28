import { AlertTriangle } from "lucide-react";
import SettingsContentCard from "@/components/Elements/SettingsContentCard";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const RequestDeletionView = () => {
  return (
    <SettingsContentCard
      title="Request Account Deletion"
      description="Proceed with caution. This action is irreversible."
    >
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            This action is permanent and cannot be undone. All your data,
            including order history, saved items, and personal information, will
            be permanently deleted.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <p className="text-sm">
            To confirm, please enter your password below.
          </p>
          <div className="space-y-1.5">
            <Label htmlFor="password_confirm">Password</Label>
            <Input
              id="password_confirm"
              type="password"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="destructive">Request Account Deletion</Button>
        </div>
      </div>
    </SettingsContentCard>
  );
};

export default RequestDeletionView;
