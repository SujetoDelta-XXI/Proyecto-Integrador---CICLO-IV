package com.estiloya.controller;

import com.estiloya.dto.ProductoDTO;
import com.estiloya.service.ProductoService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Cambia el puerto si usas otro para el frontend
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    // Endpoint para buscar productos, filtrando por nombre, precio y categoría (filtrado en el Service)
    @GetMapping("/productos/buscar")
    public List<ProductoDTO> buscarProductos(
            @RequestParam(defaultValue = "") String nombre,
            @RequestParam(defaultValue = "200") BigDecimal precioMax,
            @RequestParam(required = false) String categoria
    ) {
        return productoService.buscarPorNombrePrecioYCategoria(nombre, precioMax, categoria);
    }

    // (Opcional) Si quieres un endpoint que devuelva todos los productos sin filtro:
    @GetMapping("/productos")
    public List<ProductoDTO> listarProductos() {
        return productoService.buscarPorNombrePrecioYCategoria("", new BigDecimal("10000"), "");
    }

    // Nuevos endpoints para usuario

    /**
     * Obtiene los 4 productos con mayor descuento
     */
    @GetMapping("/usuario/productos/ofertas-dia")
    public List<ProductoDTO> getOfertasDelDia() {
        return productoService.getOfertasDelDia();
    }

    /**
     * Obtiene los 5 productos con mayor descuento que no tengan más de una semana con el mismo descuento
     */
    @GetMapping("/usuario/productos/ofertas-semana")
    public List<ProductoDTO> getOfertasDeLaSemana() {
        return productoService.getOfertasDeLaSemana();
    }

    /**
     * Obtiene los productos más vendidos basado en detalle carrito
     */
    @GetMapping("/usuario/productos/mas-vendidos")
    public List<ProductoDTO> getProductosMasVendidos() {
        return productoService.getProductosMasVendidos();
    }

    /**
     * Obtiene productos nuevos (menos de una semana)
     */
    @GetMapping("/usuario/productos/nuevos")
    public List<ProductoDTO> getProductosNuevos() {
        return productoService.getProductosNuevos();
    }
}
