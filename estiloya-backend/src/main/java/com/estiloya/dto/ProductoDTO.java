package com.estiloya.dto;

import java.math.BigDecimal;

public class ProductoDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private String imagen;
    private BigDecimal precio;
    private int stock;
    private String categoria;
    private String marca;
    private Integer descuento;

    // Constructor
    public ProductoDTO(Long id, String nombre, String descripcion, String imagen,
                       BigDecimal precio, int stock, String categoria, String marca, Integer descuento) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
        this.marca = marca;
        this.descuento = descuento;
    }

    // Getters y Setters
}
