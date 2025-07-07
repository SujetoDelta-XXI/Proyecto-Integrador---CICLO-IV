import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const [correo, setCorreo] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    if (!correo) {
      toast.warn("Por favor, ingresa tu correo electrónico.");
      setCargando(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo }),
      });

      if (response.ok) {
        setEnviado(true);
        toast.success("Hemos enviado el enlace a tu correo.");
      } else {
        toast.error("Ocurrió un error, intenta nuevamente.");
      }
    } catch {
      toast.error("Error de conexión con el servidor.");
    }
    setCargando(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">¿Olvidaste tu contraseña?</h1>
        {!enviado ? (
          <>
            <p className="text-sm text-gray-600 text-center mb-6">
              Te enviaremos un enlace para restablecerla
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="correo@tecsup.edu.pe"
                className="border rounded px-3 py-2 focus:ring focus:ring-indigo-200"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                disabled={cargando}
              />
              <button
                className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                disabled={cargando}
                type="submit"
              >
                {cargando ? "Enviando..." : "Enviar enlace"}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="border border-gray-700 py-2 rounded hover:bg-gray-700 hover:text-white transition"
                disabled={cargando}
              >
                Atrás
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-semibold mb-4">
              Revisa tu correo para continuar.
            </p>
            <button
              onClick={() => navigate("/loginForm")}
              className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
            >
              Ir al inicio de sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;

