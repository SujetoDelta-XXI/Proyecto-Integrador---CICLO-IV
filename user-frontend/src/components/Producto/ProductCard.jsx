function ProductCard({ id, name, price, oldPrice, rating, reviews, image, discount, isNew }) {
  const handleAgregarAlCarrito = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/detalle-carrito/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carrito: 1, // ID de carrito simulado (fijo por ahora)
          producto: id,
          producto_personalizado: null,
          cantidad: 1,
        }),
      });

      if (response.ok) {
        alert("✅ Producto agregado al carrito");
      } else {
        alert("❌ Error al agregar al carrito");
      }
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-40 object-cover rounded" />
        {discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
        {isNew && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            New
          </span>
        )}
      </div>
      <h4 className="mt-2 font-semibold">{name}</h4>
      <div className="flex items-center gap-2 mt-1">
        {oldPrice && (
          <span className="text-sm line-through text-gray-400">S/{oldPrice}</span>
        )}
        <span className={`text-lg font-bold ${oldPrice ? 'text-green-600' : 'text-indigo-600'}`}>
          S/{price}
        </span>
      </div>
      <div className="flex items-center gap-1 mt-1 mb-2">
        <span className="text-yellow-400">{"★".repeat(rating)}{"☆".repeat(5 - rating)}</span>
        <span className="text-xs text-gray-500">{reviews}.0 Review(s)</span>
      </div>

      {/* Nuevo botón para agregar al carrito */}
      <button
        onClick={handleAgregarAlCarrito}
        className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 rounded transition"
      >
        🛒 Agregar al carrito
      </button>
    </div>
  );
}

export default ProductCard;
