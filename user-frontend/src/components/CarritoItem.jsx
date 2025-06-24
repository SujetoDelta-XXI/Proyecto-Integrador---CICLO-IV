import React from "react";

function CarritoItem({ item, actualizarCantidad, eliminar }) {
  const handleIncrementar = () => {
    actualizarCantidad(item.productoId, item.cantidad + 1);
  };

  const handleDisminuir = () => {
    if (item.cantidad > 1) {
      actualizarCantidad(item.productoId, item.cantidad - 1);
    }
  };

  return (
    <div className="border p-3 rounded mb-2">
      <h5>{item.nombre}</h5>
      <img src={item.imagen} alt={item.nombre} width={100} />
      <p>
        Precio: S/. {item.precio}
        {item.descuento > 0 && (
          <> (con {item.descuento}% desc.)</>
        )}
      </p>
      <div className="d-flex align-items-center gap-2">
        <button onClick={handleDisminuir}>-</button>
        <span>{item.cantidad}</span>
        <button onClick={handleIncrementar}>+</button>
      </div>
      <button className="btn btn-danger mt-2" onClick={() => eliminar(item.id)}>Eliminar</button>
    </div>
  );
}

export default CarritoItem;
