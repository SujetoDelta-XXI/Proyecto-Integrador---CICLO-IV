import MainHeader from "./Header";
import "../css/Index.css";
import CarruselComponent from "./CarruselComponent";

function Index() {
  return (
    <>
      <MainHeader />
      <CarruselComponent />
      <div className="index-hero">
        <h1 className="index-title">Bienvenido a EstiloYa</h1>
        <p className="index-subtitle">
          Descubre la mejor moda, accesorios y más. ¡Explora nuestra tienda o inicia sesión para una experiencia personalizada!
        </p>
        <div className="index-actions">
          <a href="/tienda" className="index-btn primary">Ir a la Tienda</a>
          <a href="/loginForm" className="index-btn">Iniciar Sesión</a>
        </div>
      </div>
    </>
  );
}

export default Index;