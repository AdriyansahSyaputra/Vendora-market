import { Link } from "react-router-dom";
import { Tag, ShoppingCart, Store, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { notificationsData } from "@/utils/notifications";
import { slugify } from "@/utils/notifications";

const iconMap = {
  promo: <Tag className="h-5 w-5 text-sky-500" />,
  order: <ShoppingCart className="h-5 w-5 text-green-500" />,
  store: <Store className="h-5 w-5 text-purple-500" />,
  info: <Info className="h-5 w-5 text-gray-500" />,
};

const NotificationList = () => {
  if (notificationsData.length === 0) {
    return <p>Belum ada notifikasi baru untuk Anda.</p>;
  }

  return (
    <div className="flex flex-col">
      <ScrollArea className="h-[300px] -mr-2 pr-2">
        {" "}
        {/* Beri ruang untuk scrollbar */}
        <div className="space-y-2">
          {notificationsData.map((notification) => {
            const slug = slugify(notification.title);

            return (
              <Link
                to={`/notifications/${slug}`}
                key={notification.id}
                className="block outline-none"
              >
                <div
                  className={cn(
                    "flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors",
                    !notification.isRead && "bg-blue-50 dark:bg-blue-900/20"
                  )}
                >
                  <div className="flex-shrink-0 mt-1">
                    {iconMap[notification.type]}
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-sm leading-tight text-gray-800 dark:text-gray-100">
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {notification.description}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {notification.timestamp}
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
