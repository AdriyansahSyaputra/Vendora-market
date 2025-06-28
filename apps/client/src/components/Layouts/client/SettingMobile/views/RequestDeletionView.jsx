import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RequestDeletionView = () => {
  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          This action is permanent and cannot be undone. All your data will be
          permanently deleted.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          To confirm this action, please enter your password below.
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

      <Button variant="destructive" className="w-full">
        Request Account Deletion
      </Button>
    </div>
  );
};

export default RequestDeletionView;
