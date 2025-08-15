import { z } from "zod";
import mongoose from "mongoose";

// Skema untuk validasi ObjectId dari Mongoose
const objectIdSchema = z.string().refine(
  (val) => {
    return mongoose.Types.ObjectId.isValid(val);
  },
  {
    message: "Category is required",
  }
);

// Skema dasar untuk variasi produk
const variationSchema = z.object({
  size: z.string().trim().min(1, "Variation size cannot be empty."),
  color: z.string().trim().min(1, "Variation color cannot be empty."),
  stock: z.coerce.number().min(0, "Variation stock cannot be negative."),
});

// Skema utama untuk validasi data produk
export const productSchema = z
  .object({
    name: z.string().trim().min(1, "Product name is required."),
    description: z.string().trim().min(1, "Description cannot be empty."),
    price: z.coerce.number().min(1, "Price is required"),
    discount: z.coerce
      .number()
      .min(0)
      .max(100, "Discount must be between 0 and 100.")
      .default(0)
      .optional(),
    category: objectIdSchema,
    stock: z.coerce.number().min(0, "Stock cannot be negative."),
    promos: z.array(z.string()).optional(),
    variations: z.array(variationSchema).optional(),
    weight: z.coerce
      .number({
        invalid_type_error: "Weight must be a valid number.",
      })
      .min(1, "Weight is required and must be a positive number."),
    dimensions: z
      .object({
        length: z.coerce
          .number()
          .positive("Length must be a positive number.")
          .optional(),
        width: z.coerce
          .number()
          .positive("Width must be a positive number.")
          .optional(),
        height: z.coerce
          .number()
          .positive("Height must be a positive number.")
          .optional(),
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
