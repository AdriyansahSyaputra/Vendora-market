import { z } from "zod";

const countryCodes = ["ID", "SG", "MY", "US", "GB", "AU", "JP"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

// Fungsi helper untuk mendapatkan ukuran byte dari string Base64
const getBase64SizeInBytes = (base64String) => {
  if (!base64String) return 0;
  const string = base64String.split(",")[1] || base64String;
  const sizeInBytes =
    (string.length * 3) / 4 -
    (string.endsWith("==") ? 2 : string.endsWith("=") ? 1 : 0);
  return sizeInBytes;
};

export const sellerApplicationSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().min(10, {
      message: "Phone number must be at least 10 characters long.",
    }),
    storeName: z.string().min(1, { message: "Store name is required." }),
    storeDescription: z.string().min(20, {
      message: "Store description must be at least 20 characters long.",
    }),
    categories: z
      .array(z.string())
      .min(1, { message: "At least one category is required." }),
    location: z.enum(countryCodes, {
      required_error: "Business location is required.",
    }),
    address: z.object({
      street: z.string().min(1, { message: "Street is required." }),
      village: z.string().optional(),
      district: z.string().optional(),
      city: z.string().min(1, { message: "City is required." }),
      postalCode: z.string().min(1, { message: "Postal code is required." }),
    }),
    operatingArea: z
      .array(z.enum(countryCodes))
      .min(1, { message: "At least one operating area is required." }),
    documents: z.object({
      ktp: z
        .string()
        .nullable()
        .optional()
        .refine((val) => !val || getBase64SizeInBytes(val) <= MAX_FILE_SIZE, {
          message: `KTP file must be less than 2MB.`,
        }),
      npwp: z
        .string()
        .nullable()
        .optional()
        .refine((val) => !val || getBase64SizeInBytes(val) <= MAX_FILE_SIZE, {
          message: `NPWP file must be less than 2MB.`,
        }),
      passport: z
        .string()
        .nullable()
        .optional()
        .refine((val) => !val || getBase64SizeInBytes(val) <= MAX_FILE_SIZE, {
          message: `Passport file must be less than 2MB.`,
        }),
      businessLicense: z
        .string()
        .nullable()
        .optional()
        .refine((val) => !val || getBase64SizeInBytes(val) <= MAX_FILE_SIZE, {
          message: `Business license file must be less than 2MB.`,
        }),
    }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions.",
    }),
  })
  .superRefine((data, ctx) => {
    const { location, documents } = data;

    if (location === "ID") {
      if (!documents.ktp) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "KTP file is required for Indonesia location.",
          path: ["documents", "ktp"],
        });
      }
      if (!documents.npwp) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "NPWP file is required for Indonesia location.",
          path: ["documents", "npwp"],
        });
      }
    } else {
      if (!documents.passport) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passport file is required for international locations.",
          path: ["documents", "passport"],
        });
      }
      if (!documents.businessLicense) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Business License file is required for international locations.",
          path: ["documents", "businessLicense"],
        });
      }
    }
  });
