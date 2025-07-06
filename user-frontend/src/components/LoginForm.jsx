import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const guardarToken = (jwt) => {
    if (jwt) {
      localStorage.setItem("token", jwt);
    } else {
      alert("No se recibió token JWT");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contraseña }),
      });
      if (!resp.ok) {
        const mensaje = await resp.text();
        alert("Credenciales incorrectas: " + mensaje);
        return;
      }
      const data = await resp.json();
      if (data.requiere2FA) {
        sessionStorage.setItem("tokenTemporal", data.jwt);
        navigate("/two-factor-setup");
        return;
      }
      guardarToken(data.jwt);
      alert("Login exitoso");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error de conexión");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sección izquierda (formulario) */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="max-w-md w-full space-y-6 animate-fadeIn">
          <h2 className="text-3xl font-bold text-center">Bienvenido/a a EstiloYa</h2>
          <p className="text-center text-gray-600">Inicia sesión o crea tu cuenta</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Correo electrónico</label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Contraseña</label>
              <input
                type="password"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="text-right text-sm">
              <Link to="/forgot-password" className="text-indigo-600 hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Continuar
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full py-3 rounded border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition"
            >
              Atrás
            </button>
          </form>
        </div>
      </div>

      {/* Sección derecha (imagen) */}
      <div className="hidden md:block w-1/2">
        <img
          src="https://3453376.fs1.hubspotusercontent-na1.net/hubfs/3453376/AdobeStock_602069201.jpeg"
          alt="EstiloYa login background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default LoginForm;

