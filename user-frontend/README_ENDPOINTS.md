# Nuevos Endpoints Implementados

## Descripción
Se han agregado 4 nuevos endpoints para mostrar diferentes secciones de productos en la página principal de la aplicación.

## Endpoints

### 1. Ofertas del Día
- **URL**: `http://192.168.18.2:8080/api/usuario/productos/ofertas-dia`
- **Descripción**: Muestra los 4 productos con mayor descuento
- **Método**: GET
- **Respuesta**: Array de productos con descuento

### 2. Ofertas de la Semana
- **URL**: `http://192.168.18.2:8080/api/usuario/productos/ofertas-semana`
- **Descripción**: Muestra 5 productos con mayor descuento que no tienen más de una semana con el mismo descuento
- **Método**: GET
- **Respuesta**: Array de productos con descuento semanal

### 3. Más Vendidos
- **URL**: `http://192.168.18.2:8080/api/usuario/productos/mas-vendidos`
- **Descripción**: Muestra los productos más vendidos (máximo 4) basado en detalle carrito
- **Método**: GET
- **Respuesta**: Array de productos más vendidos

### 4. Productos Nuevos
- **URL**: `http://192.168.18.2:8080/api/usuario/productos/nuevos`
- **Descripción**: Muestra productos creados en menos de una semana
- **Método**: GET
- **Respuesta**: Array de productos nuevos

## Componentes Creados

### 1. `productoService.js`
- Servicio para manejar las llamadas a los endpoints
- Manejo de errores y respuestas
- URL base configurada: `http://192.168.18.2:8080/api/usuario`

### 2. `ProductoCarrusel.jsx`
- Componente reutilizable para mostrar productos en carrusel
- Navegación con botones anterior/siguiente
- Indicadores de página
- Diseño responsivo
- Manejo de casos sin productos

### 3. `ErrorBoundary.jsx`
- Componente para manejar errores globales
- Interfaz de usuario para errores
- Botón de recarga de página

## Modificaciones Realizadas

### 1. `Index.jsx`
- Integración de los 4 nuevos endpoints
- Estados para cada sección de productos
- Loading spinner personalizado
- Manejo de errores de carga

### 2. `ProductoCard.jsx`
- Actualización de URL del endpoint de carrito
- Consistencia con la nueva IP del servidor

### 3. `App.jsx`
- Integración del ErrorBoundary
- Manejo global de errores

### 4. `index.css`
- Estilos personalizados para el carrusel
- Animaciones y transiciones
- Diseño responsivo
- Spinner de carga personalizado

## Características del Carrusel

- **Navegación**: Botones anterior/siguiente con iconos SVG
- **Indicadores**: Puntos de navegación para saltar entre páginas
- **Responsivo**: Adaptable a diferentes tamaños de pantalla
- **Animaciones**: Transiciones suaves entre elementos
- **Accesibilidad**: Etiquetas ARIA para lectores de pantalla
- **Estados vacíos**: Mensaje cuando no hay productos disponibles

## Uso

La página principal ahora muestra automáticamente las 4 secciones:
1. 🔥 Ofertas del Día (4 productos)
2. ⭐ Ofertas de la Semana (5 productos)
3. 🏆 Más Vendidos (4 productos)
4. 🆕 Productos Nuevos (4 productos)

Cada sección tiene su propio carrusel independiente con navegación y indicadores.

## Notas Técnicas

- Los endpoints deben estar disponibles en el servidor backend
- La aplicación maneja errores de red graciosamente
- El diseño es completamente responsivo
- Se mantiene la funcionalidad existente del header y footer
- No se modificó lógica innecesaria según lo solicitado 