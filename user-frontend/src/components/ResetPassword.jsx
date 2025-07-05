import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ResetPassword() {
  const [codigo, setCodigo] = useState("");
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Leer el token de la URL al cargar el componente
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      setCodigo(token);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!codigo || !nuevaContraseña || !confirmarContraseña) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    if (nuevaContraseña !== confirmarContraseña) {
      setError("Las contraseñas no coinciden.");
      return;
    }

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
        setExito(true);
      } else {
        setError("El código es inválido o ha expirado.");
      }
    } catch  {
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 text-left">
      <div className="text-2xl font-normal mb-6 mt-4">EstiloYa</div>
      <h1 className="text-3xl font-bold mb-2">Restablecer contraseña</h1>
      <p className="text-base text-gray-800 mb-6">
        Ingresa el código que recibiste en tu correo y tu nueva contraseña.
      </p>
      {!exito ? (
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="block text-base mb-1 mt-4 font-normal">
            Código de verificación
            <input
              type="text"
              className="w-full p-2 mt-1 bg-gray-100 text-base border-none rounded-none box-border"
              value={codigo}
              onChange={e => setCodigo(e.target.value)}
              required
            />
          </label>
          <label className="block text-base mb-1 mt-4 font-normal">
            Nueva contraseña
            <input
              type="password"
              className="w-full p-2 mt-1 bg-gray-100 text-base border-none rounded-none box-border"
              value={nuevaContraseña}
              onChange={e => setNuevaContraseña(e.target.value)}
              required
            />
          </label>
          <label className="block text-base mb-1 mt-4 font-normal">
            Confirmar contraseña
            <input
              type="password"
              className="w-full p-2 mt-1 bg-gray-100 text-base border-none rounded-none box-border"
              value={confirmarContraseña}
              onChange={e => setConfirmarContraseña(e.target.value)}
              required
            />
          </label>
          {error && (
            <div className="text-red-600 text-sm mt-2 mb-2">{error}</div>
          )}
          <button
            type="submit"
            className="w-full py-3 text-base rounded-none border border-gray-800 mb-3 cursor-pointer transition-colors duration-200 bg-gray-900 text-white mt-6"
          >
            CAMBIAR CONTRASEÑA
          </button>
          <button
            type="button"
            className="w-full py-3 text-base rounded-none border border-gray-800 mb-3 cursor-pointer transition-colors duration-200 bg-white text-gray-800"
            onClick={() => navigate("/loginForm")}
          >
            Cancelar
          </button>
        </form>
      ) : (
        <div className="mt-8">
          <div className="text-green-700 text-lg font-semibold mb-4">
            ¡Contraseña restablecida correctamente!
          </div>
          <button
            type="button"
            className="w-full py-3 text-base rounded-none border border-gray-800 mt-6 cursor-pointer transition-colors duration-200 bg-white text-gray-800"
            onClick={() => navigate("/loginForm")}
          >
            Volver al inicio de sesión
          </button>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;