import { Link } from "react-router-dom";

function Header() {
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
        <Link to="/login" className="text-gray-900 no-underline text-lg font-medium transition-colors duration-200 hover:text-indigo-500">
          Login
        </Link>
        <Link to="/register" className="text-gray-900 no-underline text-lg font-medium transition-colors duration-200 hover:text-indigo-500">
          Registro
        </Link>
      </nav>
    </header>
  );
}

export default Header;