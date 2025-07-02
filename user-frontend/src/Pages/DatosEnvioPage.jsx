import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DatosEnvioPage() {
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/stripe/crear-intento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          direccion,
          telefono,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      navigate("/pasarela-pago", { state: { clientSecret: data.clientSecret } });

    } catch (error) {
      console.error("Error al crear intento de pago:", error);
      alert("No se pudo procesar el pedido, revisa tu carrito.");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Datos de Envío</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Dirección:</label>
          <input
            type="text"
            className="form-control"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Teléfono:</label>
          <input
            type="text"
            className="form-control"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Confirmar pedido
        </button>
      </form>
    </div>
  );
}

export default DatosEnvioPage;
