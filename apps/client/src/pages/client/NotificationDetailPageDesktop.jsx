import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ChevronRight, Bell, ArrowLeft, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet-async";
import DesktopNavbar from "@/components/Templates/client/navbar/DesktopNavbar";
import Footer from "@/components/Templates/client/footer/Footer";
import { useNotifications } from "@/hooks/useNotifications";
import { iconMap } from "@/utils/iconMap";
import { timeAgo } from "@/utils/dateHelpers";

const NotificationDetailPageDesktop = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    singleNotification: notification,
    isSingleLoading: loading,
    singleError: error,
    fetchNotificationById,
    notificationsData: recentNotifications,
  } = useNotifications();

  useEffect(() => {
    if (id) {
      fetchNotificationById(id);
    }
  }, [id, fetchNotificationById]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderCircle className="animate-spin" /> Loading notification...
      </div>
    );
  }

  if (error || !notification) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Bell className="mx-auto h-16 w-16 text-gray-400" />
          <h2 className="mt-4 text-2xl font-bold">Notification not found</h2>
          <p className="mt-2 text-muted-foreground">
            {error ||
              "The notification you are looking for may have been deleted or does not exist."}
          </p>
          <Button onClick={() => navigate("/")} className="mt-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const { detailContent } = notification;

  return (
    <>
      <Helmet title={notification.title || "Notification"} />

      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <DesktopNavbar />

        <main className="container mx-auto px-4 py-8 pt-24 md:pt-8 pb-24 md:pb-8 space-y-12 md:space-y-16 lg:space-y-20">
          <div className="max-w-7xl px-4 py-8">
            <div className="mb-6">
              <Button variant="ghost" onClick={() => navigate(-1)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Kolom Utama: Detail Notifikasi */}
              <div className="lg:col-span-2">
                <Card className="overflow-hidden shadow-sm">
                  <CardHeader className="bg-muted/30 p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background">
                        {iconMap[notification.type] || iconMap.default}
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold tracking-tight">
                          {detailContent.header}
                        </CardTitle>
                        <CardDescription className="mt-1 text-sm">
                          Received: {timeAgo(notification.createdAt)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 text-base leading-relaxed text-foreground/80">
                    <p>{detailContent.body}</p>
                  </CardContent>
                  {detailContent.cta && (
                    <CardFooter className="border-t bg-muted/30 p-6">
                      <Button asChild>
                        <Link to={detailContent.cta.link}>
                          {detailContent.cta.text}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </div>

              {/* Kolom Samping: Notifikasi Lainnya */}
              <aside className="space-y-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  Notifikasi Terbaru
                </h3>
                <div className="space-y-2">
                  {recentNotifications.map((otherNotif) => (
                    <Link
                      key={otherNotif._id}
                      to={`/notifications/${otherNotif._id}`}
                      className={cn(
                        "block rounded-lg border p-4 transition-colors hover:bg-muted/50",
                        otherNotif._id === id && "border-primary bg-muted"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{otherNotif.title}</p>
                        {!otherNotif.isRead && (
                          <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-sky-500"></span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {timeAgo(otherNotif.createdAt)}
                      </p>
                    </Link>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NotificationDetailPageDesktop;
