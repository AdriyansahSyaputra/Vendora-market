import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    fullName: z
      .string()
      .min(3, { message: "Full name must be at least 3 characters long." }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." }),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." }),
  }),
});
