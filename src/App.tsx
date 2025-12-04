import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/general/Layout";
import HomePage from "./pages/HomePage";
import SigninPage from "./components/auth/signin/SigninPage";
import SignupPage from "./components/auth/singup/SignupPage";
import ForgetPassPage from "./components/auth/forget_password/ForgetPassPage";
import ResetPassPage from "./components/auth/reset_passwotrd/ResetPassPass";
import FAQsPage from "./pages/FAQsPage";
import ContactUsPage from "./pages/ContactUsPage";
import PlateDetails from "./pages/PlateDetails";
import PhoneNumberDetails from "./pages/PhoneNumberDetails";
import DrawPlatesPage from "./pages/DrawPlatesPage";
import DrawYourPlatePage from "./pages/DrawYourPlatePage";
import SellPlatesPage from "./pages/SellPlatesPage";
import ConfirmPlate from "./components/sell_plates/ConfirmPlate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="draw_your_plates" element={<DrawPlatesPage />} />
          <Route path="plates_result" element={<DrawYourPlatePage />} />
          <Route path="sell_plates" element={<SellPlatesPage />} />
          <Route path="confirm_plate" element={<ConfirmPlate />} />
          <Route path="faq" element={<FAQsPage />} />
          <Route path="contact_us" element={<ContactUsPage />} />
          <Route path="plate_details" element={<PlateDetails />} />
          <Route path="phone_number_details" element={<PhoneNumberDetails />} />
        </Route>
          <Route path="signin" element={<SigninPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="forget_password" element={<ForgetPassPage />} />
          <Route path="reset_password" element={<ResetPassPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
