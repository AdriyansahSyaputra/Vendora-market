import { z } from "zod";

const countryCodes = ["ID", "SG", "MY", "US", "GB", "AU", "JP"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

// Fungsi helper untuk mendapatkan ukuran byte dari string Base64
const getBase64SizeInBytes = (base64String) => {
  if (!base64String) return 0;
  // Hapus header data URI (misal: "data:image/png;base64,")
  const string = base64String.split(",")[1] || base64String;
  // Perhitungan ukuran byte dari string Base64
  const sizeInBytes =
    (string.length * 3) / 4 -
    (string.endsWith("==") ? 2 : string.endsWith("=") ? 1 : 0);
  return sizeInBytes;
};

export const sellerApplicationSchema = z
  .object({
    body: z.object({
      fullName: z.string().min(1, { message: "Full name is required." }),
      email: z.string().email({ message: "Invalid email address." }),
      phone: z.string().min(11, {
        message: "Phone number must be at least 11 characters long.",
      }),
      storeName: z.string().min(1, { message: "Store name is required." }),
      storeDescription: z.string().min(50, {
        message: "Store description must be at least 50 characters long.",
      }),
      categories: z
        .array(z.string())
        .min(1, { message: "At least one category is required." }),
      location: z.enum(countryCodes, {
        errorMap: () => ({
          message: "Invalid location selected. Please choose a valid country.",
        }),
      }),
      address: z.object({
        street: z.string().min(1, { message: "Street is required." }),
        village: z.string().optional(),
        district: z.string().optional(),
        city: z.string().min(1, { message: "City is required." }),
        postalCode: z.string().min(1, { message: "Postal code is required." }),
      }),
      operatingArea: z.array(z.enum(countryCodes)).min(1, {
        message: "At least one operating area is required.",
      }),
      documents: z.object({
        ktp: z
          .string()
          .optional()
          .refine((val) => !val || getBase64SizeInBytes(val) <= MAX_FILE_SIZE, {
            message: `KTP file must be less than 2MB.`,
          }),
        npwp: z
          .string()
          .optional()
          .refine((val) => !val || getBase64SizeInBytes(val) <= MAX_FILE_SIZE, {
            message: `NPWP file must be less than 2MB.`,
          }),
        passport: z
          .string()
          .optional()
          .refine(
            (val) => {
              return !val || getBase64SizeInBytes(val) <= MAX_FILE_SIZE;
            },
            {
              message: `Passport file must be less than 2MB.`,
            }
          ),
        businessLicense: z
          .string()
          .optional()
          .refine((val) => !val || getBase64SizeInBytes(val) <= MAX_FILE_SIZE, {
            message: `Business license file must be less than 2MB.`,
          }),
      }),
      terms: z.boolean().refine((val) => val, {
        message: "You must agree to the terms and conditions.",
      }),
      rejectionReason: z.string().optional(),
    }),
  }) // --- VALIDASI KONDISIONAL ---
  .superRefine((data, ctx) => {
    // Logika untuk lokasi Indonesia (berdasarkan kode 'ID')
    if (data.location === "ID") {
      if (!data.documents.ktp) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "File KTP wajib diunggah untuk lokasi Indonesia.",
          path: ["documents", "ktp"],
        });
      }
      if (!data.documents.npwp) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "File NPWP wajib diunggah untuk lokasi Indonesia.",
          path: ["documents", "npwp"],
        });
      }
    }
    // Logika untuk SEMUA lokasi lain (di luar Indonesia)
    else {
      if (!data.documents.passport) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "File Paspor wajib diunggah untuk lokasi di luar Indonesia.",
          path: ["documents", "passport"],
        });
      }
      if (!data.documents.businessLicense) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "File Izin Usaha wajib diunggah untuk lokasi di luar Indonesia.",
          path: ["documents", "businessLicense"],
        });
      }
    }
  });
