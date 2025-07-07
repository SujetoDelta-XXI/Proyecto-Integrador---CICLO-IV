package com.example.usuario_api.dto;

import java.time.LocalDate;

public class DisenoDto {
    private Long id;
    private String urlImagen;
    private String descripcion;
    private LocalDate fechaCreacion;
    private String estado;
    private Long usuarioId;
    private String nombreUsuario;

    // Constructors
    public DisenoDto() {}

    public DisenoDto(Long id, String urlImagen, String descripcion, LocalDate fechaCreacion, String estado, Long usuarioId, String nombreUsuario) {
        this.id = id;
        this.urlImagen = urlImagen;
        this.descripcion = descripcion;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
        this.usuarioId = usuarioId;
        this.nombreUsuario = nombreUsuario;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUrlImagen() { return urlImagen; }
    public void setUrlImagen(String urlImagen) { this.urlImagen = urlImagen; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public LocalDate getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDate fechaCreacion) { this.fechaCreacion = fechaCreacion; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }

    public String getNombreUsuario() { return nombreUsuario; }
    public void setNombreUsuario(String nombreUsuario) { this.nombreUsuario = nombreUsuario; }
} 