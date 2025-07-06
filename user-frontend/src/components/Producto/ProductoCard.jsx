import React from "react";
import { useCarrito } from "../../context/CarritoContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProductoCard({ producto }) {
  const navigate = useNavigate();
  const { actualizarCarrito } = useCarrito();
  const { id, nombre, descripcion, precio, imagen, categoria, descuento } = producto;

  const tieneDescuento = descuento && descuento.porcentaje > 0;
  const precioFinal = tieneDescuento
    ? precio - (precio * descuento.porcentaje) / 100
    : precio;

  const agregarAlCarrito = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/usuario/carrito/agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productoId: id, cantidad: 1 }),
      });
      if (!res.ok) throw new Error();
      toast.success("✅ Producto agregado al carrito");
      await actualizarCarrito();   // 👈 recuenta el carrito del contexto

    } catch {
      toast.error("❌ Error al agregar al carrito");
    }
  };

  return (
    <div className="border rounded-xl overflow-hidden shadow hover:shadow-xl transition hover:scale-105 bg-white">
      <div className="relative">
        {tieneDescuento && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
            -{descuento.porcentaje}%
          </span>
        )}
        <img
          src={imagen}
          alt={nombre}
          className="w-full h-56 object-cover cursor-pointer"
          onClick={() => navigate(`/producto/${id}`)}
        />
      </div>
      <div className="p-4">
        <h3
          className="text-lg font-bold text-slate-800 hover:underline cursor-pointer"
          onClick={() => navigate(`/producto/${id}`)}
        >
          {nombre}
        </h3>
        <p className="text-gray-500 text-xs mb-2">{categoria}</p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{descripcion}</p>
        <div>
          {tieneDescuento ? (
            <>
              <span className="text-red-600 font-bold text-lg mr-2">S/ {precioFinal.toFixed(2)}</span>
              <span className="line-through text-gray-400 text-sm">S/ {precio.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-gray-800 font-semibold text-lg">S/ {precio.toFixed(2)}</span>
          )}
        </div>
        <button
          onClick={agregarAlCarrito}
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition"
        >
          🛒 Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductoCard;




