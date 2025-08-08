import { z } from "zod";

export const createProductCategorySchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .min(1, { message: "Name category must not be empty" })
    .max(50, { message: "Name must be at most 50 characters long." }),
  description: z
    .string({ required_error: "Description is required." })
    .min(1, { message: "Description category must not be empty" })
    .max(255, { message: "Description must be at most 255 characters long." })
    .optional(),
});

export const updateProductCategorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name category must not be empty" })
    .max(50, { message: "Name must be at most 50 characters long." })
    .optional(),
  description: z
    .string()
    .max(255, { message: "Description must be at most 255 characters long." })
    .optional()
    .nullable(),
});
