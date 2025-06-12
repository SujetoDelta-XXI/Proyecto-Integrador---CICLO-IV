package com.estiloya.controller;

import com.estiloya.dto.ProductoDTO;
import com.estiloya.service.ProductoService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173") // Cambia el puerto si usas otro para el frontend
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    // Endpoint para buscar productos, filtrando por nombre, precio y categoría (filtrado en el Service)
    @GetMapping("/buscar")
    public List<ProductoDTO> buscarProductos(
            @RequestParam(defaultValue = "") String nombre,
            @RequestParam(defaultValue = "200") BigDecimal precioMax,
            @RequestParam(required = false) String categoria
    ) {
        return productoService.buscarPorNombrePrecioYCategoria(nombre, precioMax, categoria);
    }

    // (Opcional) Si quieres un endpoint que devuelva todos los productos sin filtro:
    @GetMapping
    public List<ProductoDTO> listarProductos() {
        return productoService.buscarPorNombrePrecioYCategoria("", new BigDecimal("10000"), "");
    }
}
