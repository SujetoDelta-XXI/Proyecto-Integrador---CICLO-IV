import { useState } from "react";

const API_BASE = "http://localhost:8080/api/usuario/diseno";

function Disenar() {
  const [prompt, setPrompt] = useState("");
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleGenerar = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    setImagen(null);
    try {
      const res = await fetch(`${API_BASE}/generar-imagen`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error("Error al generar la imagen");
      const data = await res.json();
      setImagen(data.base64Image || data.imagen || data.image || null);
      if (!data.base64Image && !data.imagen && !data.image) setError("No se recibió imagen");
    } catch (err) {
      setError("No se pudo generar la imagen");
    } finally {
      setLoading(false);
    }
  };

  const handleReiniciar = () => {
    setPrompt("");
    setImagen(null);
    setError("");
    setSuccess("");
  };

  const handleGuardar = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      console.log("Token encontrado:", token ? "Sí" : "No");
      
      if (!token) {
        setError("No estás autenticado. Por favor, inicia sesión.");
        return;
      }
      
      const requestBody = {
        base64Image: imagen,
        descripcion: prompt,
      };
      
      console.log("Enviando petición a:", `${API_BASE}/guardar-diseno`);
      console.log("Headers:", {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.substring(0, 20)}...`,
      });
      
      const res = await fetch(`${API_BASE}/guardar-diseno`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
      
      console.log("Respuesta del servidor:", res.status, res.statusText);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error del servidor:", errorText);
        
        // Si es error 401, el token puede haber expirado
        if (res.status === 401) {
          localStorage.removeItem("token"); // Limpiar token expirado
          setError("Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.");
          return;
        }
        
        throw new Error(`Error ${res.status}: ${errorText || "Error al guardar el diseño"}`);
      }
      
      setSuccess("¡Diseño guardado exitosamente!");
    } catch (err) {
      console.error("Error completo:", err);
      setError(err.message || "No se pudo guardar el diseño");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Verificar si el usuario está autenticado
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-6 text-center">Diseñar con IA</h2>
      {!isAuthenticated && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          ⚠️ Necesitas <a href="/login" className="underline font-bold">iniciar sesión</a> para guardar diseños.
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Prompt para la IA:</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Describe tu diseño..."
          disabled={loading}
        />
      </div>
      <div className="flex gap-3 mb-6">
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
          onClick={handleGenerar}
          disabled={!prompt || loading}
        >
          {loading ? "Generando..." : "Generar"}
        </button>
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          onClick={handleReiniciar}
          disabled={loading && !imagen}
        >
          Reiniciar
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
          onClick={handleGuardar}
          disabled={!imagen || loading}
        >
          Guardar
        </button>
      </div>
      {error && (
        <div className="text-red-600 mb-4 text-center">
          {error}
          {error.includes("sesión ha expirado") && (
            <button
              onClick={handleLogout}
              className="ml-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
            >
              Ir al Login
            </button>
          )}
        </div>
      )}
      {success && <div className="text-green-600 mb-4 text-center">{success}</div>}
      {imagen && (
        <div className="flex flex-col items-center">
          <img
            src={`data:image/png;base64,${imagen}`}
            alt="Diseño generado"
            className="rounded shadow max-h-96 mb-2"
          />
          <span className="text-gray-500 text-xs">Vista previa del diseño generado</span>
        </div>
      )}
    </div>
  );
}

export default Disenar; 