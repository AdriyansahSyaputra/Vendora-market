import Voucher from "../models/vouchersModel.js";
import cron from "node-cron";

/**
 * @desc A scheduled job that runs daily to update the active status of coupons.
 */
const updateVoucherStatuses = async () => {
  const now = new Date();

  try {
    const activationResult = await Voucher.updateMany(
      {
        isActive: false,
        startDate: { $lte: now },
        endDate: { $gte: now },
      },
      { $set: { isActive: true } }
    );

    if (activationResult.modifiedCount > 0) {
      console.log(`Activated ${activationResult.modifiedCount} coupons.`);
    }

    // Is currently active, BUT the end date is in the past.
    const deactivationResult = await Voucher.updateMany(
      {
        isActive: true,
        endDate: { $lt: now },
      },
      { $set: { isActive: false } }
    );

    if (deactivationResult.modifiedCount > 0) {
      console.log(
        `Deactivated ${deactivationResult.modifiedCount} expired Vouchers.`
      );
    }

    console.log("Voucher status update job finished.");
  } catch (error) {
    console.error("Error running Voucher status update job:", error);
  }
};

/**
 * @desc Initializes the cron job to run at midnight every day.
 */
export const startVoucherScheduler = () => {
  // Runs at 00:01 (1 minute past midnight) every day
  cron.schedule("1 0 * * *", updateVoucherStatuses, {
    scheduled: true,
    timezone: "Asia/Jakarta",
  });

  console.log("✅ Voucher status scheduler has been started.");
};
