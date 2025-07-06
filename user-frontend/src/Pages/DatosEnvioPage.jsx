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
    <div className="flex flex-col md:flex-row items-center justify-center p-8 bg-gray-50 min-h-screen transition-all">
      <div className="hidden md:block md:w-1/2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2290/2290822.png"
          alt="Envío"
          className="w-full max-w-sm mx-auto animate-pulse"
        />
      </div>
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-8 transition-all hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">🚚 Datos de Envío</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Dirección</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-600 transition-all"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
              placeholder="Ej: Av. Los Héroes 123"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Teléfono</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-600 transition-all"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
              placeholder="Ej: 987654321"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-all"
          >
            Confirmar Pedido
          </button>
        </form>
      </div>
    </div>
  );
}

export default DatosEnvioPage;

