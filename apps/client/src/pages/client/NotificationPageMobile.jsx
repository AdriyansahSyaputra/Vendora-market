import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import DesktopNavbar from "@/components/Templates/client/navbar/DesktopNavbar";
import MobileTopNav from "@/components/Templates/client/navbar/MobileTopNav";
import MobileBottomNav from "@/components/Templates/client/navbar/MobileBottomNav";
import Footer from "@/components/Templates/client/footer/Footer";
import NotificationDetail from "@/components/Layouts/client/Notification/NotificationDetail";
import NotificationItem from "@/components/Layouts/client/Notification/NotificationItem";
import { Tag, ShoppingCart, Store, Info } from "lucide-react";

const notificationsData = [
  {
    id: 1,
    type: "promo",
    icon: Tag,
    title: "Special For You! 50% Discount Voucher",
    description:
      "Claim your 50% discount voucher for all electronics. Limited time!",
    timestamp: "5 minutes ago",
    isRead: false,
    detailContent: {
      header: "Special Electronics Discount!",
      body: "Enjoy a 50% discount (up to $5) on all items in the Electronics category. Don't miss out, this promo is only valid until the end of the week. Use code: VENDORA50 at checkout.",
      cta: { text: "View Promo Products", link: "#" },
    },
  },
  {
    id: 2,
    type: "order",
    icon: ShoppingCart,
    title: "Order Processed",
    description: "Your order #INV12345 is being prepared by the seller.",
    timestamp: "1 hour ago",
    isRead: false,
    detailContent: {
      header: "Order Status: #INV12345",
      body: "Good news! The seller has received your order and is preparing it for shipment. You will receive another notification once your order is on its way.",
      cta: { text: "Track Order", link: "#" },
    },
  },
  {
    id: 3,
    type: "store",
    icon: Store,
    title: "Gadget Store added new products",
    description: "Check out the latest collection from your favorite store.",
    timestamp: "3 hours ago",
    isRead: true,
    detailContent: {
      header: "New Products from Gadget Store",
      body: "The store you follow, Gadget Store, just released some cool new products, including the Headphone Pro X and the 5th Gen Smartwatch. Be the first to own them!",
      cta: { text: "Visit Store", link: "#" },
    },
  },
  {
    id: 4,
    type: "info",
    icon: Info,
    title: "Privacy Policy Update",
    description: "We have updated our privacy policy.",
    timestamp: "Yesterday",
    isRead: true,
    detailContent: {
      header: "Privacy Policy Update",
      body: "To improve security and transparency, we have updated our privacy policy as of June 27, 2025. By continuing to use our service, you agree to these changes.",
      cta: null,
    },
  },
];

const NotificationPageMobile = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  const [view, setView] = useState("list"); // 'list' or 'detail'
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState(notificationsData);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setView("detail");

    // Mark notification as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n))
    );
  };

  const handleBack = () => {
    setView("list");
    setSelectedNotification(null);
  };

  return (
    <>
      <Helmet title="Trending" />

      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        {/* Navbar Untuk Desktop */}
        <DesktopNavbar />

        {/* Navbar untuk Mobile */}
        <MobileTopNav page={currentPage} view={view} handleBack={handleBack} />
        <MobileBottomNav />

        {/* Konten Utama Halaman */}
        <main className="w-full max-w-md mx-auto text-foreground min-h-screen border-x dark:border-gray-800 mt-16">
          {/* Dynamic Content */}
          <div>
            {view === "list" ? (
              <div>
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClick={() => handleNotificationClick(notification)}
                  />
                ))}
              </div>
            ) : (
              selectedNotification && (
                <NotificationDetail notification={selectedNotification} />
              )
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NotificationPageMobile;
