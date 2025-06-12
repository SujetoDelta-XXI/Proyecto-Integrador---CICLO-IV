function ProductCard({
  name,
  price,
  oldPrice = null,
  rating = 0,
  reviews = 0,
  image = "",
  discount = 0,
  isNew = false,
  category = "",
}) {
  const filled = "★".repeat(rating);
  const empty  = "☆".repeat(5 - rating);

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      {/* ---------- Imagen + Badges ---------- */}
      <div className="relative">
        <img
          src={image || "/placeholder.png"}
          alt={name}
          className="w-full h-40 object-cover rounded"
        />

        {discount > 0 && (
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

      {/* ---------- Nombre y categoría ---------- */}
      <h4 className="mt-2 font-semibold line-clamp-2">{name}</h4>
      {category && (
        <span className="text-xs text-gray-500 uppercase tracking-wide">
          {category}
        </span>
      )}

      {/* ---------- Precios ---------- */}
      <div className="flex items-center gap-2 mt-1">
        {oldPrice && (
          <span className="text-sm line-through text-gray-400">
            S/{oldPrice}
          </span>
        )}
        <span
          className={`text-lg font-bold ${
            oldPrice ? "text-green-600" : "text-indigo-600"
          }`}
        >
          S/{price}
        </span>
      </div>

      {/* ---------- Rating ---------- */}
      <div className="flex items-center gap-1 mt-1">
        <span className="text-yellow-400">
          {filled}
          {empty}
        </span>
        <span className="text-xs text-gray-500">
          {reviews}.0&nbsp;Review{reviews !== 1 && "s"}
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
