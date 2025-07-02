package com.example.usuario_api.controller;

import com.example.usuario_api.dto.ProductoDto;
import com.example.usuario_api.mapper.ProductoMapper;
import com.example.usuario_api.model.Producto;
import com.example.usuario_api.service.ProductoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/usuario/productos")
public class ProductoController {

    private final ProductoService service;
    private final ProductoMapper mapper;

    public ProductoController(ProductoService service, ProductoMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    public Page<ProductoDto> listarProductos(
            @RequestParam Optional<Long> categoriaId,
            @RequestParam Optional<BigDecimal> minPrecio,
            @RequestParam Optional<BigDecimal> maxPrecio,
            Pageable pageable
    ) {
        Page<Producto> productos = service.listar(categoriaId, minPrecio, maxPrecio, pageable);
        return productos.map(mapper::toDto);
    }

    @GetMapping("/{id}")
    public ProductoDto obtenerPorId(@PathVariable Long id) {
        Producto producto = service.porId(id).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        return mapper.toDto(producto);
    }

    @GetMapping("/ofertas-dia")
    public List<ProductoDto> obtenerOfertasDelDia() {
        List<Producto> productos = service.obtenerOfertasDelDia();
        return productos.stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @GetMapping("/ofertas-semana")
    public List<ProductoDto> obtenerOfertasDeLaSemana() {
        List<Producto> productos = service.obtenerOfertasDeLaSemana();
        return productos.stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @GetMapping("/mas-vendidos")
    public List<ProductoDto> obtenerProductosMasVendidos() {
        List<Producto> productos = service.obtenerProductosMasVendidos();
        return productos.stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @GetMapping("/nuevos")
    public List<ProductoDto> obtenerProductosNuevos() {
        List<Producto> productos = service.obtenerProductosNuevos();
        return productos.stream().map(mapper::toDto).collect(Collectors.toList());
    }
}
