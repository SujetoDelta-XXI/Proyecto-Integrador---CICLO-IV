package com.estiloya.service;

import com.estiloya.dto.ProductoDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductoService {

    private final RestTemplate restTemplate;

    public ProductoService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * Devuelve la lista filtrada por nombre, precio máximo y nombre de categoría.
     * @param nombre     texto a buscar (case-insensitive)
     * @param precioMax  precio máximo
     * @param categoria  nombre de la categoría ("" para todas)
     */
    public List<ProductoDTO> buscarPorNombrePrecioYCategoria(
            String nombre, BigDecimal precioMax, String categoria) {

        // 1. Trae el array completo desde la API Django
        ProductoDTO[] productos = restTemplate.getForObject(
                "http://127.0.0.1:8000/api/productos/",
                ProductoDTO[].class
        );

        return Arrays.stream(productos)
        /* ─ nombre ─ */
        .filter(p -> nombre.isBlank()
                || p.getNombre().toLowerCase().contains(nombre.toLowerCase()))
        /* ─ precio con descuento ─ */
        .filter(p -> {
            BigDecimal original = p.getPrecio();                     // precio base
            int porcDto         = p.getDescuento() != null
                                  ? p.getDescuento().getPorcentaje()
                                  : 0;
            BigDecimal finalPrice = original.subtract(
                    original.multiply(BigDecimal.valueOf(porcDto))
                            .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP)
            );
            return finalPrice.compareTo(precioMax) <= 0;
        })
        /* ─ categoría ─ */
        .filter(p -> categoria == null || categoria.isBlank()
                || (p.getCategoria() != null
                    && p.getCategoria().getNombre().equalsIgnoreCase(categoria)))
        .collect(Collectors.toList());
    }
}
