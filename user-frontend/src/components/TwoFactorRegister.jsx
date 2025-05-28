import React, { useState } from "react";

function TwoFactorRegister({ correo, onSuccess, onCancel }) {
  const [correoAlternativo, setCorreoAlternativo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!correoAlternativo) {
      setMensaje("Debes ingresar un correo alternativo.");
      return;
    }

    setCargando(true);
    try {
      const response = await fetch("http://localhost:8080/api/usuarios/2fa-setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, correoAlternativo }),
      });

      if (response.ok) {
        setMensaje("¡Correo alternativo guardado correctamente!");
        setTimeout(() => {
          setMensaje("");
          onSuccess();
        }, 1000);
      } else {
        setMensaje("Error al guardar el correo alternativo.");
      }
    } catch {
      setMensaje("Error de conexión.");
    }
    setCargando(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Configura tu autenticación de dos pasos</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Correo electrónico alternativo
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={correoAlternativo}
            onChange={e => setCorreoAlternativo(e.target.value)}
            disabled={cargando}
          />
        </label>
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 rounded"
          disabled={cargando}
        >
          {cargando ? "Guardando..." : "Guardar"}
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
    </div>
  );
}

export default TwoFactorRegister;