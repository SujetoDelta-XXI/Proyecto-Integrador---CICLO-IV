// src/pages/Setup2faMethodPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Setup2faMethodPage() {
  const [correoAlternativo, setCorreoAlternativo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleGuardarCorreo = async () => {
    setCargando(true);
    setMensaje("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No estás autenticado.");
        navigate("/login");
        return;
      }

      const params = new URLSearchParams();
      params.append("alternativo", correoAlternativo);

      const resp = await fetch("http://localhost:8080/api/auth/2fa/register-email", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text);
      }

      // ✅ Redirigir a la pantalla de verificación
      navigate("/two-factor-setup");
    } catch (err) {
      setMensaje(err.message || "Error al registrar correo alternativo.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Configurar verificación en dos pasos</h2>
      <p className="mb-4">
        Para activar la verificación en dos pasos, necesitas registrar un correo alternativo donde recibirás los códigos.
      </p>
      <label className="block mb-2">
        Correo alternativo:
        <input
          type="email"
          value={correoAlternativo}
          onChange={(e) => setCorreoAlternativo(e.target.value)}
          className="w-full p-2 mt-1 border rounded"
          disabled={cargando}
        />
      </label>
      {mensaje && <div className="text-red-500 mb-2">{mensaje}</div>}
      <button
        className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        onClick={handleGuardarCorreo}
        disabled={cargando || !correoAlternativo}
      >
        {cargando ? "Guardando..." : "Guardar y continuar"}
      </button>
    </div>
  );
}

export default Setup2faMethodPage;
