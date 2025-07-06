import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ResumenCompraPage() {
  const [carrito, setCarrito] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/usuario/carrito", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCarrito(data))
      .catch((error) => console.error("Error al cargar resumen", error));
  }, []);

  const calcularTotal = () => {
    return carrito.reduce((acc, item) => {
      const precioFinal = item.precio * (1 - (item.descuento || 0) / 100);
      return acc + precioFinal * item.cantidad;
    }, 0);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">🧾 Resumen del Pedido</h2>
      <div className="bg-white shadow-lg rounded p-6">
        {carrito.length === 0 ? (
          <p className="text-center text-gray-500">Tu carrito está vacío.</p>
        ) : (
          <>
            {carrito.map((item) => {
              const precioFinal = item.precio * (1 - (item.descuento || 0) / 100);
              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between border-b py-4 gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-20 h-20 object-cover rounded shadow"
                    />
                    <div>
                      <h3 className="font-semibold">{item.nombre}</h3>
                      {item.descuento > 0 ? (
                        <p className="text-sm text-green-600">
                          <span className="line-through text-red-500 mr-1">
                            S/{item.precio.toFixed(2)}
                          </span>
                          S/{precioFinal.toFixed(2)} ({item.descuento}% dto.)
                        </p>
                      ) : (
                        <p className="text-sm text-gray-600">
                          S/{item.precio.toFixed(2)}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">Cantidad: {item.cantidad}</p>
                      <p className="text-sm font-semibold">
                        Subtotal: S/{(precioFinal * item.cantidad).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm sm:text-base text-right font-semibold mt-2 sm:mt-0">
                    Total Item:{" "}
                    <span className="text-blue-600">
                      S/{(precioFinal * item.cantidad).toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
            <div className="my-6 border-t pt-4 flex justify-end">
              <div className="text-xl font-bold text-right">
                Total a Pagar:{" "}
                <span className="text-green-700">
                  S/{calcularTotal().toFixed(2)}
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate("/datos-envio")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow transition"
            >
              Proceder al Pago
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ResumenCompraPage;
