import React, { useEffect, useState } from "react";

function TwoFactorSetup({ metodos, onSuccess, onCancel, registrarCorreoForzado }) {
  const [metodo, setMetodo] = useState("");
  const [correoAlt, setCorreoAlt] = useState("");
  const [codigo, setCodigo] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  // PASO 1: elegir método por defecto
  useEffect(() => {
    if (metodos.sms) setMetodo("sms");
    if (metodos.correo && !metodos.sms) setMetodo("correo");
  }, [metodos]);

  // PASO 2: si elige correo alternativo y ya está registrado, enviar automáticamente
  useEffect(() => {
    if (metodo === "correo" && metodos.correo && !enviado) {
      handleEnviarCodigo(); // autoenvío
    }
  }, [metodo, metodos.correo, enviado]);

  const handleRegistrarCorreo = async () => {
    setCargando(true);
    setMensaje("");

    try {
      const res = await fetch(
        `http://localhost:8080/api/auth/2fa/register-email?alternativo=${correoAlt}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("tokenTemporal"),
          },
        }
      );

      if (res.ok) {
       setMensaje("Correo registrado correctamente, elige método de verificación.");
  // forzar recarga
  window.location.href = "/two-factor-setup";
      } else {
        const text = await res.text();
        setMensaje("Error al registrar: " + text);
      }
    } catch (err) {
      setMensaje("Error: " + err.message);
    }
    setCargando(false);
  };

  const handleEnviarCodigo = async () => {
    setCargando(true);
    setMensaje("");
    try {
      const res = await fetch(
        `http://localhost:8080/api/auth/2fa/send-code?metodo=${metodo}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("tokenTemporal"),
          },
        }
      );

      if (res.ok) {
        setEnviado(true);
        setMensaje("Código enviado correctamente.");
      } else {
        const text = await res.text();
        setMensaje("Error al enviar: " + text);
      }
    } catch (err) {
      setMensaje("Error: " + err.message);
    }
    setCargando(false);
  };

  const handleVerificar = async () => {
    setCargando(true);
    setMensaje("");
    
    try {
      const res = await fetch(
        `http://localhost:8080/api/auth/login/verify-2fa?code=${codigo}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("tokenTemporal"),
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        sessionStorage.removeItem("tokenTemporal");
        onSuccess();
      } else {
        const text = await res.text();
        setMensaje("Código inválido: " + text);
      }
    } catch (err) {
      setMensaje("Error: " + err.message);
    }
    setCargando(false);
  };

  // PASO 1: registro correo
  if (registrarCorreoForzado) {
    return (
      <div className="container mt-5">
        <h3>Configurar verificación 2FA</h3>
        <p>Ingresa tu correo alternativo:</p>
        <input
          type="email"
          className="form-control my-2"
          value={correoAlt}
          onChange={(e) => setCorreoAlt(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={handleRegistrarCorreo}
          disabled={cargando}
        >
          Registrar correo
        </button>
        {mensaje && <div className="alert alert-info mt-2">{mensaje}</div>}
      </div>
    );
  }

  // PASO 2: elegir método
  return (
    <div className="container mt-5">
      <h3>Verificación 2FA</h3>

      <div className="mb-3">
        <label>Método de verificación:</label>
        <select
          className="form-select"
          value={metodo}
          onChange={(e) => {
            setMetodo(e.target.value);
            setEnviado(false); // resetear si cambia
          }}
        >
          {metodos.sms && <option value="sms">SMS</option>}
          {metodos.correo && <option value="correo">Correo alternativo</option>}
        </select>
      </div>

      {/* PASO 3: envío y verificación */}
      {metodo === "sms" && !enviado && (
        <button
          className="btn btn-warning"
          onClick={handleEnviarCodigo}
          disabled={cargando}
        >
          Enviar código
        </button>
      )}

      {enviado && (
        <>
          <input
            type="text"
            className="form-control my-3"
            placeholder="Código recibido"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <button
            className="btn btn-success"
            onClick={handleVerificar}
            disabled={cargando}
          >
            Verificar código
          </button>
        </>
      )}

      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
      <button className="btn btn-link mt-3" onClick={onCancel}>
        Cancelar
      </button>
    </div>
  );
}

export default TwoFactorSetup;

