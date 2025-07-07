import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Register from "./components/Register";
import LoginForm from "./components/LoginForm";
import Index from "./components/Index";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import TwoFactorSetupPage from "./Pages/TwoFactorSetupPage";
import ProductoPage from "./Pages/ProductosPage";
import PerfilPage from "./Pages/PerfilPage";
import ProductoDetalle from "./Pages/ProductoDetalle";
import CarritoPage from "./Pages/CarritoPage";
import ResumenCompraPage from "./Pages/ResumenCompraPage";
import DatosEnvioPage from "./Pages/DatosEnvioPage";
import PasarelaPago from "./Pages/PasarelaPago";
import Tienda from "./Pages/Tienda";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    // Esto se ejecuta UNA SOLA VEZ al iniciar
    // para limpiar token solo si el usuario no está autenticado.
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen pt-16">  {/* 16 = 64px de alto del header */}

      <Router>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/loginForm" element={<LoginForm />} />
            <Route path="/two-factor-setup" element={<TwoFactorSetupPage />} />
            {/* Eliminamos TwoFactorVerifyPage porque ya no se usa */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/tienda" element={<Tienda />} />

            <Route path="/productos" element={<ProductoPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
            <Route path="/carrito" element={<CarritoPage />} />
            <Route path="/resumen" element={<ResumenCompraPage />} />
            <Route path="/datos-envio" element={<DatosEnvioPage />} />
            <Route path="/pasarela-pago" element={<PasarelaPago />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />

      </Router>
    </div>
  );
}

export default App;
