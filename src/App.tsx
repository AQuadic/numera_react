import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/general/Layout";
import HomePage from "./pages/HomePage";
import SigninPage from "./components/auth/signin/SigninPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
          <Route path="signin" element={<SigninPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
