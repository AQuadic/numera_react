import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/general/Layout";
import HomePage from "./pages/HomePage";
import SigninPage from "./components/auth/signin/SigninPage";
import SignupPage from "./components/auth/singup/SignupPage";
import ForgetPassPage from "./components/auth/forget_password/ForgetPassPage";
import ResetPassPage from "./components/auth/reset_passwotrd/ResetPassPass";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
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
