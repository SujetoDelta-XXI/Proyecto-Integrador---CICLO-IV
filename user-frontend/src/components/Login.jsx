import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* lado imagen */}
      <div className="hidden md:flex md:w-1/2 bg-cover bg-center" style={{
        backgroundImage: `url('https://3453376.fs1.hubspotusercontent-na1.net/hubfs/3453376/AdobeStock_602069201.jpeg')`
      }}>
      </div>

      {/* lado formulario */}
      <div className="flex flex-col justify-center items-center md:w-1/2 p-8 animate-fadeIn">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Bienvenido/a</h1>
        <p className="text-base text-gray-600 mb-6">
          Inicia sesión con tu correo o regístrate para continuar
        </p>
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Link
            to="/loginForm"
            className="py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-center font-semibold shadow transition"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            className="py-3 rounded-md bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-center font-semibold transition"
          >
            Registrarse
          </Link>
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-sm mt-6">
          <span className="text-lg">🔒</span>
          <span>Tus datos están protegidos</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
