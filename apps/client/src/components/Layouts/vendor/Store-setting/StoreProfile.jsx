import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

const StoreProfile = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Store Profile</CardTitle>
        <CardDescription>
          Update your store's public profile and branding.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Banner and Logo Section */}
        <div>
          <Label>Branding</Label>
          <div className="mt-2 relative">
            <div className="h-40 rounded-lg bg-muted flex items-center justify-center">
              <img
                src="https://placehold.co/1200x300/e2e8f0/475569?text=Store+Banner"
                alt="Store Banner"
                className="w-full h-full object-cover rounded-lg"
              />
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-3 right-3 bg-background/70 backdrop-blur-sm dark:bg-gray-800/70 cursor-pointer"
              >
                <Upload className="mr-2 h-4 w-4" /> Change Banner
              </Button>
            </div>
            <div className="absolute -bottom-10 left-6">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src="https://placehold.co/100x100/4f46e5/ffffff?text=Logo" />
                <AvatarFallback>LG</AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-background/70 backdrop-blur-sm cursor-pointer"
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Spacer for overlapping logo */}
        <div className="pt-10"></div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="store-name">Store Name</Label>
            <Input
              id="store-name"
              defaultValue="Asus Premium Store"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="store-description">Description</Label>
            <Textarea
              id="store-description"
              defaultValue="The official store for premium Asus products and accessories."
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="store-location">Location</Label>
            <Input
              id="store-location"
              defaultValue="Jakarta, Indonesia"
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoreProfile;
