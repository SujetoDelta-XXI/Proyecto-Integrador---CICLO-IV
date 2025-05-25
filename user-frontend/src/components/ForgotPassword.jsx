import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [correo, setCorreo] = useState("");
  const [enviado, setEnviado] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!correo) {
      alert("Por favor, ingresa tu correo electrónico.");
      return;
    }
    // Aquí iría la llamada real al backend para enviar el correo de recuperación
    setEnviado(true);
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
            />
          </label>
          <button
            type="submit"
            className="w-full py-3 text-base rounded-none border border-gray-800 mb-3 cursor-pointer transition-colors duration-200 bg-gray-900 text-white mt-6"
          >
            ENVIAR ENLACE
          </button>
          <button
            type="button"
            className="w-full py-3 text-base rounded-none border border-gray-800 mb-3 cursor-pointer transition-colors duration-200 bg-white text-gray-800"
            onClick={() => navigate(-1)}
          >
            ATRÁS
          </button>
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