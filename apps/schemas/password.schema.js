import { z } from "zod";

export const passwordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Password saat ini harus diisi." }),
    newPassword: z
      .string()
      .min(8, { message: "Password baru minimal 8 karakter." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Konfirmasi password minimal 8 karakter." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    // Aturan kustom untuk memastikan password baru dan konfirmasinya cocok
    message: "Password baru dan konfirmasi tidak cocok.",
    path: ["confirmPassword"], // Tampilkan pesan error ini di field 'confirmPassword'
  });
