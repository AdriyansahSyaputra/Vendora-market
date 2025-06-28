import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/client/HomePage";
import TrendingPage from "./pages/client/TrendingPage";
import PromoPage from "./pages/client/PromoPage";
import ProductPage from "./pages/client/ProductPage";
import NotificationPageMobile from "./pages/client/NotificationPageMobile";
import AccountPageMobile from "./pages/client/AccountPageMobile";
import SettingPageMobile from "./pages/client/SettingPageMobile";
import SettingPageDesktop from "./pages/client/SettingPageDesktop";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/promo" element={<PromoPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/notification" element={<NotificationPageMobile />} />
        <Route path="/account" element={<AccountPageMobile />} />
        <Route path="/settings" element={<SettingPageMobile />} />
        <Route path="/settings/desktop" element={<SettingPageDesktop />} />
      </Routes>
    </Router>
  );
};

export default App;
