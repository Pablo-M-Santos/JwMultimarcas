import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";
import Checkout from "./pages/Checkout";
import VerifyCode from "./pages/VerifyCode";
import ProtectedRoute from "./components/ProtectedRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";
import RequestCode from "./pages/RequestCode";
import Cadastro from "./pages/Cadastro";
import HomePage from "./pages/HomePage";


const GOOGLE_CLIENT_ID =
  "355361599465-3hus4sf98tom9dds64q15rupsio2pi60.apps.googleusercontent.com";
console.log(GOOGLE_CLIENT_ID);

const App = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID!}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/request-code" element={<RequestCode />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<AdminPage />} />
          </Route>
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
