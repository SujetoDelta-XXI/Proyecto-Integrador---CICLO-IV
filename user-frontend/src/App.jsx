import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Register from "./components/Register";
import LoginForm from "./components/LoginForm";
import Index from "./components/Index";
import TwoFactorSetup from "./components/TwoFactorSetup";
import ShopGridPage from "./components/Producto/ShopGridPage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <Router>
      <Header />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loginForm" element={<LoginForm />} />
          <Route path="/two-factor-setup" element={<TwoFactorSetup />} />
          <Route path="/productos" element={<ShopGridPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;