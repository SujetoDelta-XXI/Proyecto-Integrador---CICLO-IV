package com.estiloya.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "Productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProducto;

    private String nombre;
    private String descripcion;
    private String imagen;
    private BigDecimal precio;
    private int stock;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    @ManyToOne
    @JoinColumn(name = "id_marca")
    private Marca marca;

    @ManyToOne
    @JoinColumn(name = "id_descuento")
    private Descuento descuento;

    @Temporal(TemporalType.DATE)
    private Date fechaCreacion = new Date();

    private String estado = "activo";

    // Getters y Setters
}
