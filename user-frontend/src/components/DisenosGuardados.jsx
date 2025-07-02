import { useEffect, useState } from "react";

const API_BASE = "http://localhost:8080/api/usuario/diseno";

function DisenosGuardados() {
  const [disenos, setDisenos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDisenos = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No estás autenticado");
        
        const res = await fetch(`${API_BASE}/listar-diseno`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Error al obtener los diseños");
        const data = await res.json();
        setDisenos(data);
      } catch (err) {
        setError("No se pudieron cargar los diseños guardados");
      } finally {
        setLoading(false);
      }
    };
    fetchDisenos();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-6 text-center">Mis Diseños Guardados</h2>
      {loading && <div className="text-center">Cargando...</div>}
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      {!loading && !error && disenos.length === 0 && (
        <div className="text-center text-gray-500">No tienes diseños guardados.</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {disenos.map((diseno) => (
          <div key={diseno.id} className="bg-gray-50 rounded-lg shadow p-4 flex flex-col items-center">
            <img
              src={`data:image/png;base64,${diseno.url_imagen}`}
              alt={diseno.descripcion}
              className="rounded shadow max-h-60 mb-2"
            />
            <div className="text-sm text-gray-700 mb-1 font-semibold">{diseno.descripcion}</div>
            <div className="text-xs text-gray-500 mb-1">Fecha: {diseno.fecha_creacion}</div>
            <div className={`text-xs font-bold mb-1 ${diseno.estado === 'aprobado' ? 'text-green-600' : diseno.estado === 'denegado' ? 'text-red-600' : 'text-yellow-600'}`}>Estado: {diseno.estado}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisenosGuardados; 