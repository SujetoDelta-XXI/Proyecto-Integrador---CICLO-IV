// src/main/java/com/example/usuario_api/repository/ProductoRepository.java
package com.example.usuario_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.usuario_api.model.Producto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    Page<Producto> findByCategoriaIdAndPrecioBetween(
        Long categoriaId,
        BigDecimal minPrecio,
        BigDecimal maxPrecio,
        Pageable pageable
    );
    Page<Producto> findByPrecioBetween(BigDecimal min, BigDecimal max, Pageable pageable);

    // Obtener productos con mayor descuento (para ofertas del día)
    @Query("SELECT p FROM Producto p WHERE p.descuento IS NOT NULL ORDER BY p.descuento.porcentaje DESC")
    List<Producto> findTop4ByDescuentoOrderByPorcentajeDesc();

    // Obtener productos con descuento que no tengan más de una semana
    @Query("SELECT p FROM Producto p WHERE p.descuento IS NOT NULL AND p.fecha_creacion >= :fechaLimite ORDER BY p.descuento.porcentaje DESC")
    List<Producto> findTop5ByDescuentoAndFechaCreacionAfterOrderByPorcentajeDesc(@Param("fechaLimite") LocalDate fechaLimite);

    // Obtener productos más vendidos basado en detalle carrito
    @Query("SELECT p, SUM(dc.cantidad) as totalVendido FROM Producto p " +
           "LEFT JOIN DetalleCarrito dc ON p.id = dc.producto.id " +
           "GROUP BY p.id, p.nombre, p.descripcion, p.imagen, p.precio, p.stock, p.tipo, p.fecha_creacion, p.estado, p.categoria, p.descuento " +
           "ORDER BY totalVendido DESC NULLS LAST")
    List<Object[]> findProductosMasVendidos();

    // Obtener productos nuevos (menos de una semana)
    @Query("SELECT p FROM Producto p WHERE p.fecha_creacion >= :fechaLimite ORDER BY p.fecha_creacion DESC")
    List<Producto> findProductosNuevos(@Param("fechaLimite") LocalDate fechaLimite);
}

