import { z } from "zod";

export const registerSchema = z.object({
  body: z
    .object({
      fullName: z
        .string()
        .min(3, { message: "Full name must be at least 3 characters long." }),
      username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long." })
        .regex(/^[a-zA-Z0-9_]+$/, {
          message:
            "Username must be alphanumeric. Only letters, numbers, and underscores are allowed.",
        }),
      email: z.string().email({ message: "Invalid email address." }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." }),
      confirmPassword: z
        .string()
        .nonempty({ message: "Password confirmation is required." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      // Pesan error ini akan diterapkan ke field 'confirmPassword'
      message: "Passwords do not match.",
      // Tentukan path agar error muncul di bawah input confirmPassword
      path: ["confirmPassword"],
    }),
});

export const loginSchema = z.object({
  body: z.object({
    identifier: z
      .string()
      .min(3, { message: "Email or username must be a required." }),
    password: z.string().superRefine((val, ctx) => {
      if (!val || val.length < 1) {
        ctx.addIssue({
          code: "too_small",
          minimum: 1,
          type: "string",
          message: "Password is required.",
        });
        return;
      }

      if (val.length < 8) {
        ctx.addIssue({
          code: "too_small",
          minimum: 8,
          type: "string",
          message: "Password must be at least 8 characters long.",
        });
      }
    }),
  }),
});
