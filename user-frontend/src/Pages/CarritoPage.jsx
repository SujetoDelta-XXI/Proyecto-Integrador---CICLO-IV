import React, { useEffect, useState } from "react";

function CarritoPage() {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem("token");

  const calcularTotal = (items) => {
    let totalAcumulado = 0;
    items.forEach((item) => {
      const precioOriginal = item.precio || 0;
      const descuento = item.descuento || 0;
      const precioFinal = precioOriginal * (1 - descuento / 100);
      totalAcumulado += precioFinal * item.cantidad;
    });
    setTotal(totalAcumulado.toFixed(2));
  };

  const cargarCarrito = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/usuario/carrito", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCarrito(data);
        calcularTotal(data);
      } else {
        console.error("Error al cargar carrito");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const actualizarCantidad = async (productoId, nuevaCantidad) => {
    try {
      const response = await fetch("http://localhost:8080/api/usuario/carrito/actualizar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productoId, cantidad: nuevaCantidad }),
      });

      if (response.ok) {
        cargarCarrito(); // recargar estado actualizado
      } else {
        console.error("Error al actualizar cantidad");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const eliminarItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/usuario/carrito/eliminar/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        cargarCarrito();
      } else {
        console.error("Error al eliminar ítem");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const finalizarCompra = () => {
    alert("Funcionalidad de compra en construcción...");
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    cargarCarrito();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tu Carrito</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => {
                const precioConDescuento = item.precio * (1 - (item.descuento || 0) / 100);
                return (
                  <tr key={item.id}>
                    <td>
                      <img src={item.imagen} alt={item.nombre} width={60} className="me-2" />
                      {item.nombre}
                    </td>
                    <td>
                      S/{precioConDescuento.toFixed(2)}{" "}
                      {item.descuento > 0 && (
                        <span className="text-danger ms-1">
                          <small>
                            <del>S/{item.precio}</del> -{item.descuento}%
                          </small>
                        </span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-secondary btn-sm me-1"
                        onClick={() =>
                          item.cantidad > 1 &&
                          actualizarCantidad(item.productoId, item.cantidad - 1)
                        }
                      >
                        -
                      </button>
                      {item.cantidad}
                      <button
                        className="btn btn-outline-secondary btn-sm ms-1"
                        onClick={() =>
                          actualizarCantidad(item.productoId, item.cantidad + 1)
                        }
                      >
                        +
                      </button>
                    </td>
                    <td>S/{(precioConDescuento * item.cantidad).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => eliminarItem(item.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4>Total: S/{total}</h4>
            <button className="btn btn-success" onClick={finalizarCompra}>
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CarritoPage;
