package com.estiloya.repository;

import com.estiloya.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    @Query("SELECT p FROM Producto p WHERE " +
           "LOWER(p.nombre) LIKE LOWER(CONCAT('%', :nombre, '%')) AND " +
           "p.precio <= :precioMax AND " +
           "(:categoria IS NULL OR LOWER(p.categoria.nombre) = LOWER(:categoria))")
    List<Producto> buscarPorNombrePrecioYCategoria(String nombre, BigDecimal precioMax, String categoria);

    // Obtener productos con mayor descuento (limitado a 4)
    @Query(value = "SELECT * FROM Productos p WHERE p.id_descuento IS NOT NULL ORDER BY (SELECT porcentaje FROM Descuentos d WHERE d.id_descuento = p.id_descuento) DESC LIMIT 4", nativeQuery = true)
    List<Producto> findTop4ByDescuentoOrderByPorcentajeDesc();

    // Obtener productos con mayor descuento que no tengan más de una semana con el mismo descuento (limitado a 5)
    @Query(value = "SELECT * FROM Productos p WHERE p.id_descuento IS NOT NULL AND p.fecha_creacion >= :unaSemanaAtras ORDER BY (SELECT porcentaje FROM Descuentos d WHERE d.id_descuento = p.id_descuento) DESC LIMIT 5", nativeQuery = true)
    List<Producto> findTop5ByDescuentoAndFechaCreacionAfterOrderByPorcentajeDesc(@Param("unaSemanaAtras") Date unaSemanaAtras);

    // Obtener productos nuevos (menos de una semana)
    @Query(value = "SELECT * FROM Productos p WHERE p.fecha_creacion >= :unaSemanaAtras ORDER BY p.fecha_creacion DESC", nativeQuery = true)
    List<Producto> findProductosNuevos(@Param("unaSemanaAtras") Date unaSemanaAtras);
}
