import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!correo || !contraseña) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contraseña }),
      });

      if (response.ok) {
        // Espera un JSON con la información del usuario
        const data = await response.json();

        // Verifica si el backend indica que necesita configurar 2FA
        if (data.necesita2FA) {
          // Redirige a la pantalla de configuración de 2FA
          navigate("/two-factor-setup");
        } else {
          alert("Login exitoso");
          navigate("/");
        }
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (err) {
      alert("Error de conexión con el backend");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 text-left">
      <div className="text-2xl font-normal mb-6 mt-4">EstiloYa</div>
      <h1 className="text-4xl font-bold mb-2">BIENVENIDO/A</h1>
      <p className="text-base text-gray-800 mb-6">
        Inicia sesión con tu correo electrónico o regístrate
      </p>
      <form className="flex flex-col" onSubmit={handleLogin}>
        <label className="block text-base mb-1 mt-4 font-normal">
          Email
          <input
            type="email"
            className="w-full p-2 mt-1 bg-gray-100 text-base border-none rounded-none box-border"
            id="email"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
          />
        </label>
        <label className="block text-base mb-1 mt-4 font-normal">
          Contraseña
          <input
            type="password"
            className="w-full p-2 mt-1 bg-gray-100 text-base border-none rounded-none box-border"
            id="password"
            value={contraseña}
            onChange={e => setContraseña(e.target.value)}
          />
        </label>
        <div className="text-right mt-2 mb-4">
          <Link to="/forgot-password" className="text-sm text-gray-800 no-underline">Olvidé mi contraseña</Link>
        </div>
        <button type="submit" className="w-full py-3 text-base rounded-none border border-gray-800 mb-3 cursor-pointer transition-colors duration-200 bg-gray-900 text-white">
          CONTINUAR
        </button>
        <button
          type="button"
          className="w-full py-3 text-base rounded-none border border-gray-800 mb-3 cursor-pointer transition-colors duration-200 bg-white text-gray-800"
          onClick={() => navigate(-1)}
        >
          ATRÁS
        </button>
      </form>
    </div>
  );
}

export default LoginForm;