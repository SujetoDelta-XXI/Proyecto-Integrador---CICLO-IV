import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const productos = [
  { id: 1, nombre: "Polo Negro 1", img: "https://th.bing.com/th/id/OIP.cafRi3jusreZzbeamaWJKgHaHW?cb=iwc2&rs=1&pid=ImgDetMain" },
  { id: 2, nombre: "Polo Negro 2", img: "https://www.zalo.pe/wp-content/uploads/2023/06/polos-cumpleanos-lima-peru-estilo-7-600x596.jpg" },
  { id: 3, nombre: "Polo Negro 3", img: "https://mundoreset.com/cdn/shop/products/C66_P1-Recuerda_394x.jpg?v=1630950810" },
  { id: 4, nombre: "Polo Star Wars", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS75bm48Gg2F1PfbcBqtNYEMn25bR6MWw6PDQ&s" },
  { id: 5, nombre: "Polera Star Wars", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLa8swqg3UjK-v9pTmXQfBqZzTdE93muztjw&s" },
];

export default function CarruselComponent() {
  return (
    <div className="max-w-7xl mx-auto mt-6 px-4">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000 }}
        loop
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        className="rounded-lg shadow-lg"
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {productos.map((producto) => (
          <SwiperSlide key={producto.id}>
            <div className="bg-white rounded-lg overflow-hidden shadow transition-transform hover:scale-105 cursor-pointer">
              <img
                src={producto.img}
                alt={producto.nombre}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center font-semibold text-gray-800">
                {producto.nombre}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
