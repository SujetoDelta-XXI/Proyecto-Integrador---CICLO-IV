import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function CarruselCategorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/usuario/categorias")
      .then((res) => res.json())
      .then((data) => setCategorias(data || []))
      .catch((err) => {
        console.error("Error cargando categorías:", err);
        setCategorias([]);
      });
  }, []);

  // imágenes referenciales
   const imagenesCategorias = {
    STARWARS: "https://blog.teufelaudio.es/wp-content/uploads/2022/05/titelbild-star-wars.jpg.webp",
    "Dragon Ball": "https://oem.com.mx/elsoldemexico/img/16449130/1556215122/BASE_LANDSCAPE/1200/image.webp",
    "DIbujos animados": "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2016/09/hanna-barbera-su-mejores-personajes-series-tv.jpg?tf=3840x",
    Otaku: "http://www.mediafire.com/convkey/7e09/j8xjoa3nzjxsy4s6g.jpg",
    basicos: "https://mundo180.com/wp-content/uploads/2024/05/Polos-basicos-hombre.png",
    lego: "https://www.roc21.com/wp-content/uploads/2025/06/Logos-de-LEGO.webp",
    disney: "https://wallpapers.com/images/featured-full/mejores-fondods-de-disney-xl586pozxou14ifp.jpg",
  };

  return (
    <section className="max-w-7xl mx-auto mt-6 px-4">
      <h2 className="text-3xl font-bold mb-4 text-center">Categorías</h2>
      {categorias.length === 0 ? (
        <p className="text-center text-gray-500">No hay categorías disponibles.</p>
      ) : (
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 3000 }}
          loop={categorias.length > 3} // previene el warning
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="rounded-lg shadow"
        >
          {categorias.map((categoria) => (
            <SwiperSlide key={categoria.id}>
              <div className="relative rounded-xl overflow-hidden shadow hover:scale-105 transition cursor-pointer">
                <img
                  src={
                    imagenesCategorias[categoria.nombre] ||
                    "https://via.placeholder.com/400x300?text=Categoria"
                  }
                  alt={categoria.nombre}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition">
                  <h3 className="text-white text-xl font-bold text-center">{categoria.nombre}</h3>
                  <p className="text-white text-sm mt-1 px-2 text-center">
                    {categoria.descripcion}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
