import User from "../models/userModel.js";
import {
  uploadFilesToCloudinary,
  deleteFilesFromCloudinary,
} from "../utils/cloudinaryUtils.js";
import mongoose from "mongoose";

export const updateUserProfile = async (req, res) => {
  const userId = req.user._id;
  const { fullName, username, phone } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updates = {};

    if (fullName && fullName !== user.fullName) {
      updates.fullName = fullName;
    }
    if (phone && phone !== user.phone) {
      updates.phone = phone;
    }

    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res
          .status(409)
          .json({ message: "Username ini sudah digunakan." });
      }
      updates.username = username;
    }

    const uploadFolder = `user_avatars/${userId}`;

    if (req.file) {
      const uploadedUrls = await uploadFilesToCloudinary(
        req.file,
        uploadFolder
      );
      updates.avatar = uploadedUrls[0];
      if (user.avatar) {
        await deleteFilesFromCloudinary([user.avatar]);
      }
    }

    await User.findByIdAndUpdate(userId, updates, { new: true });

    if (Object.keys(updates).length === 0) {
      return res
        .status(200)
        .json({ message: "Tidak ada perubahan yang disimpan.", user });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      message: "Profil berhasil diperbarui.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Ambil data user
export const getUserData = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Add a new address to the user's profile
 * @route POST /api/client/addresses/new
 * @access Private
 */
export const addUserAddress = async (req, res) => {
  const userId = req.user._id;
  const {
    label,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    isDefault,
  } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    const newAddress = {
      label,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault,
    };

    user.addresses.push(newAddress);
    await user.save();

    res
      .status(201)
      .json({ message: "Address added successfully", address: newAddress });
  } catch (error) {
    console.error("Error adding address:", error);
    if (error.name === "ValidationError") {
      res.status(400).json({ message: "Invalid address data" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};

/**
 * @desc    Mengambil semua alamat milik pengguna yang sedang login.
 * @route   GET /api/client/addresses
 * @access  Private
 */
export const getUserAddresses = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId).select("addresses");
    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan." });
    }
    res.status(200).json(user.addresses || []);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

/**
 * @desc    Memperbarui alamat yang sudah ada.
 * @route   PUT /api/client/addresses/:addressId/update
 * @access  Private
 */
export const updateUserAddress = async (req, res) => {
  const userId = req.user._id;
  const { addressId } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(addressId)) {
    return res.status(400).json({ message: "ID alamat tidak valid." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan." });
    }

    const addressToUpdate = user.addresses.id(addressId);
    if (!addressToUpdate) {
      return res.status(404).json({ message: "Alamat tidak ditemukan." });
    }

    // Jika alamat ini akan di-set sebagai alamat utama
    if (updates.isDefault === true) {
      user.addresses.forEach((addr) => {
        // Set semua alamat lain menjadi tidak utama
        if (addr._id.toString() !== addressId) {
          addr.isDefault = false;
        }
      });
    }

    // Terapkan pembaruan
    Object.assign(addressToUpdate, updates);
    await user.save();

    res.status(200).json({
      message: "Alamat berhasil diperbarui.",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

/**
 * @desc    Menghapus alamat dari daftar.
 * @route   DELETE /api/client/addresses/:addressId/delete
 * @access  Private
 */
export const deleteUserAddress = async (req, res) => {
  const userId = req.user._id;
  const { addressId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(addressId)) {
    return res.status(400).json({ message: "ID alamat tidak valid." });
  }

  try {
    // Gunakan $pull untuk menghapus sub-dokumen dari array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { addresses: { _id: addressId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "Pengguna atau alamat tidak ditemukan." });
    }

    // Jika alamat yang dihapus adalah alamat utama, set alamat pertama (jika ada) sebagai utama
    const hasDefaultAddress = updatedUser.addresses.some(
      (addr) => addr.isDefault
    );
    if (!hasDefaultAddress && updatedUser.addresses.length > 0) {
      updatedUser.addresses[0].isDefault = true;
      await updatedUser.save();
    }

    res.status(200).json({
      message: "Alamat berhasil dihapus.",
      addresses: updatedUser.addresses,
    });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

/**
 * @desc  Mengubah password pengguna.
 * @route PUT /api/client/profile/change-password
 * @access Private
 */
export const changeUserPassword = async (req, res) => {
  const userId = req.user._id;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  console.log("Received password change request:", {
    currentPassword,
    newPassword,
    confirmPassword,
  });

  try {
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password baru dan konfirmasi tidak cocok." });
    }

    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan." });
    }

    const isMatch = await user.isPasswordCorrect(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Password saat ini salah." });
    }

    const isSamePassword = await user.isPasswordCorrect(newPassword);
    if (isSamePassword) {
      return res.status(400).json({
        message: "Password baru tidak boleh sama dengan password lama.",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password berhasil diperbarui." });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};
