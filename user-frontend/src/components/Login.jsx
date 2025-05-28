import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="max-w-md mx-auto mt-16 text-left">
      <h1 className="text-4xl font-bold mb-2">BIENVENIDO/A</h1>
      <p className="text-base text-gray-800 mb-6">
        Inicia sesión con tu correo electrónico o regístrate
      </p>
      <div className="flex flex-col gap-4 mb-4">
        <Link to="/loginForm" className="py-3 rounded-sm text-base cursor-pointer no-underline transition-colors duration-200 w-full text-center border border-gray-800 bg-white text-gray-800">
          INICIAR SESIÓN
        </Link>
        <Link to="../register" className="py-3 rounded-sm text-base cursor-pointer no-underline transition-colors duration-200 w-full text-center border border-gray-800 bg-gray-900 text-white">
          REGÍSTRATE
        </Link>
      </div>
      <div className="flex items-center text-base text-gray-800 mt-4 mb-8 gap-2">
        <span className="text-lg">🔒</span>
        <span>Todos los datos de mantienen de forma segura</span>
      </div>
    </div>
  );
}

export default Login;