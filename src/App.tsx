import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/general/Layout";
import HomePage from "./pages/HomePage";
import SigninPage from "./components/auth/signin/SigninPage";
import SignupPage from "./components/auth/singup/SignupPage";
import ForgetPassPage from "./components/auth/forget_password/ForgetPassPage";
import ResetPassPage from "./components/auth/reset_passwotrd/ResetPassPass";
import DrawYourPlatePage from "./pages/DrawYourPlatePage";
import FAQsPage from "./pages/FAQsPage";
import ContactUsPage from "./pages/ContactUsPage";
import PlateDetails from "./pages/PlateDetails";
import PhoneNumberDetails from "./pages/PhoneNumberDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="draw_your_plates" element={<DrawYourPlatePage />} />
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
