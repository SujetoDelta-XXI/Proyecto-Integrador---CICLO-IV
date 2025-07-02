// CarritoPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CarritoPage() {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    cargarCarrito();
  }, []);

  const cargarCarrito = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/usuario/carrito", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setCarrito(data);
      calcularTotal(data);
    } catch (error) {
      console.error("Error al cargar el carrito", error);
    }
  };

  const calcularTotal = (items) => {
    const total = items.reduce((acc, item) => {
      const precioFinal = item.precio * (1 - (item.descuento || 0) / 100);
      return acc + precioFinal * item.cantidad;
    }, 0);
    setTotal(total);
  };

  const actualizarCantidad = async (productoId, cantidad) => {
    try {
      await fetch("http://localhost:8080/api/usuario/carrito/actualizar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productoId, cantidad }),
      });
      cargarCarrito();
    } catch (error) {
      console.error("Error al actualizar cantidad", error);
    }
  };

  const eliminarItem = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/usuario/carrito/eliminar/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      cargarCarrito();
    } catch (error) {
      console.error("Error al eliminar item", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-2xl font-bold mb-4">Tu Carrito</h2>
      <table className="table-auto w-full text-left border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Producto</th>
            <th className="px-4 py-2">Precio</th>
            <th className="px-4 py-2">Cantidad</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item) => {
            const precioFinal = item.precio * (1 - (item.descuento || 0) / 100);
            return (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">
                  <img src={item.imagen} alt={item.nombre} className="w-16 h-16" />
                  <p>{item.nombre}</p>
                </td>
                <td className="px-4 py-2">
                  S/{precioFinal.toFixed(2)}
                  {item.descuento > 0 && (
                    <span className="text-red-500 text-sm line-through ml-2">
                      S/{item.precio.toFixed(2)} -{item.descuento}%
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => actualizarCantidad(item.productoId, item.cantidad - 1)} disabled={item.cantidad <= 1}>
                    -
                  </button>
                  <span className="mx-2">{item.cantidad}</span>
                  <button onClick={() => actualizarCantidad(item.productoId, item.cantidad + 1)}>+</button>
                </td>
                <td className="px-4 py-2">S/{(precioFinal * item.cantidad).toFixed(2)}</td>
                <td className="px-4 py-2">
                  <button onClick={() => eliminarItem(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h3 className="text-xl font-semibold mt-4">Total: S/{total.toFixed(2)}</h3>
      <button
        onClick={() => navigate("/resumen")}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Ver resumen del pedido
      </button>
    </div>
  );
}

export default CarritoPage;