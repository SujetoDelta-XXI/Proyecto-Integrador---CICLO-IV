import React, { useState, useEffect } from "react";

function TwoFactorSetup({ correo, metodos, onSuccess, onCancel }) {
  // Loader con Tailwind
  const Loader = () => (
    <div className="flex justify-center items-center my-4">
      <svg className="animate-spin h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
      <span className="ml-2 text-indigo-600">Enviando código...</span>
    </div>
  );

  // Determina el método por defecto según lo que esté disponible
  const metodoDefault = metodos.sms
    ? "sms"
    : metodos.correo
    ? "correo"
    : "";

  const [metodo, setMetodo] = useState(metodoDefault);
  const [codigo, setCodigo] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  // Si cambian los métodos disponibles, actualiza el método por defecto
  useEffect(() => {
    if (metodos.sms) setMetodo("sms");
    else if (metodos.correo) setMetodo("correo");
    else setMetodo("");
  }, [metodos]);

  const handleEnviarCodigo = async () => {
    setCargando(true);
    setMensaje("");
    try {
      const response = await fetch("http://localhost:8080/api/usuarios/enviar-codigo-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, metodo }),
      });
      if (response.ok) {
        setEnviado(true);
        setMensaje(
          "Código enviado. Revisa tu " +
            (metodo === "sms" ? "teléfono" : "correo alternativo") +
            "."
        );
      } else {
        setMensaje("Error al enviar el código.");
      }
    } catch {
      setMensaje("Error de conexión.");
    }
    setCargando(false);
  };

  const handleVerificarCodigo = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje("");
    try {
      const response = await fetch("http://localhost:8080/api/usuarios/verificar-codigo-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, code: codigo }),
      });
      if (response.ok) {
        onSuccess();
      } else {
        setMensaje("Código incorrecto o expirado.");
      }
    } catch {
      setMensaje("Error de conexión.");
    }
    setCargando(false);
  };

  // Si no hay métodos disponibles, muestra un mensaje de error
  if (!metodos.sms && !metodos.correo) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Verificación en dos pasos</h2>
        <div className="text-red-500">
          No tienes métodos de autenticación disponibles. Por favor, contacta al soporte.
        </div>
        <button
          className="mt-4 w-full py-2 rounded border border-gray-400"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Verificación en dos pasos</h2>
      {!enviado ? (
        <>
          <p>Elige cómo recibir tu código de verificación:</p>
          <div className="flex flex-col gap-2 my-4">
            {metodos.sms && (
              <label>
                <input
                  type="radio"
                  name="metodo"
                  value="sms"
                  checked={metodo === "sms"}
                  onChange={() => setMetodo("sms")}
                  disabled={cargando}
                />
                {" "}SMS (teléfono registrado)
              </label>
            )}
            {metodos.correo && (
              <label>
                <input
                  type="radio"
                  name="metodo"
                  value="correo"
                  checked={metodo === "correo"}
                  onChange={() => setMetodo("correo")}
                  disabled={cargando}
                />
                {" "}Correo alternativo
              </label>
            )}
          </div>
          {cargando && <Loader />}
          <button
            className="bg-indigo-600 text-white py-2 rounded w-full"
            onClick={handleEnviarCodigo}
            disabled={cargando || !metodo}
          >
            {cargando ? "Enviando..." : "Enviar código"}
          </button>
          <button
            className="mt-2 w-full py-2 rounded border border-gray-400"
            onClick={onCancel}
            disabled={cargando}
          >
            Cancelar
          </button>
          {mensaje && <div className="text-red-500 mt-2">{mensaje}</div>}
        </>
      ) : (
        <form onSubmit={handleVerificarCodigo} className="flex flex-col gap-4">
          <label>
            Ingresa el código recibido:
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={codigo}
              onChange={e => setCodigo(e.target.value)}
              disabled={cargando}
            />
          </label>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded"
            disabled={cargando}
          >
            {cargando ? "Verificando..." : "Verificar código"}
          </button>
          <button
            className="mt-2 w-full py-2 rounded border border-gray-400"
            onClick={onCancel}
            disabled={cargando}
            type="button"
          >
            Cancelar
          </button>
          {mensaje && <div className="text-red-500">{mensaje}</div>}
        </form>
      )}
    </div>
  );
}

export default TwoFactorSetup;