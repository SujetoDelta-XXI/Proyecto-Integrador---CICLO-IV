package com.estiloya.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "carritos")
public class Carrito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCarrito;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private User usuario;

    @OneToMany(mappedBy = "carrito", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetalleCarrito> detalles;

    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaCreacion = new Date();

    // Getters y setters
    public Long getIdCarrito() { return idCarrito; }
    public void setIdCarrito(Long idCarrito) { this.idCarrito = idCarrito; }

    public User getUsuario() { return usuario; }
    public void setUsuario(User usuario) { this.usuario = usuario; }

    public List<DetalleCarrito> getDetalles() { return detalles; }
    public void setDetalles(List<DetalleCarrito> detalles) { this.detalles = detalles; }

    public Date getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(Date fechaCreacion) { this.fechaCreacion = fechaCreacion; }
}
