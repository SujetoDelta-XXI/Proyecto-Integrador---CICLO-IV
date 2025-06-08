package com.estiloya.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "Marcas")
public class Marca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMarca;

    private String nombre;
    private String descripcion;

    @OneToMany(mappedBy = "marca")
    private List<Producto> productos;

    // Getters y Setters
}
