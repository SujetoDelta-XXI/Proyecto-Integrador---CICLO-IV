package com.estiloya.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "Categorias")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCategoria;

    private String nombre;
    private String descripcion;

    // Opcional: relación inversa
    @OneToMany(mappedBy = "categoria")
    private List<Producto> productos;

    // Getters y Setters
}
