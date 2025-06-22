package com.example.usuario_api.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "custom_designs")
public class CustomDesign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition="TEXT")
    private String url_imagen;
    @Column(columnDefinition="TEXT")
    private String descripcion;
    private LocalDate fecha_creacion;
    private String estado;  // aprobado|denegado|pendiente

    @ManyToOne @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUrl_imagen() { return url_imagen; }
    public void setUrl_imagen(String url_imagen) { this.url_imagen = url_imagen; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public LocalDate getFecha_creacion() { return fecha_creacion; }
    public void setFecha_creacion(LocalDate fecha_creacion) { this.fecha_creacion = fecha_creacion; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
}
