import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "@schemas/address.schema";
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

const AddressFormMobile = ({ defaultValues, onSubmit, onCancel }) => {
  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: defaultValues || {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label Alamat</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <Input placeholder="Contoh: Jl. Merdeka No. 17" {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

        <div className="pt-4 flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="w-full"
          >
            Batal
          </Button>
          <Button type="submit" className="w-full">
            Simpan Alamat
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddressFormMobile;
