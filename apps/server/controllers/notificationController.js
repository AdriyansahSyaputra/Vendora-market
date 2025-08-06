import Notification from "../models/notificationsModel.js";

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

export const getNotificationById = async (req, res) => {
  const { id } = req.params;

  try {
    // Validasi apakah ID valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid notification ID.");
    }

    const notification = await Notification.findById(id);

    if (
      !notification ||
      notification.userId.toString() !== req.user._id.toString()
    ) {
      res.status(404);
      throw new Error("Notification not found.");
    }

    // Tandai sebagai sudah dibaca saat dibuka
    if (!notification.isRead) {
      notification.isRead = true;
      await notification.save();
    }

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
