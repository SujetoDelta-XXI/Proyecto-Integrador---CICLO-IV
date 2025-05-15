import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const productos = [
  { id: 1, nombre: "Polo Negro 1", img: "https://th.bing.com/th/id/OIP.cafRi3jusreZzbeamaWJKgHaHW?cb=iwc2&rs=1&pid=ImgDetMain" },
  { id: 2, nombre: "Polo Negro 2", img: "https://www.zalo.pe/wp-content/uploads/2023/06/polos-cumpleanos-lima-peru-estilo-7-600x596.jpg" },
  { id: 3, nombre: "Polo Negro 3", img: "https://mundoreset.com/cdn/shop/products/C66_P1-Recuerda_394x.jpg?v=1630950810" },
  { id: 4, nombre: "Polo Star Wars", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS75bm48Gg2F1PfbcBqtNYEMn25bR6MWw6PDQ&s" },
  { id: 5, nombre: "Polera Star Wars", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLa8swqg3UjK-v9pTmXQfBqZzTdE93muztjw&s" },
];

const ITEMS_POR_VISTA = 3;

function CarruselMultiItem() {
  const [indice, setIndice] = useState(0);

  // Calcula los productos a mostrar
  const productosAMostrar = productos.slice(indice, indice + ITEMS_POR_VISTA);

  // Controla los botones
  const puedeRetroceder = indice > 0;
  const puedeAvanzar = indice + ITEMS_POR_VISTA < productos.length;

  const handlePrev = () => {
    if (puedeRetroceder) setIndice(indice - 1);
  };

  const handleNext = () => {
    if (puedeAvanzar) setIndice(indice + 1);
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-outline-primary"
          onClick={handlePrev}
          disabled={!puedeRetroceder}
        >
          &#8592;
        </button>
        <div className="d-flex flex-row flex-nowrap" style={{ width: "80%" }}>
          {productosAMostrar.map((producto) => (
            <div
              key={producto.id}
              className="card mx-2"
              style={{ minWidth: "30%", maxWidth: "30%" }}
            >
              <img
                src={producto.img}
                className="card-img-top"
                alt={producto.nombre}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
              </div>
            </div>
          ))}
        </div>
        <button
          className="btn btn-outline-primary"
          onClick={handleNext}
          disabled={!puedeAvanzar}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}

export default CarruselMultiItem;