import { z } from "zod";

export const addressSchema = z.object({
  label: z.string({ required_error: "Label alamat harus diisi." }),
  addressLine1: z
    .string()
    .min(5, { message: "Alamat utama minimal 5 karakter." }),
  addressLine2: z.string().optional(),
  city: z.string().min(3, { message: "Kota minimal 3 karakter." }),
  state: z.string().min(3, { message: "Provinsi minimal 3 karakter." }),
  postalCode: z.string().min(5, { message: "Kode pos minimal 5 digit." }),
  country: z.string({ required_error: "Negara harus dipilih." }),
  isDefault: z.boolean().default(false),
});
