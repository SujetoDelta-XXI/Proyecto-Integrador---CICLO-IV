import { Link } from "react-router-dom";

function Destacados() {
  const destacados = [
    {
      id: 1,
      titulo: "Nueva Colección Verano 2025",
      descripcion: "Explora los estilos frescos para esta temporada.",
      imagen: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1920&q=80",
      link: "/tienda",
    },
    {
      id: 2,
      titulo: "Ofertas Exclusivas",
      descripcion: "Aprovecha descuentos limitados en productos seleccionados.",
      imagen: "https://images.unsplash.com/photo-1562158070-9a183c6aee09?auto=format&fit=crop&w=1920&q=80",
      link: "/tienda",
    },
    {
      id: 3,
      titulo: "Personaliza tu Estilo",
      descripcion: "Diseña prendas únicas para tu identidad.",
      imagen: "https://images.unsplash.com/photo-1585386959984-a41552261c15?auto=format&fit=crop&w=1920&q=80",
      link: "/tienda",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
      {destacados.map((item) => (
        <div
          key={item.id}
          className="relative group overflow-hidden rounded-xl shadow-lg"
        >
          <img
            src={item.imagen}
            alt={item.titulo}
            className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <h3 className="text-2xl font-bold text-white mb-2">
              {item.titulo}
            </h3>
            <p className="text-white text-center mb-4">{item.descripcion}</p>
            <Link
              to={item.link}
              className="py-2 px-6 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-800 transition"
            >
              Ver más
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Destacados;
