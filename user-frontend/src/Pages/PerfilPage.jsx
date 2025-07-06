// src/pages/PerfilPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaSave, FaTimes } from "react-icons/fa";

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
      setMensaje("✅ Perfil actualizado correctamente.");
      setEditando(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <div className="text-red-600 text-center mt-6">Error: {error}</div>;
  if (!usuario) return <div className="text-center mt-10 animate-pulse">Cargando perfil...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700 flex items-center gap-2">
        <FaUserEdit /> Mi Perfil
      </h2>

      {!editando ? (
        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Nombre:</span> {usuario.nombre}
          </p>
          <p>
            <span className="font-semibold">Apellidos:</span> {usuario.apellidos}
          </p>
          <p>
            <span className="font-semibold">Correo:</span> <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">{usuario.correo}</span>
          </p>
          <p>
            <span className="font-semibold">Teléfono:</span> {usuario.telefono || <span className="text-gray-400 italic">No registrado</span>}
          </p>

          <button
            onClick={() => setEditando(true)}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Editar Perfil
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-600 mb-1">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-600 mb-1">Apellidos:</label>
            <input
              type="text"
              name="apellidos"
              value={form.apellidos}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-600 mb-1">Teléfono:</label>
            <input
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={handleGuardar}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
            >
              <FaSave /> Guardar
            </button>
            <button
              onClick={() => setEditando(false)}
              className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition"
            >
              <FaTimes /> Cancelar
            </button>
          </div>
        </div>
      )}

      {mensaje && (
        <p className="text-green-600 mt-4 text-center animate-pulse">{mensaje}</p>
      )}
    </div>
  );
}

export default PerfilPage;
