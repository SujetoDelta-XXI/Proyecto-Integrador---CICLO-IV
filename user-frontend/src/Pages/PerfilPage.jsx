// src/pages/PerfilPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PerfilPage() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
  });
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/loginForm");
      return;
    }

    fetch("http://localhost:8080/api/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo obtener el perfil");
        return res.json();
      })
      .then((data) => {
        setUsuario(data);
        setForm({
          nombre: data.nombre || "",
          apellidos: data.apellidos || "",
          telefono: data.telefono || "",
        });
      })
      .catch((err) => setError(err.message));
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8080/api/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Error al actualizar datos");

      const data = await response.json();
      setUsuario(data);
      setMensaje("Perfil actualizado correctamente.");
      setEditando(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <div className="text-red-600 text-center mt-6">Error: {error}</div>;
  if (!usuario) return <div className="text-center mt-6">Cargando perfil...</div>;

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Perfil de Usuario</h2>

      {!editando ? (
        <div className="bg-white p-4 shadow rounded">
          <p><strong>Nombre:</strong> {usuario.nombre}</p>
          <p><strong>Apellidos:</strong> {usuario.apellidos}</p>
          <p><strong>Correo:</strong> {usuario.correo}</p>
          <p><strong>Teléfono:</strong> {usuario.telefono || "No registrado"}</p>

          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setEditando(true)}
          >
            Editar Perfil
          </button>
        </div>
      ) : (
        <div className="bg-white p-4 shadow rounded">
          <label className="block mb-2">
            Nombre:
            <input
              type="text"
              name="nombre"
              className="w-full border p-2"
              value={form.nombre}
              onChange={handleChange}
            />
          </label>
          <label className="block mb-2">
            Apellidos:
            <input
              type="text"
              name="apellidos"
              className="w-full border p-2"
              value={form.apellidos}
              onChange={handleChange}
            />
          </label>
          <label className="block mb-2">
            Teléfono:
            <input
              type="tel"
              name="telefono"
              className="w-full border p-2"
              value={form.telefono}
              onChange={handleChange}
            />
          </label>

          <div className="flex justify-end gap-2 mt-4">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleGuardar}
            >
              Guardar
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={() => setEditando(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {mensaje && <p className="text-green-600 mt-4">{mensaje}</p>}
    </div>
  );
}

export default PerfilPage;
