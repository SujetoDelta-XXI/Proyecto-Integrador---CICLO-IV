package com.estiloya.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "Descuentos")
public class Descuento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDescuento;

    private Integer porcentaje;

    @OneToMany(mappedBy = "descuento")
    private List<Producto> productos;

    // Getters y Setters
}
