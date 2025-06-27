import { ChevronRight } from "lucide-react";

const NotificationItem = ({ notification, onClick }) => {
  const iconColor = {
    promo:
      "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400",
    order: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
    store:
      "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400",
    info: "bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400",
  };

  return (
    <div
      onClick={onClick}
      className="flex items-start gap-4 p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
    >
      {!notification.isRead && (
        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
      )}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          iconColor[notification.type]
        } ${notification.isRead ? "ml-4" : ""}`}
      >
        <notification.icon className="w-5 h-5" />
      </div>
      <div className="flex-grow">
        <p className="font-semibold text-sm text-foreground">
          {notification.title}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {notification.description}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          {notification.timestamp}
        </p>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground self-center" />
    </div>
  );
};

export default NotificationItem;