import { useState, useEffect } from "react";
import SidebarFilters from "./SidebarFilters";
import ProductCard from "./ProductCard";

function ShopGridPage() {
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(500);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const categoriaParam = selectedCategory ? `&categoria=${encodeURIComponent(selectedCategory)}` : "";
    fetch(`http://localhost:8080/api/productos/buscar?nombre=${search}&precioMax=${price}${categoriaParam}`)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar productos", err));
  }, [search, price, selectedCategory]);

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-6 py-8 px-4">
      <aside className="w-full md:w-1/4 mb-6 md:mb-0">
        <SidebarFilters
          search={search}
          setSearch={setSearch}
          price={price}
          setPrice={setPrice}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </aside>
      <main className="w-full md:w-3/4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Shop Grid</h2>
          <select className="border rounded px-2 py-1">
            <option>Sort by: Popularity</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.length > 0 ? (
            productos.map((product) => (
              <ProductCard
                key={product.id}
                name={product.nombre}
                price={product.precio}
                oldPrice={null}
                rating={5}
                reviews={5}
                image={`/images/${product.imagen}`}
                discount={product.descuento}
                isNew={false}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No se encontraron productos.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ShopGridPage;
