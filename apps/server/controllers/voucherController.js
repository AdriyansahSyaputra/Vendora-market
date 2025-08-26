import Voucher from "../models/vouchersModel.js";
import {
  uploadFilesToCloudinary,
  deleteFilesFromCloudinary,
} from "../utils/cloudinaryUtils.js";

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
      isActive: initialIsActive,
      voucherType: "product_discount",
    };

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
 * @desc Edit Voucher for a store
 * @route PUT /api/vendor/voucher/store/:id/update
 * @access Private/Seller
 */
export const updateStoreVoucher = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = req.body;

    const storeId = req.storeId;
    if (!storeId) {
      return res
        .status(401)
        .json({ message: "Access denied. Store ID not found" });
    }

    const today = getStartOfDay(new Date());
    const startDate = getStartOfDay(new Date(validatedData.startDate));
    const endDate = new Date(validatedData.endDate);
    const newIsActive = startDate <= today && today <= endDate;

    const updatePayload = {
      ...validatedData,
      isActive: newIsActive,
    };

    const updatedVoucher = await Voucher.findOneAndUpdate(
      { _id: id, ownerId: storeId, ownerType: "Store" },
      updatePayload,
      { new: true, runValidators: true }
    );

    // Jika updatedVoucher adalah null, berarti voucher tidak ditemukan ATAU seller tidak punya izin
    if (!updatedVoucher) {
      const voucherExists = await Voucher.findById(id);
      if (!voucherExists) {
        return res.status(404).json({ message: "Voucher not found." });
      }
      return res
        .status(403)
        .json({ message: "You do not have permission to edit this voucher." });
    }

    return res.status(200).json({
      message: "Voucher updated successfully.",
      data: updatedVoucher,
    });
  } catch (error) {
    console.error("Error updating store voucher:", error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: error.errors });
    }
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

/**
 * @desc Delete a voucher for a store
 * @route DELETE /api/vendor/voucher/store/:id/delete
 * @access Private/Seller
 */
