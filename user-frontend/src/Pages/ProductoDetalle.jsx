import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/usuario/productos/${id}`);
        if (!res.ok) throw new Error("Producto no encontrado");
        const data = await res.json();
        setProducto(data);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };
    fetchProducto();
  }, [id]);

  const agregarAlCarrito = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/usuario/carrito/agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productoId: producto.id, cantidad: 1 }),
      });
      if (!res.ok) throw new Error();
      alert("Producto agregado al carrito ✅");
    } catch {
      alert("Error al agregar al carrito ❌");
    }
  };

  if (cargando)
    return <p className="text-center mt-10 animate-pulse">Cargando detalle...</p>;
  if (!producto)
    return <p className="text-center mt-10 text-red-600">Producto no encontrado</p>;

  const { nombre, descripcion, precio, imagen, descuento, categoria } = producto;
  const tieneDescuento = descuento != null;
  const precioFinal = tieneDescuento ? precio - (precio * descuento.porcentaje) / 100 : precio;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-fadeIn">
      <button
        onClick={() => navigate(-1)}
        className="text-indigo-600 text-sm font-semibold hover:underline mb-6"
      >
        ← Volver a productos
      </button>
      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-lg p-6">
        <img
          src={imagen}
          alt={nombre}
          className="w-full md:w-1/2 h-96 object-cover rounded-lg border"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-slate-900">{nombre}</h1>
            <p className="text-sm text-gray-500 mb-4 uppercase">{categoria?.nombre}</p>
            <p className="text-base text-gray-700 leading-relaxed mb-6">{descripcion}</p>
            <div className="mb-6 space-x-2">
              {tieneDescuento ? (
                <>
                  <span className="text-3xl text-red-600 font-bold">S/ {precioFinal.toFixed(2)}</span>
                  <span className="line-through text-gray-400 text-xl">S/ {precio.toFixed(2)}</span>
                  <span className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full">-{descuento.porcentaje}%</span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-800">S/ {precio.toFixed(2)}</span>
              )}
            </div>
          </div>
          <button
            onClick={agregarAlCarrito}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded shadow transition"
          >
            🛒 Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;

