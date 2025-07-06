function UserComponent({ nombre, correo }) {
  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
      <h4 className="text-xl font-bold mb-4 text-indigo-700">👤 Perfil de Usuario</h4>
      <p className="text-gray-800 mb-2">
        <span className="font-semibold">Nombre:</span> {nombre}
      </p>
      <p className="text-gray-800">
        <span className="font-semibold">Correo:</span> <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">{correo}</span>
      </p>
    </div>
  );
}

export default UserComponent;
