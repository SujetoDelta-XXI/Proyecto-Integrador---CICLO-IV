package com.estiloya.repository;

import com.estiloya.model.DetalleCarrito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DetalleCarritoRepository extends JpaRepository<DetalleCarrito, Long> {
    
    // Obtener productos más vendidos basado en la cantidad total vendida
    @Query("SELECT dc.producto, SUM(dc.cantidad) as totalVendido FROM DetalleCarrito dc " +
           "WHERE dc.producto IS NOT NULL " +
           "GROUP BY dc.producto " +
           "ORDER BY totalVendido DESC")
    List<Object[]> findProductosMasVendidos();
}
