function ProductCard({ name, price, oldPrice, rating, reviews, image, discount, isNew }) {
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
      <div className="flex items-center gap-1 mt-1">
        <span className="text-yellow-400">{"★".repeat(rating)}{"☆".repeat(5 - rating)}</span>
        <span className="text-xs text-gray-500">{reviews}.0 Review(s)</span>
      </div>
    </div>
  );
}

export default ProductCard;