export const deleteStoreVoucher = async (req, res) => {
  try {
    const { id } = req.params;

    const storeId = req.storeId;
    if (!storeId) {
      return res
        .status(401)
        .json({ message: "Access denied. Store ID not found" });
    }

    const deletedVoucher = await Voucher.findOneAndDelete({
      _id: id,
      ownerId: storeId,
      ownerType: "Store",
    });

    // Jika deletedVoucher adalah null, berarti voucher tidak ditemukan ATAU seller tidak punya izin
    if (!deletedVoucher) {
      const voucherExists = await Voucher.findById(id);
      if (!voucherExists) {
        return res.status(404).json({ message: "Voucher not found." });
      }
      return res.status(403).json({
        message: "You do not have permission to delete this voucher.",
      });
    }

    return res.status(200).json({
      message: "Voucher deleted successfully.",
      data: deletedVoucher,
    });
  } catch (error) {
    console.error("Error deleting store voucher:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

/**
 * @desc Get all vouchers for a store
 * @route GET /api/vendor/voucher/store
 * @access Private/Seller
 */
export const getAllStoreVouchers = async (req, res) => {
  try {
    const storeId = req.storeId;
    if (!storeId) {
      return res
        .status(401)
        .json({ message: "Access denied. Store ID not found" });
    }

    // --- LOGIKA BARU UNTUK SEARCH & FILTER ---

    const { search, category, status } = req.query;

    // 2. Buat objek query dasar yang wajib ada (keamanan)
    const queryOptions = {
      ownerId: storeId,
      ownerType: "Store",
    };

    // Jika ada parameter 'search', tambahkan filter nama (case-insensitive)
    if (search) {
      queryOptions.name = { $regex: search, $options: "i" };
    }

    // Jika ada parameter 'category' (dan bukan 'all'), tambahkan filter kategori
    if (category && category !== "all") {
      queryOptions.category = category;
    }

    // Jika ada parameter 'status' (dan bukan 'all'), tambahkan filter status
    if (status && status !== "all") {
      queryOptions.isActive = status === "active";
    }

    // 4. Jalankan query yang sudah dinamis
    const vouchers = await Voucher.find(queryOptions)
      .populate("category", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Vouchers retrieved successfully.",
      count: vouchers.length,
      vouchers: vouchers,
    });
  } catch (error) {
    console.error("Error getting store vouchers:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

/**
 * @desc Create a new platform voucher
 * @route POST /api/company/voucher/platform/create
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

    if (!req.file) {
      return res.status(400).json({ message: "No files uploaded." });
    }

    const existingVoucher = await Voucher.findOne({
      code: validatedData.code,
    });

    if (existingVoucher) {
      return res.status(400).json({
        message: "Voucher code already exists. Please use a different code.",
      });
    }

    let imageUrl = null;

    if (req.file) {
      const uploadFolder = `vouchers/platform/${adminId._id.toString()}`;
      const imageUrls = await uploadFilesToCloudinary(req.file, uploadFolder);

      if (imageUrls && imageUrls.length > 0) {
        imageUrl = imageUrls[0];
      }
    }

    const today = getStartOfDay(new Date());
    const startDate = getStartOfDay(new Date(validatedData.startDate));
    const endDate = new Date(validatedData.endDate);

    const initialIsActive = startDate <= today && today <= endDate;

    const newVoucher = {
      ...validatedData,
      image: imageUrl,
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

/**
 * @desc Edit Voucher for a platform
 * @route PUT /api/company/voucher/platform/:id/update
 * @access Private/Admin
 */
export const updatePlatformVoucher = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = req.body;
    const admin = req.adminId;

    if (!admin || !admin._id) {
      return res
        .status(401)
        .json({ message: "Access denied. Admin not found" });
    }

    const existingVoucher = await Voucher.findById(id);
    if (!existingVoucher) {
      return res.status(404).json({ message: "Voucher not found." });
    }

    let imageUrl = existingVoucher.image;

    if (req.file) {
      if (existingVoucher.image) {
        await deleteFilesFromCloudinary(existingVoucher.image);
      }

      const uploadFolder = `vouchers/platform/${admin._id.toString()}`;
      const newImageUrls = await uploadFilesToCloudinary(
        req.file,
        uploadFolder
      );
      if (newImageUrls && newImageUrls.length > 0) {
        imageUrl = newImageUrls[0];
      }
    }

    const today = getStartOfDay(new Date());
    const startDate = getStartOfDay(new Date(validatedData.startDate));
    const endDate = new Date(validatedData.endDate);
    const newIsActive = startDate <= today && today <= endDate;

    const updatedVoucherData = {
      ...validatedData,
      image: imageUrl,
      isActive: newIsActive,
    };

    const updatedVoucher = await Voucher.findByIdAndUpdate(
      id,
      updatedVoucherData,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Voucher updated successfully.",
      data: updatedVoucher,
    });
  } catch (error) {
    console.error("Error updating platform voucher:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

/**
 * @desc Delete a voucher for a platform
 * @route DELETE /api/company/voucher/platform/:id/delete
 * @access Private/Admin
 */
export const deletePlatformVoucher = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = req.adminId;

    if (!admin || !admin._id) {
      return res
        .status(401)
        .json({ message: "Access denied. Admin not found" });
    }

    const existingVoucher = await Voucher.findById(id);
    if (!existingVoucher) {
      return res.status(404).json({ message: "Voucher not found." });
    }

    if (existingVoucher.image) {
      await deleteFilesFromCloudinary(existingVoucher.image);
    }

    await Voucher.findByIdAndDelete(id);

    return res.status(200).json({ message: "Voucher deleted successfully." });
  } catch (error) {
    console.error("Error deleting platform voucher:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

/**
 * @desc Get all vouchers for a platform
 * @route GET /api/company/voucher/platform
 * @access Private/Admin
 */
export const getAllPlatformVouchers = async (req, res) => {
  try {
    const admin = req.adminId;

    if (!admin || !admin._id) {
      return res
        .status(401)
        .json({ message: "Access denied. Admin not found" });
    }

    const vouchers = await Voucher.find({ ownerType: "Platform" }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ vouchers });
  } catch (error) {
    console.error("Error getting all platform vouchers:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
