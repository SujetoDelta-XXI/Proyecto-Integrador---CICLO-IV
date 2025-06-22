// src/main/java/com/example/usuario_api/service/ProductoService.java
package com.example.usuario_api.service;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.usuario_api.model.Producto;
import com.example.usuario_api.repository.ProductoRepository;

@Service
public class ProductoService {
    private final ProductoRepository repo;

    public ProductoService(ProductoRepository repo) {
        this.repo = repo;
    }

    public Page<Producto> listar(
        Optional<Long> categoriaId,
        Optional<BigDecimal> minPrecio,
        Optional<BigDecimal> maxPrecio,
        Pageable pageable
    ) {
        return repo.findByCategoriaIdAndPrecioBetween(
            categoriaId.orElse(null),
            minPrecio.orElse(BigDecimal.ZERO),
            maxPrecio.orElse(BigDecimal.valueOf(Double.MAX_VALUE)),
            pageable
        );
    }

    public Optional<Producto> porId(Long id) {
        return repo.findById(id);
    }
}
