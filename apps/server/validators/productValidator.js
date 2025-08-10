import { z } from "zod";
import mongoose from "mongoose";

// Skema untuk validasi ObjectId dari Mongoose
const objectIdSchema = z.string().refine(
  (val) => {
    return mongoose.Types.ObjectId.isValid(val);
  },
  {
    message: "Invalid MongoDB ObjectId",
  }
);

// Skema dasar untuk variasi produk
const variationSchema = z.object({
  size: z
    .string({ required_error: "Variation size is required." })
    .trim()
    .min(1, "Variation size cannot be empty."),
  color: z
    .string({ required_error: "Variation color is required." })
    .trim()
    .min(1, "Variation color cannot be empty."),
  stock: z.coerce
    .number({ required_error: "Variation stock is required." })
    .min(0, "Variation stock cannot be negative."),
});

// Skema utama untuk validasi data produk
export const productSchema = z
  .object({
    name: z
      .string({ required_error: "Product name is required." })
      .trim()
      .min(3, "Product name must be at least 3 characters."),
    description: z.string().trim().optional(),
    price: z.coerce
      .number({ required_error: "Price is required." })
      .positive("Price must be a positive number."),
    discount: z.coerce
      .number()
      .min(0)
      .max(100, "Discount must be between 0 and 100.")
      .default(0)
      .optional(),
    category: objectIdSchema,
    stock: z.coerce.number().min(0, "Stock cannot be negative.").optional(),
    promos: z.array(z.string()).optional(),
    variations: z.array(variationSchema).optional(),
    weight: z.coerce
      .number()
      .positive("Weight must be a positive number.")
      .optional(),
    dimensions: z
      .object({
        length: z.coerce.number().positive("Length must be a positive number."),
        width: z.coerce.number().positive("Width must be a positive number."),
        height: z.coerce.number().positive("Height must be a positive number."),
      })
      .optional(),
    status: z
      .enum(["active", "inactive", "draft"], {
        errorMap: () => ({
          message: "Status must be one of 'active', 'inactive', or 'draft'.",
        }),
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.variations && data.variations.length > 0) {
        return true;
      }
      return data.stock !== undefined && data.stock >= 0;
    },
    {
      message: "Main stock is required when the product has no variations.",
      path: ["stock"],
    }
  );
