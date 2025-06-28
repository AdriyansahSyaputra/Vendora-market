import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import SettingsContentCard from "@/components/Elements/SettingsContentCard";

const AccountSecurityView = () => {
  return (
    <SettingsContentCard
      title="Account Security"
      description="Strengthen your account security."
    >
      <div className="space-y-8">
        {/* Change Password */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Change Password</h3>
          <div className="space-y-1.5">
            <Label htmlFor="current_password">Current Password</Label>
            <Input id="current_password" type="password" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="new_password">New Password</Label>
              <Input id="new_password" type="password" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm_password">Confirm New Password</Label>
              <Input id="confirm_password" type="password" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Update Password</Button>
          </div>
        </div>

        <Separator />

        {/* Identity Verification */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Identity Verification</h3>
          <p className="text-sm text-muted-foreground">
            Verify your identity to enhance account security and unlock more
            features.
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg dark:border-slate-800">
              <div>
                <p className="font-medium">Email Address</p>
                <p className="text-sm text-muted-foreground">
                  shadcn@example.com
                </p>
              </div>
              <Badge variant="success">Verified</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg dark:border-slate-800">
              <div>
                <p className="font-medium">Phone Number</p>
                <p className="text-sm text-muted-foreground">
                  +62 812 **** 7890
                </p>
              </div>
              <Badge variant="success">Verified</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg dark:border-slate-800">
              <div>
                <p className="font-medium">ID Card / Passport</p>
                <p className="text-sm text-muted-foreground">
                  Not yet verified
                </p>
              </div>
              <Button variant="outline">Verify Now</Button>
            </div>
          </div>
        </div>
      </div>
    </SettingsContentCard>
  );
};

export default AccountSecurityView;
