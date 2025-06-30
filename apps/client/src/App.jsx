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
      </Routes>
    </Router>
  );
};

export default App;
