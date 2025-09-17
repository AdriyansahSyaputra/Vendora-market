import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
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

      <div className="p-4 space-y-8 animate-fade-in">
        {/* Change Password */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <h3 className="text-base font-semibold">Ubah Password</h3>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password Saat Ini</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password Baru</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konfirmasi Password Baru</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Tombol mengambil lebar penuh untuk kemudahan akses di mobile */}
            <Button type="submit" className="w-full">
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </form>
        </Form>

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
                <p className="text-xs text-muted-foreground">
                  +62 812 **** 7890
                </p>
              </div>
              <Badge variant="success">Verified</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg dark:border-slate-800">
              <div>
                <p className="font-medium text-sm">ID Card / Passport</p>
                <p className="text-xs text-muted-foreground">
                  Not yet verified
                </p>
              </div>
              <Button variant="outline" size="sm">
                Verify Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSecurityView;
