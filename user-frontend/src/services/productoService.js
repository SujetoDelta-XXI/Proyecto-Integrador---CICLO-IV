const API_BASE_URL = 'http://192.168.18.2:8080/api/usuario';

export const productoService = {
  // Obtener productos con mayor descuento (máximo 4)
  async getOfertasDia() {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/ofertas-dia`);
      if (!response.ok) {
        throw new Error('Error al obtener ofertas del día');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getOfertasDia:', error);
      return [];
    }
  },

  // Obtener productos con mayor descuento de la semana (máximo 5)
  async getOfertasSemana() {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/ofertas-semana`);
      if (!response.ok) {
        throw new Error('Error al obtener ofertas de la semana');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getOfertasSemana:', error);
      return [];
    }
  },

  // Obtener productos más vendidos (máximo 4)
  async getMasVendidos() {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/mas-vendidos`);
      if (!response.ok) {
        throw new Error('Error al obtener productos más vendidos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getMasVendidos:', error);
      return [];
    }
  },

  // Obtener productos nuevos (menos de una semana)
  async getProductosNuevos() {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/nuevos`);
      if (!response.ok) {
        throw new Error('Error al obtener productos nuevos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getProductosNuevos:', error);
      return [];
    }
  }
}; 