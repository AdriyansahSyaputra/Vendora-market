import { Link } from "react-router-dom";
import { Bell, LoaderCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/useNotifications";
import { iconMap } from "@/utils/iconMap";
import { timeAgo } from "@/utils/dateHelpers";

const NotificationList = () => {
  const { notificationsData, unreadCount, loading, handleMarkAllAsRead } =
    useNotifications();

  if (loading) {
    return (
      <p className="p-4 text-sm text-center">
        <LoaderCircle className="animate-spin" /> Loading notifications...
      </p>
    );
  }

  if (notificationsData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <Bell className="h-8 w-8 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500">
          You don&apos;t have any notifications
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {unreadCount > 0 && (
        <div className="flex items-center justify-between p-3 border-b">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {unreadCount} unread notifications
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMarkAllAsRead}
            className="text-xs"
          >
            Mark all as read
          </Button>
        </div>
      )}

      <ScrollArea className="h-[300px] -mr-2 pr-2">
        {" "}
        {/* Beri ruang untuk scrollbar */}
        <div className="space-y-2">
          {notificationsData.map((notification) => {
            return (
              <Link
                to={`/notifications/${notification._id}`}
                key={notification._id}
                className="block outline-none"
              >
                <div
                  className={cn(
                    "flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors",
                    !notification.isRead && "bg-blue-50 dark:bg-blue-900/20"
                  )}
                >
                  <div className="flex-shrink-0 mt-1">
                    {iconMap[notification.type] || iconMap.default}
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-sm leading-tight text-gray-800 dark:text-gray-100">
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {notification.description}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {timeAgo(notification.createdAt)}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <div className="flex-shrink-0 self-center">
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-500 block"></span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </ScrollArea>
      <Separator className="my-2 dark:bg-gray-600" />
      <Button variant="ghost" className="w-full text-sm as-child">
        <Link to="/notifications">Lihat Semua Notifikasi</Link>
      </Button>
    </div>
  );
};

export default NotificationList;
