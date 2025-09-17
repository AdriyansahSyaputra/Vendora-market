import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Elements/Header";
import { addressSchema } from "@schemas/address.schema";
import axios from "axios";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const AddressFormPageMobile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addressId } = useParams();

  const isEditMode = !!addressId;
  const addressToEdit = location.state?.address;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: isEditMode
      ? addressToEdit
      : {
          label: "Rumah",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          postalCode: "",
          country: "Indonesia",
          isDefault: false,
        },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await axios.put(`/api/client/addresses/${addressId}/update`, data, {
          withCredentials: true,
        });
        toast.success("Alamat berhasil diperbarui.");
      } else {
        await axios.post("/api/client/addresses/new", data, {
          withCredentials: true,
        });
        toast.success("Alamat berhasil ditambahkan.");
      }
      navigate(-1);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Terjadi kesalahan.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />

      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
        <Header
          title={isEditMode ? "Ubah Alamat" : "Tambah Alamat Baru"}
          onBack={() => navigate(-1)}
        />
        <main className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label Alamat</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih label" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Rumah">Rumah</SelectItem>
                        <SelectItem value="Kantor">Kantor</SelectItem>
                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="addressLine1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Utama</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: Jl. Merdeka No. 17"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="addressLine2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Tambahan (Opsional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: Apartemen Flamboyan, Lt. 5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kota</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: Jakarta Pusat" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provinsi</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: DKI Jakarta" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kode Pos</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: 10110" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Negara</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Negara" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Indonesia">Indonesia</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 pt-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Jadikan alamat utama</FormLabel>
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button type="submit" className="w-full">
                  {isSubmitting ? "Save..." : "Save Address"}
                </Button>
              </div>
            </form>
          </Form>
        </main>
      </div>
    </>
  );
};

export default AddressFormPageMobile;
