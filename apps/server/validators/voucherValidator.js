import { z } from "zod";
import mongoose from "mongoose";

const objectIdSchema = z.string().refine(
  (val) => {
    return mongoose.Types.ObjectId.isValid(val);
  },
  {
    message: "Category is required",
  }
);

export const createVoucherSchema = z
  .object({
    name: z
      .string({
        required_error: "Voucher name is required.",
      })
      .min(3, { message: "Name must be at least 3 characters long." }),

    code: z
      .string({
        required_error: "Voucher code is required.",
      })
      .min(4, { message: "Code must be at least 4 characters long." })
      .regex(/^[A-Z0-9]+$/, {
        message: "Code must be uppercase letters and numbers only.",
      }),

    description: z
      .string({
        required_error: "Description is required.",
      })
      .min(10, { message: "Description must be at least 10 characters long." }),

    category: objectIdSchema,

    discountType: z.enum(["percentage", "fixed_amount"], {
      required_error:
        "Discount type is required and must be 'percentage' or 'fixed_amount'.",
    }),

    discountValue: z
      .number({
        required_error: "Discount value is required.",
      })
      .positive({ message: "Discount value must be a positive number." }),

    minPurchaseAmount: z
      .number({
        required_error: "Minimum purchase amount is required.",
      })
      .min(0, { message: "Minimum purchase cannot be negative." }),

    startDate: z.coerce.date({
      required_error: "Start date is required.",
    }),

    endDate: z.coerce.date({
      required_error: "End date is required.",
    }),

    usageLimit: z
      .number({
        required_error: "Usage limit is required.",
      })
      .int()
      .positive({ message: "Usage limit must be a positive integer." }),
  })
  .refine(
    (data) => {
      // Conditional validation for discountValue based on discountType
      if (data.discountType === "percentage") {
        return data.discountValue > 0 && data.discountValue <= 100;
      }
      return true;
    },
    {
      message: "For percentage discounts, the value must be between 1 and 100.",
      path: ["discountValue"], // Specify which field the error belongs to
    }
  )
  .refine(
    (data) => {
      // Validate that endDate is after startDate
      return data.endDate > data.startDate;
    },
    {
      message: "End date must be after the start date.",
      path: ["endDate"],
    }
  );
