# Endpoints de Productos - EstiloYa Backend

## Nuevos Endpoints Agregados

### 1. Ofertas del Día
**URL:** `GET /api/usuario/productos/ofertas-dia`  
**Descripción:** Obtiene los 4 productos con mayor descuento  
**Respuesta:** Lista de ProductoDTO con los productos que tienen mayor porcentaje de descuento

### 2. Ofertas de la Semana
**URL:** `GET /api/usuario/productos/ofertas-semana`  
**Descripción:** Obtiene los 5 productos con mayor descuento que no tengan más de una semana con el mismo descuento  
**Respuesta:** Lista de ProductoDTO con productos que tienen descuentos recientes (última semana)

### 3. Productos Más Vendidos
**URL:** `GET /api/usuario/productos/mas-vendidos`  
**Descripción:** Obtiene los productos más vendidos basado en la cantidad total en detalle carrito  
**Respuesta:** Lista de ProductoDTO ordenados por cantidad total vendida

### 4. Productos Nuevos
**URL:** `GET /api/usuario/productos/nuevos`  
**Descripción:** Obtiene productos que tienen menos de una semana desde que fueron creados  
**Respuesta:** Lista de ProductoDTO con productos creados en la última semana

## Estructura de Respuesta

Todos los endpoints devuelven una lista de objetos `ProductoDTO` con la siguiente estructura:

```json
{
  "id": 1,
  "nombre": "Nombre del Producto",
  "descripcion": "Descripción del producto",
  "imagen": "url_imagen.jpg",
  "precio": 99.99,
  "stock": 10,
  "categoria": {
    "idCategoria": 1,
    "nombre": "Categoría"
  },
  "marca": {
    "idMarca": 1,
    "nombre": "Marca"
  },
  "descuento": {
    "idDescuento": 1,
    "porcentaje": 20
  }
}
```

## Implementación Técnica

### Repositorios Modificados:
- **ProductoRepository**: Agregadas consultas nativas para optimizar el rendimiento
- **DetalleCarritoRepository**: Agregada consulta para productos más vendidos

### Servicios Modificados:
- **ProductoService**: Agregados métodos para cada endpoint con conversión a DTO

### Controlador Modificado:
- **ProductoController**: Agregados los 4 nuevos endpoints bajo la ruta `/api/usuario/productos/`

## Notas de Implementación

1. **Consultas Nativas**: Se utilizaron consultas SQL nativas para optimizar el rendimiento en las consultas complejas
2. **Límites**: Los endpoints de ofertas tienen límites específicos (4 y 5 productos respectivamente)
3. **Filtros de Fecha**: Se utilizan filtros de fecha para productos nuevos y ofertas de la semana
4. **Conversión DTO**: Todos los endpoints devuelven ProductoDTO para mantener consistencia con la API existente 