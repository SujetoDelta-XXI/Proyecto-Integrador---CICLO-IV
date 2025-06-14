package com.estiloya.dto;

public class AgregarAlCarritoDTO {
    private Long usuarioId; // id del usuario
    private Long productoId; // producto normal (nullable)
    private Long productoPersonalizadoId; // producto personalizado (nullable)
    private Integer cantidad;

    // Getters y setters
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }

    public Long getProductoId() { return productoId; }
    public void setProductoId(Long productoId) { this.productoId = productoId; }

    public Long getProductoPersonalizadoId() { return productoPersonalizadoId; }
    public void setProductoPersonalizadoId(Long productoPersonalizadoId) { this.productoPersonalizadoId = productoPersonalizadoId; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
}
