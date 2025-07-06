import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { toast } from "react-toastify";

function CarritoPage() {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const { actualizarCarrito } = useCarrito();
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
      if (!response.ok) {
        throw new Error("Error al cargar el carrito");
      }
      const data = await response.json();
      setCarrito(data);
      calcularTotal(data);
    } catch (error) {
      console.error("Error al cargar el carrito", error);
      toast.error("No se pudo cargar el carrito");
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
    if (cantidad > 5) {
      toast.info("Solo puedes comprar hasta 5 unidades de este producto.");
      return;
    }
    try {
      await fetch("http://localhost:8080/api/usuario/carrito/actualizar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productoId, cantidad }),
      });
      await cargarCarrito();
      actualizarCarrito();
    } catch (error) {
      console.error("Error al actualizar la cantidad", error);
      toast.error("No se pudo actualizar la cantidad");
    }
  };

  const confirmarEliminar = (id) => {
    setItemToDelete(id);
    setShowConfirm(true);
  };

  const eliminarItem = async () => {
    try {
      await fetch(`http://localhost:8080/api/usuario/carrito/eliminar/${itemToDelete}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      await cargarCarrito();
      actualizarCarrito();
      setShowConfirm(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Error al eliminar el producto", error);
      toast.error("No se pudo eliminar el producto");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">🛒 Tu Carrito</h2>

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-6 py-3">Producto</th>
              <th className="px-6 py-3">Precio</th>
              <th className="px-6 py-3">Cantidad</th>
              <th className="px-6 py-3">Subtotal</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((item) => {
              const precioFinal = item.precio * (1 - (item.descuento || 0) / 100);
              return (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-16 h-16 rounded shadow"
                    />
                    <span>{item.nombre}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-green-600">
                      S/{precioFinal.toFixed(2)}
                    </span>
                    {item.descuento > 0 && (
                      <span className="text-xs text-red-500 line-through ml-2">
                        S/{item.precio.toFixed(2)} -{item.descuento}%
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <button
                      className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                      onClick={() => actualizarCantidad(item.productoId, item.cantidad - 1)}
                      disabled={item.cantidad <= 1}
                    >
                      -
                    </button>
                    <span className="px-2">{item.cantidad}</span>
                    <button
                      className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                      onClick={() => actualizarCantidad(item.productoId, item.cantidad + 1)}
                      disabled={item.cantidad >= 5}
                    >
                      +
                    </button>
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    S/{(precioFinal * item.cantidad).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => confirmarEliminar(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <h3 className="text-xl font-bold">Total: S/{total.toFixed(2)}</h3>
        <button
          onClick={() => navigate("/resumen")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Ver resumen del pedido
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded p-6 shadow-lg text-center">
            <p className="mb-4">¿Estás seguro de eliminar este producto?</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={eliminarItem}
              >
                Sí, eliminar
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowConfirm(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CarritoPage;
