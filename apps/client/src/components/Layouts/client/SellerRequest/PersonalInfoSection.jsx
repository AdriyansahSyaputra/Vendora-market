import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Assume you get user data from state or context
const mockUserData = {
  fullName: "Budi Santoso",
  email: "budi.santoso@example.com",
};

const PersonalInfoSection = ({ formData, setFormData }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          This data is sourced from your account. Name and email cannot be
          changed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={mockUserData.fullName}
              readOnly
              className="bg-muted/50 cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={mockUserData.email}
              readOnly
              className="bg-muted/50 cursor-not-allowed"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="phone">Active Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="e.g., 081234567890"
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoSection;
