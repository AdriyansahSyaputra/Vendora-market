import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import SettingsContentCard from "@/components/Elements/SettingsContentCard";

const ProfileSettingsView = () => {
  return (
    <SettingsContentCard
      title="Edit Profile"
      description="Manage your personal information and password."
    >
      <div className="space-y-8">
        {/* Personal Information Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline">Change Photo</Button>
              <p className="text-xs text-muted-foreground mt-2">
                JPG, GIF or PNG. 1MB max.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullname">Full Name</Label>
              <Input id="fullname" defaultValue="Shadcn" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@shadcn" disabled />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="shadcn@example.com"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+62 812 3456 7890" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Change Password Section */}
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
        </div>

        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>
    </SettingsContentCard>
  );
};

export default ProfileSettingsView;
