import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const AccountSecurityView = () => {
  return (
    <div className="p-4 space-y-8 animate-fade-in">
      {/* Change Password */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold">Change Password</h3>
        <div className="space-y-2">
          <Label htmlFor="current_password">Current Password</Label>
          <Input id="current_password" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new_password">New Password</Label>
          <Input id="new_password" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm_password">Confirm New Password</Label>
          <Input id="confirm_password" type="password" />
        </div>
        <Button className="w-full">Update Password</Button>
      </div>

      <Separator />

      {/* Identity Verification */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold">Identity Verification</h3>
        <p className="text-sm text-muted-foreground">
          Verify your identity to enhance account security.
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg dark:border-slate-800">
            <div>
              <p className="font-medium text-sm">Email Address</p>
              <p className="text-xs text-muted-foreground">
                shadcn@example.com
              </p>
            </div>
            <Badge variant="success">Verified</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg dark:border-slate-800">
            <div>
              <p className="font-medium text-sm">Phone Number</p>
              <p className="text-xs text-muted-foreground">+62 812 **** 7890</p>
            </div>
            <Badge variant="success">Verified</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg dark:border-slate-800">
            <div>
              <p className="font-medium text-sm">ID Card / Passport</p>
              <p className="text-xs text-muted-foreground">Not yet verified</p>
            </div>
            <Button variant="outline" size="sm">
              Verify Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurityView;
