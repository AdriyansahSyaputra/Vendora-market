import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";

const profileFormSchema = z.object({
  fullName: z.string().min(4, { message: "Nama lengkap minimal 4 karakter." }),
  username: z
    .string()
    .min(3, { message: "Username minimal 3 karakter." })
    .regex(/^[a-zA-Z0-9_.]+$/, {
      message:
        "Username hanya boleh berisi huruf, angka, titik, dan underscore.",
    }),
  phone: z
    .string()
    .regex(/^\d{9,13}$/, {
      message: "Nomor telepon harus terdiri dari 9 hingga 13 angka.",
    })
    .optional()
    .or(z.literal("")),
  avatar: z.instanceof(File).optional().or(z.literal("")),
});

const ProfileView = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
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
    if (userData?.avatar) {
      setImagePreview(userData.avatar);
    }
  }, [userData, form.reset, form]);

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
    setIsSubmitting(true);
    form.clearErrors("avatar");

    try {
      const formData = new FormData();

      if (values.fullName) {
        formData.append("fullName", values.fullName);
      }
      if (values.phone) {
        formData.append("phone", values.phone);
      }

      if (values.username) {
        formData.append("username", values.username);
      }

      if (values.avatar instanceof File) {
        formData.append("avatar", values.avatar);
      }

      if ([...formData.entries()].length === 0) {
        toast({
          title: "Info",
          description: "Tidak ada perubahan untuk disimpan.",
        });
        setIsSubmitting(false);
        return;
      }

      const response = await axios.put("/api/client/profile/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profil berhasil diperbarui.");
      setUserData(response.data.user);
    } catch (error) {
      console.error("Error submitting form:", error);

      const serverErrors = error.response?.data?.errors;

      if (serverErrors) {
        Object.keys(serverErrors).forEach((fieldName) => {
          let frontendFieldName = fieldName;
          if (fieldName === "image") {
            frontendFieldName = "avatar";
          }

          form.setError(frontendFieldName, {
            type: "server",
            message: serverErrors[fieldName],
          });
        });
      } else {
        const errorMessage =
          error.response?.data?.message || "Gagal memperbarui profil.";
        toast({
          variant: "destructive",
          title: "Gagal",
          description: errorMessage,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="animate-spin h-6 w-6 text-gray-600" />
      </div>
    );
  }

  return (
    <>
      <Toaster richColors position="top-center" />

      <div className="p-4 space-y-6 animate-in fade-in-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={imagePreview} alt={userData?.username} />
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
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change Photo
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
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
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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

            <Button type="submit" className="w-full">
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ProfileView;
