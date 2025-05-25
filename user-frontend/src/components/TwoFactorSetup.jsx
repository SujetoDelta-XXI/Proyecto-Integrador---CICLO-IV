import React, { useState } from "react";

function TwoFactorSetup({ onComplete }) {
  const [telefono, setTelefono] = useState("");
  const [correoAlternativo, setCorreoAlternativo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aquí puedes validar los campos como prefieras
    if (!telefono && !correoAlternativo) {
      setMensaje("Debes ingresar al menos un dato.");
      return;
    }

    // Llama a tu backend para guardar el dato
    try {
      const response = await fetch("http://localhost:8080/api/usuarios/2fa-setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telefono, correoAlternativo }),
      });

      if (response.ok) {
        setMensaje("¡Datos guardados correctamente!");
        // Llama a la función para continuar el flujo normal
        onComplete();
      } else {
        setMensaje("Error al guardar los datos.");
      }
    } catch (err) {
      setMensaje("Error de conexión.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Configura tu autenticación de dos pasos</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Número de teléfono (opcional)
          <input
            type="tel"
            className="w-full p-2 border rounded"
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
          />
        </label>
        <label>
          Correo electrónico alternativo (opcional)
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={correoAlternativo}
            onChange={e => setCorreoAlternativo(e.target.value)}
          />
        </label>
        <button type="submit" className="bg-indigo-600 text-white py-2 rounded">
          Guardar
        </button>
        {mensaje && <div className="text-red-500">{mensaje}</div>}
      </form>
    </div>
  );
}

export default TwoFactorSetup;