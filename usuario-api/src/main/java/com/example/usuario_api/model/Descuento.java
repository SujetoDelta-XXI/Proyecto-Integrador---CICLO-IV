package com.example.usuario_api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "descuentos")
public class Descuento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer porcentaje;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getPorcentaje() { return porcentaje; }
    public void setPorcentaje(Integer porcentaje) { this.porcentaje = porcentaje; }
}
