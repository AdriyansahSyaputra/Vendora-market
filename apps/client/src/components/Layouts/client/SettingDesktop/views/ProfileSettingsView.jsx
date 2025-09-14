import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SettingsContentCard from "@/components/Elements/SettingsContentCard";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import axios from "axios";

const ProfileSettingsView = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(userData);

  const form = useForm({
    defaultValues: {
      fullName: "",
      username: "",
      phone: "",
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/client/profile");
        setUserData(response.data);
      } catch (error) {
        console.error("Gagal mengambil data pengguna:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      form.reset({
        fullName: userData.fullName || "",
        username: userData.username || "",
        email: userData.email || "",
        phone: userData.phone || "",
      });
    }
    
  }, [userData, form.reset]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      form.setValue("avatar", file);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const onSubmit = async (values) => {
    console.log("Form submitted with valid data:", values);
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      if (values.fullName) {
        formData.append("fullName", values.fullName);
      }
      if (values.phone) {
        formData.append("phone", values.phone);
      }
      // Hanya kirim avatar jika itu adalah objek File baru yang dipilih pengguna.
      if (values.avatar instanceof File) {
        formData.append("avatar", values.avatar);
      }

      const response = await axios.put("/api/client/profile/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Server response:", response.data);

      toast.success("Profil berhasil diperbarui.");
    } catch (error) {
      console.error("Error submitting form:", error);

      const errorMessage =
        error.response?.data?.message || "Gagal memperbarui profil.";
      console.error("Server error message:", errorMessage);
      toast.error("Gagal memperbarui profil.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div>Memuat profil Anda...</div>;
  }

  return (
    <>
      <Toaster richColors position="top-center" />

      <SettingsContentCard
        title="Edit Profile"
        description="Manage your personal information and password."
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center space-y-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={imagePreview}
                        alt={userData?.username}
                      />
                      <AvatarFallback>
                        {userData?.username?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <FormControl>
                      <Input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={handleImageChange}
                      />
                    </FormControl>
                    <div className="text-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Change Photo
                      </Button>
                      {/* Menambahkan teks deskripsi seperti di versi desktop */}
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                        JPG, GIF or PNG. 1MB max.
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-1.5">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input id="username" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit">
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </SettingsContentCard>
    </>
  );
};

export default ProfileSettingsView;
