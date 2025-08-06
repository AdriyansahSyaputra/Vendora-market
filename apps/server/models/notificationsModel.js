import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["store", "order", "promo", "info", "system"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    detailContent: {
      header: {
        type: String,
        trim: true,
      },
      body: {
        type: String,
        trim: true,
      },
      cta: {
        text: {
          type: String,
          trim: true,
        },
        link: {
          type: String,
          trim: true,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notification", NotificationSchema);
