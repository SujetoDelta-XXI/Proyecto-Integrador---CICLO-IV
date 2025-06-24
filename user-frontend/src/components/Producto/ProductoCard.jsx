import React from "react";
import { useNavigate } from "react-router-dom";

function ProductoCard({ producto }) {
  const navigate = useNavigate();
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
      if (!res.ok) throw new Error("Error al agregar al carrito");
      alert("Producto agregado al carrito ✅");
    } catch (err) {
      console.error(err);
      alert("Error al agregar al carrito ❌");
    }
  };

  return (
    <div className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition hover:scale-[1.02] bg-white">
      <div className="relative">
        {tieneDescuento && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
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
          className="text-xl font-semibold cursor-pointer hover:underline"
          onClick={() => navigate(`/producto/${id}`)}
        >
          {nombre}
        </h3>
        <p className="text-gray-600 text-sm">{categoria}</p>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{descripcion}</p>
        <div className="mt-2">
          {tieneDescuento ? (
            <>
              <span className="text-red-600 font-bold text-lg mr-2">S/ {precioFinal.toFixed(2)}</span>
              <span className="line-through text-gray-500 text-sm">S/ {precio.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-gray-800 font-semibold text-lg">S/ {precio.toFixed(2)}</span>
          )}
        </div>
        <button
          className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          onClick={agregarAlCarrito}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductoCard;


