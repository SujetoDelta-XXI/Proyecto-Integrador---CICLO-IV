import { Link } from "react-router-dom";
import "../css/Header.css";

function Header() {
  return (
    <header className="main-header">
      <div className="main-header-logo">EstiloYa</div>
      <nav className="main-header-nav">
        <Link to="/tienda" className="main-header-link">Tienda</Link>
        <Link to="/loginForm" className="main-header-link">Login</Link>
        <Link to="/register" className="main-header-link">Registro</Link>
        {/* Agrega más enlaces si lo necesitas */}
      </nav>
    </header>
  );
}

export default Header;