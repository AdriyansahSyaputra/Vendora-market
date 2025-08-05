import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  Bell,
  ArrowLeft,
  Tag,
  ShoppingCart,
  Store,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getNotificationBySlug } from "@/utils/notifications";
import { notificationsData } from "@/utils/notifications";
import { cn } from "@/lib/utils";
import { slugify } from "@/utils/notifications";
import { Helmet } from "react-helmet-async";
import DesktopNavbar from "@/components/Templates/client/navbar/DesktopNavbar";
import Footer from "@/components/Templates/client/footer/Footer";

const detailIconMap = {
  promo: <Tag className="h-7 w-7 text-sky-500" />,
  order: <ShoppingCart className="h-7 w-7 text-green-500" />,
  store: <Store className="h-7 w-7 text-purple-500" />,
  info: <Info className="h-7 w-7 text-gray-500" />,
};

const NotificationDetailPageDesktop = () => {
  const { slug } = useParams();
  const notification = getNotificationBySlug(slug);

  if (!notification) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Bell className="mx-auto h-16 w-16 text-gray-400" />
          <h2 className="mt-4 text-2xl font-bold">
            Notifikasi Tidak Ditemukan
          </h2>
          <p className="mt-2 text-muted-foreground">
            Notifikasi yang Anda cari mungkin telah dihapus atau tidak ada.
          </p>
          <Button asChild className="mt-6">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const { type, timestamp, detailContent } = notification;

  return (
    <>
      <Helmet title="Notifications" />

      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <DesktopNavbar />

        <main className="container mx-auto px-4 py-8 pt-24 md:pt-8 pb-24 md:pb-8 space-y-12 md:space-y-16 lg:space-y-20">
          <div className="max-w-7xl px-4 py-8">
            <div className="mb-6">
              <Button variant="ghost" asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali ke Beranda
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Kolom Utama: Detail Notifikasi */}
              <div className="lg:col-span-2">
                <Card className="overflow-hidden shadow-sm">
                  <CardHeader className="bg-muted/30 p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background">
                        {detailIconMap[type]}
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold tracking-tight">
                          {detailContent.header}
                        </CardTitle>
                        <CardDescription className="mt-1 text-sm">
                          Diterima: {timestamp}
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
                  {notificationsData.map((otherNotif) => (
                    <Link
                      key={otherNotif.id}
                      to={`/notifications/${slugify(otherNotif.title)}`}
                      className={cn(
                        "block rounded-lg border p-4 transition-colors hover:bg-muted/50",
                        slugify(otherNotif.title) === slug &&
                          "border-primary bg-muted"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{otherNotif.title}</p>
                        {!otherNotif.isRead && (
                          <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-sky-500"></span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {otherNotif.timestamp}
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
