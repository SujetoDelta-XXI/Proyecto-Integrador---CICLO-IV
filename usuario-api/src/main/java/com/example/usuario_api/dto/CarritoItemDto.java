// src/main/java/com/example/usuario_api/dto/CarritoItemDto.java
package com.example.usuario_api.dto;

public class CarritoItemDto {
    private Long id;
    private Long productoId;
    private Long productoPersonalizadoId;
    private Integer cantidad;
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
    
}
