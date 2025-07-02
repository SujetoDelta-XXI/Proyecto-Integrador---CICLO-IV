package com.estiloya.service;

import com.estiloya.dto.ProductoDTO;
import com.estiloya.model.Producto;
import com.estiloya.repository.DetalleCarritoRepository;
import com.estiloya.repository.ProductoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductoService {

    private final RestTemplate restTemplate;
    private final ProductoRepository productoRepository;
    private final DetalleCarritoRepository detalleCarritoRepository;

    public ProductoService(RestTemplate restTemplate, ProductoRepository productoRepository, 
                          DetalleCarritoRepository detalleCarritoRepository) {
        this.restTemplate = restTemplate;
        this.productoRepository = productoRepository;
        this.detalleCarritoRepository = detalleCarritoRepository;
    }

    /**
     * Devuelve la lista filtrada por nombre, precio máximo y nombre de categoría.
     * @param nombre     texto a buscar (case-insensitive)
     * @param precioMax  precio máximo
     * @param categoria  nombre de la categoría ("" para todas)
     */
    public List<ProductoDTO> buscarPorNombrePrecioYCategoria(
            String nombre, BigDecimal precioMax, String categoria) {

        // 1. Trae el array completo desde la API Django
        ProductoDTO[] productos = restTemplate.getForObject(
                "http://127.0.0.1:8000/api/productos/",
                ProductoDTO[].class
        );

        return Arrays.stream(productos)
        /* ─ nombre ─ */
        .filter(p -> nombre.isBlank()
                || p.getNombre().toLowerCase().contains(nombre.toLowerCase()))
        /* ─ precio con descuento ─ */
        .filter(p -> {
            BigDecimal original = p.getPrecio();                     // precio base
            int porcDto         = p.getDescuento() != null
                                  ? p.getDescuento().getPorcentaje()
                                  : 0;
            BigDecimal finalPrice = original.subtract(
                    original.multiply(BigDecimal.valueOf(porcDto))
                            .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP)
            );
            return finalPrice.compareTo(precioMax) <= 0;
        })
        /* ─ categoría ─ */
        .filter(p -> categoria == null || categoria.isBlank()
                || (p.getCategoria() != null
                    && p.getCategoria().getNombre().equalsIgnoreCase(categoria)))
        .collect(Collectors.toList());
    }

    /**
     * Obtiene los 4 productos con mayor descuento
     */
    public List<ProductoDTO> getOfertasDelDia() {
        List<Producto> productos = productoRepository.findTop4ByDescuentoOrderByPorcentajeDesc();
        return productos.stream()
                .limit(4)
                .map(this::convertirAProductoDTO)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene los 5 productos con mayor descuento que no tengan más de una semana con el mismo descuento
     */
    public List<ProductoDTO> getOfertasDeLaSemana() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_MONTH, -7);
        Date unaSemanaAtras = calendar.getTime();
        
        List<Producto> productos = productoRepository.findTop5ByDescuentoAndFechaCreacionAfterOrderByPorcentajeDesc(unaSemanaAtras);
        return productos.stream()
                .limit(5)
                .map(this::convertirAProductoDTO)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene los productos más vendidos basado en detalle carrito
     */
    public List<ProductoDTO> getProductosMasVendidos() {
        List<Object[]> resultados = detalleCarritoRepository.findProductosMasVendidos();
        return resultados.stream()
                .map(resultado -> (Producto) resultado[0])
                .map(this::convertirAProductoDTO)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene productos nuevos (menos de una semana)
     */
    public List<ProductoDTO> getProductosNuevos() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_MONTH, -7);
        Date unaSemanaAtras = calendar.getTime();
        
        List<Producto> productos = productoRepository.findProductosNuevos(unaSemanaAtras);
        return productos.stream()
                .map(this::convertirAProductoDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convierte un Producto a ProductoDTO
     */
    private ProductoDTO convertirAProductoDTO(Producto producto) {
        ProductoDTO dto = new ProductoDTO();
        dto.setId(producto.getIdProducto());
        dto.setNombre(producto.getNombre());
        dto.setDescripcion(producto.getDescripcion());
        dto.setImagen(producto.getImagen());
        dto.setPrecio(producto.getPrecio());
        dto.setStock(producto.getStock());
        dto.setCategoria(producto.getCategoria());
        dto.setMarca(producto.getMarca());
        dto.setDescuento(producto.getDescuento());
        return dto;
    }
}
