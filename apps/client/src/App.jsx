import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/client/HomePage";
import TrendingPage from "./pages/client/TrendingPage";
import PromoPage from "./pages/client/PromoPage";
import ProductPage from "./pages/client/ProductPage";
import NotificationPageMobile from "./pages/client/NotificationPageMobile";
import AccountPageMobile from "./pages/client/AccountPageMobile";
import SettingPageMobile from "./pages/client/SettingPageMobile";
import SettingPageDesktop from "./pages/client/SettingPageDesktop";
import DashboardPage from "./pages/vendor/DashboardPage";
import AllProductPage from "./pages/vendor/Product/AllProductPage";
import AddProductPage from "./pages/vendor/Product/AddProductPage";
import CategoryPage from "./pages/vendor/Product/CategoryPage";
import AllOrdersPage from "./pages/vendor/Order/AllOrdersPage";
import AwaitingConfirmationPage from "./pages/vendor/Order/AwaitingConfirmationPage";
import InShipmentPage from "./pages/vendor/Order/InShipmentPage";
import OrderHistoryPage from "./pages/vendor/Order/OrderHistoryPage";
import MessagePage from "./pages/vendor/MessagePage";
import AnalyticPage from "./pages/vendor/AnalyticPage";
import ReviewsPage from "./pages/vendor/Review-feedback/ReviewsPage";
import ProductReviewsPage from "./pages/vendor/Review-feedback/ProductReviewsPage";
import RevenuePage from "./pages/vendor/Finance/RevenuePage";
import WithdrawalPage from "./pages/vendor/Finance/WithdrawalPage";
import PaymentHistoryPage from "./pages/vendor/Finance/PaymentHistoryPage";
import PromotionPage from "./pages/vendor/PromotionPage";
import StoreSettingPage from "./pages/vendor/StoreSettingPage";
import CompanyDashboardPage from "./pages/company/Dashboardpage";
import AllUsersPage from "./pages/company/User/AllUserPage";
import SellerVerification from "./pages/company/User/SellerVerification";
import AllProductPageCompany from "./pages/company/Product/AllProductPage";
import CategoryManagementPage from "./pages/company/Product/CategoryManagementPage";
import OrderManagementPage from "./pages/company/OrderManagementPage";
import StoreManagementPage from "./pages/company/StoreManagementPage";
import AdvertisementPage from "./pages/company/Advertisement/AdvertisementPage";
import VoucherPage from "./pages/company/Advertisement/VoucherPage";
import LogActivityPage from "./pages/company/LogActivityPage";
import AuthPage from "./pages/auth/AuthPage";
import SellerRequestPage from "./pages/client/SellerRequestPage";
import NotificationDetailPageDesktop from "./pages/client/NotificationDetailPageDesktop";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/promo" element={<PromoPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/notification" element={<NotificationPageMobile />} />
        <Route path="/account" element={<AccountPageMobile />} />
        <Route path="/settings" element={<SettingPageMobile />} />
        <Route path="/settings/desktop" element={<SettingPageDesktop />} />
        <Route path="/seller-request" element={<SellerRequestPage />} />
        <Route
          path="/notifications/:slug"
          element={<NotificationDetailPageDesktop />}
        />

        {/* Seller routes */}
        <Route path="/store/dashboard" element={<DashboardPage />} />
        {/* Product routes */}
        <Route path="/store/products" element={<AllProductPage />} />
        <Route path="/store/products/new" element={<AddProductPage />} />
        <Route path="/store/products/categories" element={<CategoryPage />} />

        {/* Order routes */}
        <Route path="/store/orders" element={<AllOrdersPage />} />
        <Route
          path="/store/orders/awaiting-confirmation"
          element={<AwaitingConfirmationPage />}
        />
        <Route path="/store/orders/shipment" element={<InShipmentPage />} />
        <Route path="/store/orders/history" element={<OrderHistoryPage />} />

        <Route path="/store/messages" element={<MessagePage />} />

        <Route path="/store/analytics" element={<AnalyticPage />} />

        {/* Review routes */}
        <Route path="/store/reviews" element={<ReviewsPage />} />
        <Route path="/store/reviews/:name" element={<ProductReviewsPage />} />

        {/* Finance routes */}
        <Route path="/store/finance" element={<RevenuePage />} />
        <Route path="/store/finance/withdrawals" element={<WithdrawalPage />} />
        <Route
          path="/store/finance/payment-history"
          element={<PaymentHistoryPage />}
        />

        <Route path="/store/promotions" element={<PromotionPage />} />

        <Route path="/store/settings/store" element={<StoreSettingPage />} />

        {/* Company Routes */}
        <Route path="/dashboard" element={<CompanyDashboardPage />} />
        <Route path="/dashboard/users" element={<AllUsersPage />} />
        <Route
          path="/dashboard/users/verification"
          element={<SellerVerification />}
        />

        <Route path="/dashboard/products" element={<AllProductPageCompany />} />
        <Route
          path="/dashboard/products/categories"
          element={<CategoryManagementPage />}
        />

        <Route path="/dashboard/orders" element={<OrderManagementPage />} />

        <Route path="/dashboard/stores" element={<StoreManagementPage />} />

        <Route
          path="/dashboard/advertisements"
          element={<AdvertisementPage />}
        />
        <Route
          path="/dashboard/advertisements/vouchers"
          element={<VoucherPage />}
        />

        <Route path="/dashboard/log-activity" element={<LogActivityPage />} />

        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
};

export default App;
