import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
  const [codigo, setCodigo] = useState("");
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      setCodigo(token);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!codigo || !nuevaContraseña || !confirmarContraseña) {
      toast.warn("Por favor completa todos los campos");
      return;
    }
    if (nuevaContraseña !== confirmarContraseña) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    setCargando(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: codigo,
          nuevaContraseña: nuevaContraseña
        }),
      });
      if (response.ok) {
        toast.success("¡Contraseña restablecida correctamente!");
        navigate("/loginForm");
      } else {
        toast.error("El código es inválido o ha expirado.");
      }
    } catch {
      toast.error("Error de conexión con el servidor.");
    }
    setCargando(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Restablecer contraseña</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Código de verificación"
            className="border rounded px-3 py-2 focus:ring focus:ring-indigo-200"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Nueva contraseña"
            className="border rounded px-3 py-2 focus:ring focus:ring-indigo-200"
            value={nuevaContraseña}
            onChange={(e) => setNuevaContraseña(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar nueva contraseña"
            className="border rounded px-3 py-2 focus:ring focus:ring-indigo-200"
            value={confirmarContraseña}
            onChange={(e) => setConfirmarContraseña(e.target.value)}
            required
          />
          <button
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            type="submit"
            disabled={cargando}
          >
            {cargando ? "Cambiando..." : "Cambiar Contraseña"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/loginForm")}
            className="border border-gray-700 py-2 rounded hover:bg-gray-700 hover:text-white transition"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
