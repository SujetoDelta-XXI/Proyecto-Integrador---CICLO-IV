// ResumenCompraPage.jsx
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
      <h2 className="text-2xl font-bold text-center mb-6">Resumen del pedido</h2>
      <div className="bg-white shadow-md rounded p-6">
        {carrito.map((item) => {
          const precioFinal = item.precio * (1 - (item.descuento || 0) / 100);
          return (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <img src={item.imagen} alt={item.nombre} className="w-16 h-16 mr-4" />
                <div>
                  <h3 className="font-semibold">{item.nombre}</h3>
                  <p className="text-sm text-gray-600">
                    {item.descuento > 0 && (
                      <>
                        <span className="line-through text-red-500 mr-1">S/{item.precio.toFixed(2)}</span>
                        <span className="text-green-600">S/{precioFinal.toFixed(2)} ({item.descuento}% dto.)</span>
                      </>
                    )}
                  </p>
                  <p>Cantidad: {item.cantidad}</p>
                  <p className="text-sm">Subtotal: S/{(precioFinal * item.cantidad).toFixed(2)}</p>
                </div>
              </div>
            </div>
          );
        })}
        <hr className="my-4" />
        <div className="text-right text-xl font-semibold">
          Total: S/ {calcularTotal().toFixed(2)}
        </div>
        <button
          onClick={() => navigate("/datos-envio")}
          className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-900 w-full"
        >
          Ir a pagar
        </button>
      </div>
    </div>
  );
}

export default ResumenCompraPage;