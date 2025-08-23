import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Voucher name is required."],
      trim: true,
    },
    code: {
      type: String,
      required: [true, "Voucher code is required."],
      unique: true,
      trim: true,
      uppercase: true,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      index: true,
    },
    ownerType: {
      type: String,
      required: true,
      enum: ["Store", "Platform"],
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "ownerType",
      required: true,
    },
    voucherType: {
      type: String,
      required: true,
      enum: ["product_discount", "shipping_discount", "cashback"],
    },
    discountType: {
      type: String,
      required: true,
      enum: ["percentage", "fixed_amount"],
    },
    discountValue: {
      type: Number,
      required: [true, "Discount value is required."],
    },
    image: {
      type: String,
    },
    minPurchaseAmount: {
      type: Number,
      required: [true, "Minimum purchase amount is required."],
      default: 0,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required."],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required."],
    },
    usageLimit: {
      type: Number,
      required: [true, "Usage limit is required."],
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

voucherSchema.pre("save", function (next) {
  if (this.startDate && this.endDate && this.startDate >= this.endDate) {
    next(new Error("End date must be after the start date."));
  } else {
    next();
  }
});

export default mongoose.model("Voucher", voucherSchema);
