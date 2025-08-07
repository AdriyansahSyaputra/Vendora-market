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

  const fetchNotificationById = useCallback(
    async (id) => {
      if (!id) return;

      setIsSingleLoading(true);
      setSingleError(null);
      setSingleNotification(null);

      try {
        const { data } = await axios.get(`/api/client/notifications/${id}`, {
          withCredentials: true,
        });

        if (!data) {
          throw new Error("No notification data received");
        }

        setSingleNotification(data);

        // Update notification list & unread count
        setNotificationsData((prev) => {
          let wasUnread = false;
          const updated = prev.map((notif) => {
            if (notif._id === id) {
              if (!notif.isRead) wasUnread = true;
              return { ...notif, isRead: true };
            }
            return notif;
          });

          if (wasUnread) {
            setUnreadCount((prevCount) => Math.max(0, prevCount - 1));
          }

          return updated;
        });
      } catch (err) {
        const status = err.response?.status;
        const data = err.response?.data;
        let message = "Failed to load notification";

        if (status === 404) message = "Notification not found";
        else if (status === 403)
          message = "You don't have permission to view this notification";
        else if (status === 400) message = "Invalid notification ID";
        else if (data?.message) message = data.message;
        else if (data?.error) message = data.error;
        else if (err.message) message = err.message;

        setSingleError(message);
      } finally {
        setIsSingleLoading(false);
      }
    },
    [setNotificationsData, setUnreadCount]
  );

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
