import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="w-full bg-white flex items-center justify-between py-4 px-8 border-b border-gray-200 box-border sticky top-0 z-10">
      <Link to="/" className="text-2xl font-bold text-gray-900 tracking-wide no-underline">
        EstiloYa
      </Link>
      <nav className="flex gap-6">
        <Link to="/tienda" className="text-gray-900 no-underline text-lg font-medium transition-colors duration-200 hover:text-indigo-500">
          Tienda
        </Link>
        <Link to="/productos" className="text-gray-900 no-underline text-lg font-medium transition-colors duration-200 hover:text-indigo-500">
          Productos
        </Link>
        {token ? (
          <>
            <Link
              to="/perfil"
              className="text-gray-900 no-underline text-lg font-medium transition-colors duration-200 hover:text-indigo-500"
            >
              Perfil
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600 text-lg font-medium transition-colors duration-200 hover:text-red-800"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-900 no-underline text-lg font-medium transition-colors duration-200 hover:text-indigo-500"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-900 no-underline text-lg font-medium transition-colors duration-200 hover:text-indigo-500"
            >
              Registro
            </Link>
          </>
        )}
        <Link
          to="/carrito"
          className="text-gray-900 no-underline text-lg font-medium transition-colors duration-200 hover:text-indigo-500"
        >
          <FaShoppingCart size={20} />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
