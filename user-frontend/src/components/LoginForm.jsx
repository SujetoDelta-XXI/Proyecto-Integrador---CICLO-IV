import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TwoFactorSetup from "./TwoFactorSetup";
import TwoFactorRegister from "./TwoFactorRegister";
import { GoogleLogin } from "@react-oauth/google";

function LoginForm() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [show2FA, setShow2FA] = useState(false);
  const [showRegister2FA, setShowRegister2FA] = useState(false);
  const [metodos2FA, setMetodos2FA] = useState({});
  const [correo2FA, setCorreo2FA] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Login tradicional
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
        const data = await response.json();

        if (data.requiere2FA) {
          setCorreo2FA(data.correo);
          setMetodos2FA(data.metodos);

          // Si no hay métodos disponibles, mostrar registro de correo alternativo
          if (!data.metodos.correo) {
            setShowRegister2FA(true);
          } else {
            setShow2FA(true);
          }
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

  // Login con Google
  const handleGoogleSuccess = async (credentialResponse) => {
    setError("");
    try {
      const response = await fetch("http://localhost:8080/api/usuarios/login-google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await response.json();

      if (response.ok && data.usuario && data.correo.endsWith("@tecsup.edu.pe")) {
        // Si requiere 2FA, sigue el mismo flujo
        if (data.requiere2FA) {
          setCorreo2FA(data.correo);
          setMetodos2FA(data.metodos);
          if (!data.metodos.correo) {
            setShowRegister2FA(true);
          } else {
            setShow2FA(true);
          }
        } else {
          alert("Login exitoso con Google");
          navigate("/");
        }
      } else {
        setError(data.message || "Solo se permiten cuentas de TECSUP");
      }
    } catch  {
      setError("Error al iniciar sesión con Google");
    }
  };

  // Si el usuario debe registrar correo alternativo
  if (showRegister2FA) {
    return (
      <TwoFactorRegister
        correo={correo2FA}
        onSuccess={async () => {
          // Vuelve a consultar los métodos disponibles tras registrar el alternativo
          const response = await fetch("http://localhost:8080/api/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo: correo2FA, contraseña }),
          });
          if (response.ok) {
            const data = await response.json();
            setMetodos2FA(data.metodos);
            setShowRegister2FA(false);
            setShow2FA(true);
          }
        }}
        onCancel={() => {
          setShowRegister2FA(false);
          setCorreo("");
          setContraseña("");
        }}
      />
    );
  }

  // Si el usuario debe hacer 2FA
  if (show2FA) {
    return (
      <TwoFactorSetup
        correo={correo2FA}
        metodos={metodos2FA}
        onSuccess={() => {
          alert("Login exitoso con 2FA");
          navigate("/");
        }}
        onCancel={() => {
          setShow2FA(false);
          setCorreo("");
          setContraseña("");
        }}
      />
    );
  }

  // Formulario de login normal + Google
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

      <div className="my-4 flex flex-col items-center">
        <span className="mb-2 text-gray-500">O ingresa con Google</span>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError("Error al iniciar sesión con Google")}
          useOneTap
        />
      </div>

      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}

export default LoginForm;