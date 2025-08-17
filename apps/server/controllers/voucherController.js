import Voucher from "../models/vouchersModel.js";

const getStartOfDay = (date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

/**
 * @desc Create a new voucher by a seller
 * @route POST /api/vendor/voucher/store/create
 * @access Private/Seller
 */
export const createStoreVoucher = async (req, res) => {
  try {
    const validatedData = req.body;

    const storeId = req.storeId;

    if (!storeId) {
      return (
        res.status(401), json({ message: "Access denied. Store ID not found" })
      );
    }

    const existingVoucher = await Voucher.findOne({
      code: validatedData.code,
    });

    if (existingVoucher) {
      return res.status(400).json({
        message: "Voucher code already exists. Please use a different code.",
      });
    }

    const today = getStartOfDay(new Date());
    const startDate = getStartOfDay(new Date(validatedData.startDate));
    const initialIsActive = startDate <= today;

    const newVoucher = {
      ...validatedData,
      ownerType: "Store",
      ownerId: storeId,
      isActive: initialActive,
    };
    delete newVoucher.image;

    const voucher = await Voucher.create(newVoucher);

    return res.status(201).json({
      message: "Voucher created successfully.",
      voucher,
    });
  } catch (error) {
    console.error("Error creating store voucher:", error);
    if (error.code === 11000) {
      return res.status(409).json({ message: "Voucher code already exists." });
    }
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

/**
 * @desc Create a new platform voucher
 * @route POST /api/vendor/voucher/platform/create
 * @access Private/Admin
 */
export const createPlatformVoucher = async (req, res) => {
  try {
    const validatedData = req.body;

    const adminId = req.adminId;

    if (!adminId) {
      return res
        .status(401)
        .json({ message: "Access denied. Admin ID not found" });
    }

    const existingVoucher = await Voucher.findOne({
      code: validatedData.code,
    });

    if (existingVoucher) {
      return res.status(400).json({
        message: "Voucher code already exists. Please use a different code.",
      });
    }

    const today = getStartOfDay(new Date());
    const startDate = getStartOfDay(new Date(validatedData.startDate));
    const endDate = new Date(validatedData.endDate);

    const initialIsActive = startDate <= today && today <= endDate;

    const newVoucher = {
      ...validatedData,
      ownerType: "Platform",
      ownerId: adminId,
      isActive: initialIsActive,
    };

    const voucher = await Voucher.create(newVoucher);

    return res.status(201).json({
      message: "Platform voucher created successfully.",
      voucher,
    });
  } catch (error) {
    console.error("Error creating platform voucher:", error);
    if (error.code === 11000) {
      return res.status(409).json({ message: "Voucher code already exists." });
    }
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
