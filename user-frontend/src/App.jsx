import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

import Header from "./components/Header";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Register from "./components/Register";
import LoginForm from "./components/LoginForm";
import Index from "./components/Index";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import TwoFactorSetup  from "./components/TwoFactorSetup";
import TwoFactorSetupPage from "./Pages/TwoFactorSetUpPage";
import ProductoPage from "./Pages/ProductosPage";
import PerfilPage from "./Pages/PerfilPage";
import ProductoDetalle from "./Pages/ProductoDetalle";
import CarritoPage from "./Pages/CarritoPage";
import Setup2faMethodPage from "./Pages/Setup2faMethodPage";
import Disenar from "./components/Disenar";
import DisenosGuardados from "./components/DisenosGuardados";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Header />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/loginForm" element={<LoginForm />} />
            <Route path="/two-factor-setup" element={<TwoFactorSetupPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/productos" element={<ProductoPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
            <Route path="/carrito" element={<CarritoPage />} />
            <Route path="/setup-2fa-method" element={<Setup2faMethodPage />} />
            <Route path="/disenar" element={<Disenar />} />
            <Route path="/mis-disenos" element={<DisenosGuardados />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
