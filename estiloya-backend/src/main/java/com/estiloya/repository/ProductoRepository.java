package com.estiloya.repository;

import com.estiloya.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    @Query("SELECT p FROM Producto p WHERE " +
           "LOWER(p.nombre) LIKE LOWER(CONCAT('%', :nombre, '%')) AND " +
           "p.precio <= :precioMax AND " +
           "(:categoria IS NULL OR LOWER(p.categoria.nombre) = LOWER(:categoria))")
    List<Producto> buscarPorNombrePrecioYCategoria(String nombre, BigDecimal precioMax, String categoria);
}
