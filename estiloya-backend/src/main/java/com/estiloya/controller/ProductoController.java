package com.estiloya.controller;

import com.estiloya.dto.ProductoDTO;
import com.estiloya.service.ProductoService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping("/buscar")
    public List<ProductoDTO> buscarProductos(
            @RequestParam(defaultValue = "") String nombre,
            @RequestParam(defaultValue = "10000") BigDecimal precioMax,
            @RequestParam(required = false) String categoria) {
        return productoService.buscarPorNombrePrecioYCategoria(nombre, precioMax, categoria);
    }
}

