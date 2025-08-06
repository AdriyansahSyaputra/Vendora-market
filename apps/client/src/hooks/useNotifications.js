import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSocket } from "@/context/socket/socketContext";

export const useNotifications = () => {
  const { socket, isConnected } = useSocket();
  const [notificationsData, setNotificationsData] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [singleNotification, setSingleNotification] = useState(null);
  const [isSingleLoading, setIsSingleLoading] = useState(false);
  const [singleError, setSingleError] = useState(null);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/client/notifications", {
        withCredentials: true,
      });
      setNotificationsData(data);
      setUnreadCount(
        data.filter((notification) => !notification.isRead).length
      );
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    if (socket && isConnected) {
      const handleNewNotification = (newNotification) => {
        setNotificationsData((prev) => [newNotification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      };

      socket.on("notification", handleNewNotification);

      return () => {
        socket.off("notification", handleNewNotification);
      };
    }
  }, [socket, isConnected]);

  const handleMarkAllAsRead = useCallback(async () => {
    if (unreadCount === 0) return;
    try {
      await axios.put(
        "/api/client/notifications/read",
        {},
        { withCredentials: true }
      );
      setNotificationsData((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  }, [unreadCount]);

  const fetchNotificationById = useCallback(async (id) => {
    if (!id) return;
    setIsSingleLoading(true);
    setSingleError(null);
    try {
      const { data } = await axios.get(`/api/client/notifications/${id}`, {
        withCredentials: true,
      });
      setSingleNotification(data);
    } catch (err) {
      console.error("Failed to fetch notification detail:", err);
      setSingleError(
        "Notification not found or you do not have permission to view it."
      );
    } finally {
      setIsSingleLoading(false);
    }
  }, []);

  return {
    notificationsData,
    unreadCount,
    loading,
    handleMarkAllAsRead,
    singleNotification,
    isSingleLoading,
    singleError,
    fetchNotificationById,
  };
};
