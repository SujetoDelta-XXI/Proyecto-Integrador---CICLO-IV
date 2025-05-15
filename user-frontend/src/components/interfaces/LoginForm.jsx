/*import { Link, useNavigate } from "react-router-dom";
import "../css/LoginForm.css";

function LoginForm() {
  const navigate = useNavigate();

  return (
    <div className="loginform-container">
      <div className="loginform-title">EstiloYa</div>
      <h1 className="loginform-welcome">BIENVENIDO/A</h1>
      <p className="loginform-subtitle">
        Inicia sesión con tu correo electrónico o regístrate
      </p>
      <form className="loginform-form">
        <label>
          Email
          <input type="email" className="loginform-input" id="email" />
        </label>
        <label>
          Contraseña
          <input type="password" className="loginform-input" id="password" />
        </label>  
        <div className="loginform-forgot">
          <Link to="/forgot-password">Olvidé mi contraseña</Link>
        </div>
        <button type="submit" className="loginform-btn black">
          CONTINUAR
        </button>
        <button
          type="button"
          className="loginform-btn white"
          onClick={() => navigate(-1)}
        >
          ATRÁS
        </button>
      </form>
    </div>
  );
}

export default LoginForm;*/
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/LoginForm.css";

function LoginForm() {
  const [correo, setCorreo] = useState(""); // <-- Estado para el email
  const [contraseña, setContraseña] = useState(""); // <-- Estado para la contraseña
  const navigate = useNavigate();

  // Nueva función para manejar el submit
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validación simple
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
        alert("Login exitoso");
        // Redirige al index ("/") después de login exitoso
        navigate("/");
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (err) {
      alert("Error de conexión con el backend");
      console.error(err);
    }
  };

  return (
    <div className="loginform-container">
      <div className="loginform-title">EstiloYa</div>
      <h1 className="loginform-welcome">BIENVENIDO/A</h1>
      <p className="loginform-subtitle">
        Inicia sesión con tu correo electrónico o regístrate
      </p>
      <form className="loginform-form" onSubmit={handleLogin}> {/* <-- Cambia el onSubmit */}
        <label>
          Email
          <input
            type="email"
            className="loginform-input"
            id="email"
            value={correo} // <-- Input controlado
            onChange={e => setCorreo(e.target.value)}
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            className="loginform-input"
            id="password"
            value={contraseña} // <-- Input controlado
            onChange={e => setContraseña(e.target.value)}
          />
        </label>
        <div className="loginform-forgot">
          <Link to="/forgot-password">Olvidé mi contraseña</Link>
        </div>
        <button type="submit" className="loginform-btn black">
          CONTINUAR
        </button>
        <button
          type="button"
          className="loginform-btn white"
          onClick={() => navigate(-1)}
        >
          ATRÁS
        </button>
      </form>
    </div>
  );
}

export default LoginForm;