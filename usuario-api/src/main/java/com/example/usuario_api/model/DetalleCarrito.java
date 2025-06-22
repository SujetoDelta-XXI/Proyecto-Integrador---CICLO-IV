package com.example.usuario_api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "detalle_carrito",
       uniqueConstraints = {
         @UniqueConstraint(columnNames = {"usuario_id","producto_id"}),
         @UniqueConstraint(columnNames = {"usuario_id","producto_personalizado_id"})
       })
public class DetalleCarrito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne @JoinColumn(name = "producto_id")
    private Producto producto;

    @ManyToOne @JoinColumn(name = "producto_personalizado_id")
    private CustomProduct productoPersonalizado;

    private Integer cantidad;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public Producto getProducto() { return producto; }
    public void setProducto(Producto producto) { this.producto = producto; }

    public CustomProduct getProductoPersonalizado() { return productoPersonalizado; }
    public void setProductoPersonalizado(CustomProduct productoPersonalizado) { this.productoPersonalizado = productoPersonalizado; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
}
