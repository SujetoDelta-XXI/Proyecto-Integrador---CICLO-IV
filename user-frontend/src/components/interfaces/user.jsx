function UserComponent({ nombre, correo }) {
  return (
    <div className="card mx-auto mt-5" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <h4 className="card-title mb-3">Perfil de Usuario</h4>
        <p className="card-text">
          <strong>Nombre:</strong> {nombre}
        </p>
        <p className="card-text">
          <strong>Correo:</strong> {correo}
        </p>
      </div>
    </div>
  );
}

export default UserComponent;