package com.example.usuario_api.controller;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.usuario_api.dto.ProductoDto;
import com.example.usuario_api.exception.ResourceNotFoundException;
import com.example.usuario_api.mapper.ProductoMapper;
import com.example.usuario_api.service.ProductoService;


@RestController
@RequestMapping("/api/usuario/productos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {

    private final ProductoService service;
    private final ProductoMapper mapper;

    public ProductoController(ProductoService service, ProductoMapper mapper) {
        this.service = service;
        this.mapper  = mapper;
    }

    @GetMapping
    public Page<ProductoDto> list(
            @RequestParam Optional<Long> categoria,
            @RequestParam Optional<BigDecimal> minPrecio,
            @RequestParam Optional<BigDecimal> maxPrecio,
            Pageable pageable) {
        return service.listar(categoria, minPrecio, maxPrecio, pageable)
                      .map(mapper::toDto);
    }

    @GetMapping("/{id}")
    public ProductoDto getOne(@PathVariable Long id) {
        return service.porId(id)
                      .map(mapper::toDto)
                      .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
    }
}
