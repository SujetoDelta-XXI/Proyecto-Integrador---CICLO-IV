import { useState } from "react";
import SidebarFilters from "./SidebarFilters";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Xiaomi Mi Band 5",
    price: 199,
    oldPrice: null,
    rating: 4,
    reviews: 4,
    image: "https://via.placeholder.com/200x200",
    discount: null,
    isNew: true,
  },
  {
    id: 2,
    name: "Bluetooth Speaker",
    price: 275,
    oldPrice: 300,
    rating: 5,
    reviews: 5,
    image: "https://via.placeholder.com/200x200",
    discount: 25,
    isNew: false,
  },
  // ...más productos
];

function ShopGridPage() {
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(500);

  // Filtrar productos por nombre y precio
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      product.price <= price
  );

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-6 py-8 px-4">
      <aside className="w-full md:w-1/4 mb-6 md:mb-0">
        <SidebarFilters
          search={search}
          setSearch={setSearch}
          price={price}
          setPrice={setPrice}
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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No se encontraron productos.
            </div>
          )}
        </div>
        {/* Paginación */}
        <div className="flex justify-center mt-8">
          <button className="px-3 py-1 border rounded mx-1">1</button>
          <button className="px-3 py-1 border rounded mx-1">2</button>
          <button className="px-3 py-1 border rounded mx-1">3</button>
        </div>
      </main>
    </div>
  );
}

export default ShopGridPage;