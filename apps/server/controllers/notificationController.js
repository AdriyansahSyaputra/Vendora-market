import Notification from "../models/notificationsModel.js";
import mongoose from "mongoose";

/**
 * @desc    Mendapatkan daftar notifikasi pengguna
 * @route   GET /api/client/notifications
 * @access  Private
 */
export const getUserNotifications = async (req, res) => {
  try {
    const notification = await Notification.find({ userId: req.user._id })
      .sort({
        createdAt: -1,
      })
      .limit(20);

    res.status(200).json(notification);
  } catch (error) {
    console.error("🔥 Server Error:", error.message);
    res.status(500).json({
      message: "An unexpected error occurred.",
      error: error.message,
      stack: error.stack,
    });
  }
};

/**
 * @desc    Menandai semua notifikasi sebagai sudah dibaca
 * @route   PUT /api/client/notifications/read
 * @access  Private
 */
export const markNotificationsAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.user._id, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({ message: "Notifications marked as read." });
  } catch (error) {
    console.error("🔥 Server Error:", error.message);
    res.status(500).json({
      message: "An unexpected error occurred.",
      error: error.message,
      stack: error.stack,
    });
  }
};

/**
 * @desc    Mengambil notifikasi berdasarkan ID, memvalidasi kepemilikan, dan menandainya sebagai sudah dibaca.
 * @route   GET /api/client/notifications/:id
 * @access  Private
 */
export const getNotificationById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid notification ID format." });
  }

  try {
    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found." });
    }

    if (notification.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message:
          "Access denied. You do not have permission to view this notification.",
      });
    }

    // Hanya simpan ke DB jika ada perubahan untuk efisiensi
    if (!notification.isRead) {
      notification.isRead = true;
      await notification.save();
    }

    res.status(200).json(notification);
  } catch (error) {
    console.error("SERVER_ERROR in getNotificationById:", error);

    res.status(500).json({
      message: "An unexpected server error occurred. Please try again later.",
    });
  }
};
