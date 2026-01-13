import { BrowserRouter, Route, Routes } from "react-router";
import { useNotifications } from "./hooks/useNotifications";
import Layout from "./components/general/Layout";
import HomePage from "./pages/HomePage";
import SigninPage from "./components/auth/signin/SigninPage";
import SignupPage from "./components/auth/singup/SignupPage";
import ForgetPassPage from "./components/auth/forget_password/ForgetPassPage";
import VerifyResetPage from "./components/auth/forget_password/VerifyResetPage";
import ResetPassPage from "./components/auth/reset_passwotrd/ResetPassPass";
import FAQsPage from "./pages/FAQsPage";
import ContactUsPage from "./pages/ContactUsPage";
import PlateDetails from "./pages/PlateDetails";
import PhoneNumberDetails from "./pages/PhoneNumberDetails";
import DrawPlatesPage from "./pages/DrawPlatesPage";
import DrawYourPlatePage from "./pages/DrawYourPlatePage";
import SellPlatesPage from "./pages/SellPlatesPage";
import ConfirmPlate from "./components/sell_plates/ConfirmPlate";
import SellerProfile from "./pages/SellerProfile";
import MyProfile from "./pages/MyProfile";
import AuthProvider from "./components/auth/AuthProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import GuestRoute from "./components/auth/GuestRoute";
import PlatesFilter from "./pages/PlatesFilter";
import SimsPage from "./pages/SimsPage";
import PageDetails from "./pages/PageDetails";
import PersonalInformation from "./components/my_profile/PersonalInformation";
import MyProfileComponent from "./components/my_profile/MyProfileComponent";
import MyAdsComponent from "./components/my_profile/MyAdsComponent";
import AnalyticalDashboard from "./components/my_profile/AnalyticalDashboard/AnalyticalDashboard";
import ChangePassword from "./components/my_profile/ChangePassword";
import FavPlates from "./components/my_profile/FavPlates";
import AllAds from "./components/my_profile/AllAds";
import Settings from "./components/my_profile/Settings";
import SellerPlates from "./components/seller/SellerPlates";

function App() {
  useNotifications();
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes with layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="draw_your_plates" element={<DrawPlatesPage />} />
            <Route path="plates_result" element={<DrawYourPlatePage />} />
            <Route path="faq" element={<FAQsPage />} />
            <Route path="contact_us" element={<ContactUsPage />} />
            <Route path="plates" element={<PlatesFilter />} />
            <Route path="sims" element={<SimsPage />} />
            <Route path="page/:id" element={<PageDetails />} />
            <Route path="seller_profile/:userId" element={<SellerProfile />} />
            <Route path="seller_plates/:userId" element={<SellerPlates />} />
            <Route path="plate" element={<PlateDetails />} />
            <Route path="plate/:id" element={<PlateDetails />} />
            <Route path="plate/:id/:slug" element={<PlateDetails />} />
            <Route path="sim" element={<PhoneNumberDetails />} />
            <Route path="sim/:id" element={<PhoneNumberDetails />} />
            <Route path="sim/:id/:slug" element={<PhoneNumberDetails />} />
            {/* Protected routes - require authentication */}
            <Route element={<ProtectedRoute />}>
              <Route path="sell_plates" element={<SellPlatesPage />} />
              <Route path="confirm_plate" element={<ConfirmPlate />} />
              <Route path="profile" element={<MyProfile />}>
                <Route index element={<MyProfileComponent />} />
                <Route path="personal_info" element={<PersonalInformation />} />
                <Route path="change_password" element={<ChangePassword />} />
                <Route path="favorite_plates" element={<FavPlates />} />
                <Route path="ads" element={<MyAdsComponent />} />
                <Route path="allAds" element={<AllAds />} />
                <Route path="settings" element={<Settings />} />
                <Route path="analytics" element={<AnalyticalDashboard />} />
              </Route>
            </Route>
          </Route>

          {/* Guest-only routes (redirect to home if logged in) */}
          <Route element={<GuestRoute />}>
            <Route path="signin" element={<SigninPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="forget_password" element={<ForgetPassPage />} />
            <Route path="verify_reset" element={<VerifyResetPage />} />
            <Route path="reset_password" element={<ResetPassPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
