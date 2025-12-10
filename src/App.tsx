import { BrowserRouter, Route, Routes } from "react-router";
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

function App() {
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
            <Route path="plates_filter" element={<PlatesFilter />} />
            <Route path="sims" element={<SimsPage />} />
            <Route path="page/:id" element={<PageDetails />} />
            <Route path="seller_profile" element={<SellerProfile />} />

            {/* Protected routes - require authentication */}
            <Route element={<ProtectedRoute />}>
              <Route path="plate_details" element={<PlateDetails />} />
              <Route path="plate_details/:id" element={<PlateDetails />} />
              <Route
                path="phone_number_details"
                element={<PhoneNumberDetails />}
              />
              <Route
                path="phone_number_details/:id"
                element={<PhoneNumberDetails />}
              />
              <Route path="sell_plates" element={<SellPlatesPage />} />
              <Route path="confirm_plate" element={<ConfirmPlate />} />
              <Route path="profile" element={<MyProfile />} />
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
