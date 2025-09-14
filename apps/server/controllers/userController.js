import User from "../models/userModel.js";
import {
  uploadFilesToCloudinary,
  deleteFilesFromCloudinary,
} from "../utils/cloudinaryUtils.js";

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
      // Jika username baru sudah dipakai oleh pengguna lain, kirim error
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
