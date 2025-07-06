import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useCarrito } from "../context/CarritoContext";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { cantidadCarrito } = useCarrito();


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
<header className="fixed top-0 left-0 w-full z-50 bg-slate-900 shadow transition-all duration-300 h-16">


  <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 text-slate-900">
    <Link
      to="/"
      className="text-2xl font-extrabold tracking-wide hover:text-indigo-600 transition"
    >
      Estilo<span className="text-indigo-600">Ya</span>
    </Link>
    <nav className="flex items-center gap-6 text-sm font-semibold">
      <Link to="/tienda" className="hover:text-indigo-600 transition">Home</Link>
      <Link to="/productos" className="hover:text-indigo-600 transition">Productos</Link>
      {token ? (
        <>
          <Link to="/perfil" className="hover:text-indigo-600 transition">
            <FaUserCircle className="inline mr-1" /> Perfil
          </Link>
          <button
  onClick={handleLogout}
  className="text-indigo-400 hover:text-indigo-600 transition"
>
  Cerrar Sesión
</button>

        </>
      ) : (
        <>
          <Link to="/login" className="hover:text-indigo-600 transition">Login</Link>
          <Link to="/register" className="hover:text-indigo-600 transition">Registro</Link>
        </>
      )}
      <Link to="/carrito" className="hover:text-indigo-600 transition relative">
  <FaShoppingCart className="text-xl" />
  {cantidadCarrito > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
      {cantidadCarrito}
    </span>
  )}
</Link>

    </nav>
  </div>
</header>

  );
}

export default Header;
