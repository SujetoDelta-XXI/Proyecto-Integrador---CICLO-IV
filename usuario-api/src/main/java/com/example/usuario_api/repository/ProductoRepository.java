// src/main/java/com/example/usuario_api/repository/ProductoRepository.java
package com.example.usuario_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.usuario_api.model.Producto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.math.BigDecimal;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    Page<Producto> findByCategoriaIdAndPrecioBetween(
        Long categoriaId,
        BigDecimal minPrecio,
        BigDecimal maxPrecio,
        Pageable pageable
    );
    Page<Producto> findByPrecioBetween(BigDecimal min, BigDecimal max, Pageable pageable);



}

