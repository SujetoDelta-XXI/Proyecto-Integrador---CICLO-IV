// src/main/java/com/example/usuario_api/service/ProductoService.java
package com.example.usuario_api.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    BigDecimal min = minPrecio.orElse(BigDecimal.ZERO);
    BigDecimal max = maxPrecio.orElse(BigDecimal.valueOf(Double.MAX_VALUE));

    if (categoriaId.isPresent()) {
        return repo.findByCategoriaIdAndPrecioBetween(
            categoriaId.get(), min, max, pageable);
    } else {
        return repo.findByPrecioBetween(min, max, pageable); // ✅ Nuevo método
    }
}

    public Optional<Producto> porId(Long id) {
        return repo.findById(id);
    }

    // Obtener los 4 productos con mayor descuento (ofertas del día)
    public List<Producto> obtenerOfertasDelDia() {
        List<Producto> productos = repo.findTop4ByDescuentoOrderByPorcentajeDesc();
        return productos.stream().limit(4).collect(Collectors.toList());
    }

    // Obtener 5 productos con descuento que no tengan más de una semana
    public List<Producto> obtenerOfertasDeLaSemana() {
        LocalDate fechaLimite = LocalDate.now().minusWeeks(1);
        List<Producto> productos = repo.findTop5ByDescuentoAndFechaCreacionAfterOrderByPorcentajeDesc(fechaLimite);
        return productos.stream().limit(5).collect(Collectors.toList());
    }

    // Obtener productos más vendidos (máximo 4)
    public List<Producto> obtenerProductosMasVendidos() {
        List<Object[]> resultados = repo.findProductosMasVendidos();
        return resultados.stream()
                .limit(4)
                .map(resultado -> (Producto) resultado[0])
                .collect(Collectors.toList());
    }

    // Obtener productos nuevos (menos de una semana)
    public List<Producto> obtenerProductosNuevos() {
        LocalDate fechaLimite = LocalDate.now().minusWeeks(1);
        return repo.findProductosNuevos(fechaLimite);
    }
}
