function SidebarFilters({ search, setSearch, price, setPrice }) {
  const categories = [
    "Computers & Accessories (1138)",
    "Smartphones & Tablets (2356)",
    "TV, Video & Audio (420)",
    "Cameras, Photo & Video (874)",
    "Headphones (1239)",
    "Wearable Electronics (340)",
    "Printers & Ink (512)",
  ];

  return (
    <div className="bg-white rounded shadow p-4">
      {/* Buscador */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Rango de precio */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Rango de Precio</h3>
        <input
          type="range"
          min="50"
          max="5000"
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
          className="w-full mb-2"
        />
        <div className="flex justify-between text-sm">
          <span>$50</span>
          <span>${price}</span>
          <span>$5000</span>
        </div>
      </div>

      {/* Categorías */}
      <div>
        <h3 className="font-semibold mb-2">Categorías</h3>
        <ul>
          {categories.map((cat, idx) => (
            <li key={idx} className="mb-1 text-gray-700">{cat}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SidebarFilters;