// src/main/java/com/example/usuario_api/dto/ProductoDto.java
package com.example.usuario_api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ProductoDto {
    private Long id;
    private String nombre;
    private String descripcion;
    private String imagen;
    private BigDecimal precio;
    private Integer stock;
    private String tipo;
    private String estado;
    private String categoria;
    private Integer descuento;
    private LocalDate fecha_creacion;
    // getters & setters...
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    public String getImagen() {
        return imagen;
    }
    public void setImagen(String imagen) {
        this.imagen = imagen;
    }
    public BigDecimal getPrecio() {
        return precio;
    }
    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }
    public Integer getStock() {
        return stock;
    }
    public void setStock(Integer stock) {
        this.stock = stock;
    }
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    public String getEstado() {
        return estado;
    }
    public void setEstado(String estado) {
        this.estado = estado;
    }
    public String getCategoria() {
        return categoria;
    }
    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
    public Integer getDescuento() {
        return descuento;
    }
    public void setDescuento(Integer descuento) {
        this.descuento = descuento;
    }
    public LocalDate getFecha_creacion() {
        return fecha_creacion;
    }
    public void setFecha_creacion(LocalDate fecha_creacion) {
        this.fecha_creacion = fecha_creacion;
    }
    
}

