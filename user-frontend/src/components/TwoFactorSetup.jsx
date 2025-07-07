import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function TwoFactorSetup({ metodos, onSuccess, onCancel, registrarCorreoForzado }) {
  const [metodo, setMetodo] = useState("");
  const [correoAlt, setCorreoAlt] = useState("");
  const [codigo, setCodigo] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
  if (metodos.correo) setMetodo("correo");
}, [metodos]);


  // PASO 2: autoenviar si correo alternativo ya está registrado
  useEffect(() => {
    if (metodo === "correo" && metodos.correo && !enviado) {
      handleEnviarCodigo();
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
          headers: { Authorization: "Bearer " + sessionStorage.getItem("tokenTemporal") },
        }
      );
      if (res.ok) {
        setMensaje("Correo registrado correctamente, elige método de verificación.");
        window.location.href = "/two-factor-setup"; // recargar para forzar
        toast.success("Correo registrado correctamente, elige método de verificación.");
        window.location.href = "/two-factor-setup";
      } else {
        const text = await res.text();
        toast.error("Error al registrar: " + text);
      }
    } catch (err) {
      toast.error("Error: " + err.message);
    }
    setCargando(false);
  };

  const handleEnviarCodigo = async () => {
    setCargando(true);
    try {
      const res = await fetch(
        `http://localhost:8080/api/auth/2fa/send-code?metodo=${metodo}`,
        {
          method: "POST",
          headers: { Authorization: "Bearer " + sessionStorage.getItem("tokenTemporal") },
        }
      );
      if (res.ok) {
        setEnviado(true);
        toast.success("Código enviado correctamente.");
      } else {
        const text = await res.text();
        toast.error("Error al enviar: " + text);
      }
    } catch (err) {
      toast.error("Error: " + err.message);
    }
    setCargando(false);
  };

  const handleVerificar = async () => {
    if (!codigo || codigo.trim() === "") {
      setMensaje("Por favor ingresa el código recibido.");
      return;
    }

    setCargando(true);
    setMensaje("");
    try {
      const res = await fetch(
        `http://localhost:8080/api/auth/login/verify-2fa?code=${codigo}`,
        {
          method: "POST",
          headers: { Authorization: "Bearer " + sessionStorage.getItem("tokenTemporal") },
        }
      );
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        sessionStorage.removeItem("tokenTemporal");
        toast.success("Código verificado correctamente");
        onSuccess();
      } else {
        const text = await res.text();
        toast.error("Código inválido: " + text);
      }
    } catch (err) {
      toast.error("Error: " + err.message);
    }
    setCargando(false);
  };

  // PASO 1: registrar correo alternativo
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
            setEnviado(false);
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
  return (
  <div className="min-h-[70vh] flex items-center justify-center px-4">
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md transition-all">
      {registrarCorreoForzado ? (
        <>
          <h3 className="text-2xl font-bold mb-4 text-center">Configura tu 2FA</h3>
          <p className="text-gray-700 text-center mb-4">Ingresa tu correo alternativo</p>
          <input
            type="text"
            className="form-control my-3"
            placeholder="Código recibido"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            maxLength={6}
            type="email"
            className="w-full border rounded px-3 py-2 mb-4 focus:ring focus:ring-indigo-300"
            value={correoAlt}
            onChange={(e) => setCorreoAlt(e.target.value)}
            placeholder="tuemail@ejemplo.com"
          />
          <button
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
            onClick={handleRegistrarCorreo}
            disabled={cargando}
          >
            {cargando ? "Registrando..." : "Registrar Correo"}
          </button>
        </>
      ) : (
        <>
          {!enviado ? (
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold mb-2 text-indigo-700">Enviando código de verificación a tu correo...</h3>
              <div className="flex justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-dotted rounded-full animate-spin"></div>
              </div>
              <p className="text-gray-600 text-sm">Por favor espera unos segundos.</p>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold mb-4 text-center">Ingresa tu código 2FA</h3>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mb-4 focus:ring focus:ring-indigo-300"
                placeholder="Código recibido"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
              <button
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition mb-4"
                onClick={handleVerificar}
                disabled={cargando}
              >
                {cargando ? "Verificando..." : "Verificar Código"}
              </button>
              <button
                className="block mx-auto mt-4 text-sm text-gray-500 hover:text-red-500 transition"
                onClick={onCancel}
              >
                Cancelar
              </button>
            </>
          )}
        </>
      )}
    </div>
  </div>
);

}

export default TwoFactorSetup;
