// src/main/java/com/example/usuario_api/dto/CarritoItemDto.java
package com.example.usuario_api.dto;

public class CarritoItemDto {
    private Long id;
    private Long productoId;
    private Long productoPersonalizadoId;
    private Integer cantidad;
    private String nombre;
    private String imagen;
    private Double precio;
    private Integer descuento; // en porcentaje

    // getters & setters...
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getProductoId() {
        return productoId;
    }
    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }
    public Long getProductoPersonalizadoId() {
        return productoPersonalizadoId;
    }
    public void setProductoPersonalizadoId(Long productoPersonalizadoId) {
        this.productoPersonalizadoId = productoPersonalizadoId;
    }
    public Integer getCantidad() {
        return cantidad;
    }
    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getImagen() {
        return imagen;
    }
    public void setImagen(String imagen) {
        this.imagen = imagen;
    }
    public Double getPrecio() {
        return precio;
    }
    public void setPrecio(Double precio) {
        this.precio = precio;
    }
    public Integer getDescuento() {
        return descuento;
    }
    public void setDescuento(Integer descuento) {
        this.descuento = descuento;
    }


}
