import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [correo, setCorreo] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    if (!correo) {
      alert("Por favor, ingresa tu correo electrónico.");
      setCargando(false);
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/api/usuarios/recuperar-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo }),
      });
      if (response.ok) {
        setEnviado(true);
      } else {
        setError("Ocurrió un error. Intenta nuevamente.");
      }
    } catch  {
      setError("Error de conexión con el servidor.");
    }
    setCargando(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 text-left">
      <div className="text-2xl font-normal mb-6 mt-4">EstiloYa</div>
      <h1 className="text-3xl font-bold mb-2">¿Olvidaste tu contraseña?</h1>
      <p className="text-base text-gray-800 mb-6">
        Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
      </p>
      {!enviado ? (
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="block text-base mb-1 mt-4 font-normal">
            Email
            <input
              type="email"
              className="w-full p-2 mt-1 bg-gray-100 text-base border-none rounded-none box-border"
              id="email"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
              required
              disabled={cargando}
            />
          </label>
          {cargando && (
            <div className="flex items-center justify-center my-4">
              <svg className="animate-spin h-6 w-6 text-gray-800 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              <span>Espere un momento...</span>
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 text-base rounded-none border border-gray-800 mb-3 cursor-pointer transition-colors duration-200 bg-gray-900 text-white mt-6"
            disabled={cargando}
          >
            ENVIAR ENLACE
          </button>
          <button
            type="button"
            className="w-full py-3 text-base rounded-none border border-gray-800 mb-3 cursor-pointer transition-colors duration-200 bg-white text-gray-800"
            onClick={() => navigate(-1)}
            disabled={cargando}
          >
            ATRÁS
          </button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      ) : (
        <div className="mt-8">
          <div className="text-green-700 text-lg font-semibold mb-4">
            ¡Listo!
          </div>
          <p className="text-base text-gray-800">
            Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.
          </p>
          <button
            type="button"
            className="w-full py-3 text-base rounded-none border border-gray-800 mt-6 cursor-pointer transition-colors duration-200 bg-gray-900 text-white"
            onClick={() => navigate("/reset-password")}
          >
            Restablecer contraseña
          </button>
          <button
            type="button"
            className="w-full py-3 text-base rounded-none border border-gray-800 mt-3 cursor-pointer transition-colors duration-200 bg-white text-gray-800"
            onClick={() => navigate("/loginForm")}
          >
            Volver al inicio de sesión
          </button>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;