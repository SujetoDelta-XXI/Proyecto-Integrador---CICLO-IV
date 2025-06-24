package com.example.usuario_api.dto;

import java.math.BigDecimal;

public class ProductoDto {
    private Long id;
    private String nombre;
    private String descripcion;
    private String imagen;
    private BigDecimal precio;
    private Integer stock;
    private String tipo;
    private String estado;

    private String categoriaNombre;         // <-- Necesario para el mapper
    private Integer descuentoPorcentaje;    // <-- Necesario para el mapper
    private DescuentoDto descuento;
    
// + getter y setter para `descuento`


    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getImagen() { return imagen; }
    public void setImagen(String imagen) { this.imagen = imagen; }

    public BigDecimal getPrecio() { return precio; }
    public void setPrecio(BigDecimal precio) { this.precio = precio; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getCategoriaNombre() { return categoriaNombre; }
    public void setCategoriaNombre(String categoriaNombre) { this.categoriaNombre = categoriaNombre; }

    public Integer getDescuentoPorcentaje() { return descuentoPorcentaje; }
    public void setDescuentoPorcentaje(Integer descuentoPorcentaje) { this.descuentoPorcentaje = descuentoPorcentaje; }
    public DescuentoDto getDescuento() {
        return descuento;
    }
    public void setDescuento(DescuentoDto descuento) {
        this.descuento = descuento;
}
}