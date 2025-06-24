import React, { useEffect, useState } from "react";

const DetalleCarrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cargarCarrito = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/api/usuario/carrito", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
        item.productoId === productoId
          ? { ...item, cantidad }
          : item
      );
      setCarrito(nuevoCarrito);
      calcularTotal(nuevoCarrito);
    } catch (err) {
      console.error("Error actualizando cantidad:", err);
    }
  };

  const eliminarItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:8080/api/usuario/carrito/eliminar/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const nuevoCarrito = carrito.filter((item) => item.id !== itemId);
      setCarrito(nuevoCarrito);
      calcularTotal(nuevoCarrito);
    } catch (err) {
      console.error("Error eliminando item:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mi Carrito</h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {carrito.map((item) => {
              const precioConDescuento =
                item.precio * (1 - (item.descuento ?? 0) / 100);

              return (
                <li key={item.id} className="flex items-center justify-between bg-white p-4 rounded shadow">
                  <div className="flex items-center gap-4">
                    <img src={item.imagen} alt={item.nombre} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h3 className="font-semibold">{item.nombre}</h3>
                      <p className="text-sm text-gray-500">S/. {item.precio.toFixed(2)}</p>
                      {item.descuento > 0 && (
                        <p className="text-sm text-green-600">
                          Descuento: {item.descuento}% →{" "}
                          <strong>S/. {precioConDescuento.toFixed(2)}</strong>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 bg-gray-300 rounded"
                      onClick={() => actualizarCantidad(item.productoId, item.cantidad - 1)}
                      disabled={item.cantidad <= 1}
                    >
                      -
                    </button>
                    <span>{item.cantidad}</span>
                    <button
                      className="px-2 py-1 bg-gray-300 rounded"
                      onClick={() => actualizarCantidad(item.productoId, item.cantidad + 1)}
                    >
                      +
                    </button>
                    <button
                      className="ml-4 text-red-600"
                      onClick={() => eliminarItem(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 text-right">
            <h3 className="text-xl font-semibold">Total: S/. {total}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default DetalleCarrito;
