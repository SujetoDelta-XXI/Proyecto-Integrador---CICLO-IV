import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";  // 👉 comentar import

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
      console.log("Respuesta login:", data);

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

  // const handleGoogleSuccess = async (credentialResponse) => {
  //   setError("");
  //   try {
  //     const response = await fetch(
  //       "http://localhost:8080/api/auth/login-google",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ token: credentialResponse.credential }),
  //       }
  //     );
  //     const data = await response.json();
  //     if (response.ok && data.jwt) {
  //       guardarToken(data.jwt);
  //       alert("Login exitoso con Google");
  //       navigate("/");
  //     } else {
  //       setError("Login con Google no autorizado");
  //     }
  //   } catch {
  //     setError("Error al iniciar sesión con Google");
  //   }
  // };

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
        <span className="mb-2 text-gray-500"> {/* O ingresa con Google */} </span>
        {/* 
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError("Error al iniciar sesión con Google")}
          useOneTap={false}
          auto_select={false}
          cancel_on_tap_outside={false}
        />
        */}
      </div>


    </div>
  );
}

export default LoginForm;
