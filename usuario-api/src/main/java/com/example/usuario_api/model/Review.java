package com.example.usuario_api.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "reviews",
       uniqueConstraints = @UniqueConstraint(columnNames = {"producto_id","usuario_id"}))
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Short valoracion; 
    @Column(columnDefinition="TEXT")
    private String comentario;
    private LocalDate fecha_reseña;

    @ManyToOne @JoinColumn(name = "producto_id")
    private Producto producto;

    @ManyToOne @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Short getValoracion() { return valoracion; }
    public void setValoracion(Short valoracion) { this.valoracion = valoracion; }

    public String getComentario() { return comentario; }
    public void setComentario(String comentario) { this.comentario = comentario; }

    public LocalDate getFecha_reseña() { return fecha_reseña; }
    public void setFecha_reseña(LocalDate fecha_reseña) { this.fecha_reseña = fecha_reseña; }

    public Producto getProducto() { return producto; }
    public void setProducto(Producto producto) { this.producto = producto; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
}
