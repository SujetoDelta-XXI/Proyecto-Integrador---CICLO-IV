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
        const res = await fetch(
          `http://localhost:8080/api/usuario/productos/${id}`
        );
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
      const res = await fetch(
        "http://localhost:8080/api/usuario/carrito/agregar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productoId: producto.id, cantidad: 1 }),
        }
      );
      if (!res.ok) throw new Error("Error al agregar al carrito");
      alert("Producto agregado al carrito ✅");
    } catch (err) {
      console.error(err);
      alert("Error al agregar al carrito ❌");
    }
  };

  if (cargando) return <p className="text-center mt-10 animate-pulse">Cargando detalle...</p>;
  if (!producto)
    return (
      <p className="text-center mt-10 text-red-600">Producto no encontrado</p>
    );

  const { nombre, descripcion, precio, imagen, descuento, categoria } =
    producto;
  const tieneDescuento = descuento != null;
  const porcentaje = tieneDescuento ? descuento.porcentaje : 0;
  const precioFinal = tieneDescuento
    ? precio - (precio * porcentaje) / 100
    : precio;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
      >
        ← Volver a productos
      </button>

      <div className="flex flex-col md:flex-row gap-10 bg-white shadow-xl rounded-xl p-6">
        <img
          src={imagen}
          alt={nombre}
          className="w-full md:w-1/2 h-96 object-cover rounded-lg border border-gray-200"
        />

        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight leading-snug">
              {nombre}
            </h1>
            <p className="text-sm text-gray-500 mb-4 uppercase tracking-wide">
              {categoria?.nombre}
            </p>
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              {descripcion}
            </p>

            <div className="mb-6">
              {tieneDescuento ? (
                <div className="space-x-2">
                  <span className="text-red-600 text-3xl font-bold">
                    S/ {precioFinal.toFixed(2)}
                  </span>
                  <span className="line-through text-gray-400 text-xl">
                    S/ {precio.toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full">
                    -{porcentaje}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-gray-800 text-3xl font-bold">
                  S/ {precio.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={agregarAlCarrito}
            className="mt-auto bg-gradient-to-r from-black to-gray-800 text-white text-lg py-3 rounded-xl hover:scale-105 transform transition-all shadow-md"
          >
            🛒 Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;

