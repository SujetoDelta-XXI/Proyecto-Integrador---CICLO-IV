
export default function handleAgregarAlCarrito(producto) {
  // Considera que en tu BD el campo es id_producto, pero en tu API p.id puede ser id o id_producto, revisa y ajusta según sea necesario
  const productoId = producto.id_producto || producto.id;
  const cantidad = 1;
  const carritoId = 1; // HARDCODEADO, cámbialo por el real cuando lo tengas

  fetch("http://localhost:8086/api/detalle-carrito/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      carrito: carritoId,
      producto: productoId,
      cantidad: cantidad,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Error al agregar al carrito");
      return res.json();
    })
    .then(() => {
      alert("✅ Producto agregado al carrito.");
    })
    .catch((err) => {
      console.error("❌ Error al agregar producto:", err);
      alert("⚠️ No se pudo agregar al carrito.");
    });
}
