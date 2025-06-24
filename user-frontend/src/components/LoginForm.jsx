// src/components/LoginForm.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function LoginForm() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [codigo2FA, setCodigo2FA] = useState("");
  const [show2FA, setShow2FA] = useState(false);
  const [error, setError] = useState("");
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
    console.log("Respuesta login:", data);

    // Guardar token temporal (para setup o verificación)
    if (data.jwt) {
      localStorage.setItem("token", data.jwt);
    }

    if (data.requires2Fa) {
      if (!data.metodos.correo) {
        // 🔒 Usuario NO tiene correo alternativo → redirigir a configurar
        navigate("/setup-2fa-method");
      } else {
        // ✅ Tiene correo alternativo → mostrar verificación 2FA
        setShow2FA(true);
      }
    } else {
      // 🔓 No requiere 2FA → login exitoso completo
      guardarToken(data.jwt);
      alert("Login exitoso");
      navigate("/");
    }
  } catch (err) {
    console.error(err);
    alert("Error de conexión");
  }
};


  const handleVerify2FA = async () => {
  try {
    const params = new URLSearchParams();
    params.append("code", codigo2FA.trim());

    const resp = await fetch("http://localhost:8080/api/auth/login/verify-2fa", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!resp.ok) {
      const mensaje = await resp.text();
      alert("Código inválido: " + mensaje);
      return;
    }

    const data = await resp.json();
    guardarToken(data.jwt); // ahora sí el token final
    alert("Login exitoso con 2FA");
    navigate("/"); // ✅ ahora sí redirige correctamente
  } catch (err) {
    console.error(err);
    alert("Error al verificar 2FA");
  }
};


  const handleGoogleSuccess = async (credentialResponse) => {
    setError("");
    try {
      const response = await fetch("http://localhost:8080/api/auth/login-google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await response.json();

      if (response.ok && data.jwt) {
        guardarToken(data.jwt);
        alert("Login exitoso con Google");
        navigate("/");
      } else {
        setError("Login con Google no autorizado");
      }
    } catch {
      setError("Error al iniciar sesión con Google");
    }
  };

  // Pantalla de verificación 2FA
  if (show2FA) {
    return (
      <div className="max-w-md mx-auto mt-10 text-left">
        <h2 className="text-xl font-semibold mb-4">Verificación 2FA</h2>
        <label className="block text-base mb-2 font-normal">
          Código 2FA enviado a tu correo
        </label>
        <input
          type="text"
          className="w-full p-2 mb-4 bg-gray-100"
          value={codigo2FA}
          onChange={(e) => setCodigo2FA(e.target.value)}
        />
        <button
          className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          onClick={handleVerify2FA}
        >
          Verificar
        </button>
      </div>
    );
  }

  // Formulario principal de login
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
            className="w-full p-2 mt-1 bg-gray-100"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </label>
        <label className="block text-base mb-1 mt-4 font-normal">
          Contraseña
          <input
            type="password"
            className="w-full p-2 mt-1 bg-gray-100"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
        </label>
        <div className="text-right mt-2 mb-4">
          <Link to="/forgot-password" className="text-sm text-gray-800">
            Olvidé mi contraseña
          </Link>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gray-900 text-white border border-gray-800 mb-3"
        >
          CONTINUAR
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full py-3 bg-white text-gray-800 border border-gray-800"
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
