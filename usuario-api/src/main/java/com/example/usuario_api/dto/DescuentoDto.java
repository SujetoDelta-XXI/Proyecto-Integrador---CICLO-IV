package com.example.usuario_api.dto;

public class DescuentoDto {
    private Long id;
    private Integer porcentaje;

    // Getters y Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Integer getPorcentaje() {
        return porcentaje;
    }
    public void setPorcentaje(Integer porcentaje) {
        this.porcentaje = porcentaje;
    }
}
