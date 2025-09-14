import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const ProfileView = () => {
  const [imagePreview, setImagePreview] = useState(
    "https://github.com/shadcn.png"
  );
  const fileInputRef = useRef(null);

  // 2. Inisialisasi useForm dengan skema Zod
  const form = useForm({
    defaultValues: {
      fullname: "Shadcn",
      email: "shadcn@example.com",
      phone: "+62 812 3456 7890",
    },
  });

  // Fungsi untuk menangani perubahan gambar
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      form.setValue("avatar", file);
    }
  };

  // Efek untuk membersihkan object URL
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Fungsi handler untuk submit
  const onSubmit = (values) => {
    console.log("Mobile form submitted:", values);
    // Panggil API untuk menyimpan data
  };

  return (
    <div className="p-4 space-y-6 animate-in fade-in-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={imagePreview} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
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
              name="fullname"
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
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@shadcn" disabled />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
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
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileView;
