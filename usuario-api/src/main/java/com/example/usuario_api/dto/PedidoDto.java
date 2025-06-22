// src/main/java/com/example/usuario_api/dto/PedidoDto.java
package com.example.usuario_api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class PedidoDto {
    private Long id;
    private LocalDate fecha_pedido;
    private BigDecimal total;
    private String estado;
    private String direccion_envio;
    private String telefono;
    // getters & setters...
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFecha_pedido() {
        return fecha_pedido;
    }
    public void setFecha_pedido(LocalDate fecha_pedido) {
        this.fecha_pedido = fecha_pedido;
    }
    public BigDecimal getTotal() {
        return total;
    }
    public void setTotal(BigDecimal total) {
        this.total = total;
    }
    public String getEstado() {
        return estado;
    }
    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getDireccion_envio() {
        return direccion_envio;
    }
    public void setDireccion_envio(String direccion_envio) {
        this.direccion_envio = direccion_envio;
    }
    public String getTelefono() {
        return telefono;
    }
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    

}

