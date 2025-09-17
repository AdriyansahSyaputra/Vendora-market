import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import SettingsContentCard from "@/components/Elements/SettingsContentCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordFormSchema } from "@schemas/password.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import axios from "axios";

const AccountSecurityView = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await axios.put("/api/client/change-password", values);

      toast.success(response.data.message || "Password berhasil diubah");

      form.reset();
    } catch (error) {
      console.error("Gagal mengubah password:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Terjadi kesalahan yang tidak diketahui.";

      if (errorMessage.includes("saat ini salah")) {
        form.setError("currentPassword", {
          type: "server",
          message: errorMessage,
        });
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />

      <SettingsContentCard
        title="Account Security"
        description="Streng then your account security."
      >
        <div className="space-y-8">
          {/* Change Password */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <h3 className="text-lg font-medium">Change Password</h3>

              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter current password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit">
                  {isSubmitting ? "Updating..." : "Update"}
                </Button>
              </div>
            </form>
          </Form>

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
    </>
  );
};

export default AccountSecurityView;
