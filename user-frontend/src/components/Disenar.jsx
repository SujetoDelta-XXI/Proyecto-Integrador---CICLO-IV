import { useState } from "react";

const API_BASE = "http://localhost:8080/api/usuario/diseno";

function Disenar() {
  const [prompt, setPrompt] = useState("");
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleGenerar = async () => {
    if (!prompt.trim()) {
      setError("Por favor, ingresa una descripción para generar la imagen");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setImagen(null);
    
    try {
      console.log("Generando imagen con prompt:", prompt);
      
      const res = await fetch(`${API_BASE}/generar-imagen`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });
      
      console.log("Respuesta del servidor:", res.status, res.statusText);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error del servidor:", errorText);
        throw new Error(`Error ${res.status}: ${errorText || "Error al generar la imagen"}`);
      }
      
      const data = await res.json();
      console.log("Datos recibidos:", data);
      
      const imagenGenerada = data.base64Image || data.imagen || data.image || data.url;
      if (!imagenGenerada) {
        throw new Error("No se recibió imagen del servidor");
      }
      
      setImagen(imagenGenerada);
      setSuccess("¡Imagen generada exitosamente!");
    } catch (err) {
      console.error("Error completo:", err);
      setError(err.message || "No se pudo generar la imagen. Intenta con otra descripción.");
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
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">🎨 Diseñar con IA</h2>
      
      {!isAuthenticated && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          ⚠️ Necesitas <a href="/login" className="underline font-bold">iniciar sesión</a> para guardar diseños.
        </div>
      )}
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2 font-semibold">Describe tu diseño:</label>
        <textarea
          className="w-full border rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Ej: Un logo moderno para una tienda de ropa deportiva, con colores azul y blanco, estilo minimalista..."
          disabled={loading}
          rows={3}
        />
        
        <div className="mt-2 text-sm text-gray-500">
          <p className="font-semibold mb-1">💡 Ejemplos de prompts:</p>
          <ul className="space-y-1 text-xs">
            <li>• "Logo para restaurante italiano, colores verde y rojo"</li>
            <li>• "Diseño de camiseta con estampado de flores tropicales"</li>
            <li>• "Tarjeta de presentación elegante para arquitecto"</li>
            <li>• "Banner web para tienda de tecnología, estilo futurista"</li>
          </ul>
        </div>
      </div>
      <div className="flex gap-3 mb-6">
        <button
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 font-semibold flex items-center gap-2"
          onClick={handleGenerar}
          disabled={!prompt.trim() || loading}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Generando...
            </>
          ) : (
            <>
              ✨ Generar
            </>
          )}
        </button>
        <button
          className="bg-gray-300 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
          onClick={handleReiniciar}
          disabled={loading}
        >
          🔄 Reiniciar
        </button>
        {isAuthenticated && (
          <button
            className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50 font-semibold"
            onClick={handleGuardar}
            disabled={!imagen || loading}
          >
            💾 Guardar
          </button>
        )}
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
          <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-200 w-full">
            <img
              src={`data:image/png;base64,${imagen}`}
              alt="Diseño generado"
              className="rounded-lg shadow-lg max-h-96 w-full object-contain mx-auto"
            />
          </div>
          <div className="mt-3 text-center">
            <span className="text-gray-600 text-sm font-medium">✨ Diseño generado exitosamente</span>
            <p className="text-gray-500 text-xs mt-1">Puedes guardarlo o generar uno nuevo</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Disenar; 