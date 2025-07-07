import React, { useEffect, useState } from "react";

const DetalleCarrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const cargarCarrito = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/api/usuario/carrito", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCarrito(data);
        calcularTotal(data);
      } catch (err) {
        console.error("Error al cargar el carrito:", err);
      }
    };

    cargarCarrito();
  }, []);

  const calcularTotal = (items) => {
    const totalCalculado = items.reduce((acum, item) => {
      const precioBase = item.precio;
      const descuento = item.descuento ?? 0;
      const precioFinal = precioBase * (1 - descuento / 100);
      return acum + precioFinal * item.cantidad;
    }, 0);
    setTotal(totalCalculado.toFixed(2));
  };

  const actualizarCantidad = async (productoId, cantidad) => {
    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:8080/api/usuario/carrito/actualizar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productoId, cantidad }),
      });

      const nuevoCarrito = carrito.map((item) =>
        item.productoId === productoId ? { ...item, cantidad } : item
      );
      setCarrito(nuevoCarrito);
      calcularTotal(nuevoCarrito);
    } catch (err) {
      console.error("Error actualizando cantidad:", err);
    }
  };

  const confirmarEliminar = (id) => {
    setItemToDelete(id);
    setShowConfirm(true);
  };

  const eliminarItem = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:8080/api/usuario/carrito/eliminar/${itemToDelete}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const nuevoCarrito = carrito.filter((item) => item.id !== itemToDelete);
      setCarrito(nuevoCarrito);
      calcularTotal(nuevoCarrito);
      setShowConfirm(false);
      setItemToDelete(null);
    } catch (err) {
      console.error("Error eliminando item:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">🛒 Detalle de tu Carrito</h2>
      {carrito.length === 0 ? (
        <p className="text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {carrito.map((item) => {
              const precioConDescuento = item.precio * (1 - (item.descuento ?? 0) / 100);
              return (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded shadow p-4"
                >
                  <div className="flex items-center gap-4 mb-2 sm:mb-0">
                    <img src={item.imagen} alt={item.nombre} className="w-20 h-20 rounded shadow" />
                    <div>
                      <h3 className="font-semibold">{item.nombre}</h3>
                      <p className="text-sm text-gray-500">S/. {item.precio.toFixed(2)}</p>
                      {item.descuento > 0 && (
                        <p className="text-green-600 text-sm">
                          -{item.descuento}% →{" "}
                          <strong>S/. {precioConDescuento.toFixed(2)}</strong>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                      onClick={() => actualizarCantidad(item.productoId, item.cantidad - 1)}
                      disabled={item.cantidad <= 1}
                    >
                      -
                    </button>
                    <span>{item.cantidad}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                      onClick={() => actualizarCantidad(item.productoId, item.cantidad + 1)}
                    >
                      +
                    </button>
                    <button
                      className="ml-4 text-red-600 hover:text-red-800"
                      onClick={() => confirmarEliminar(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 text-right">
            <h3 className="text-xl font-bold">Total: S/. {total}</h3>
          </div>
        </>
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="mb-4">¿Estás seguro de eliminar este producto?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={eliminarItem}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Sí, eliminar
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetalleCarrito;
