package com.example.usuario_api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "carritos")
public class Carrito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne @JoinColumn(name = "producto_id")
    private Producto producto;

    @ManyToOne @JoinColumn(name = "producto_personalizado_id")
    private CustomProduct productoPersonalizado;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public Producto getProducto() { return producto; }
    public void setProducto(Producto producto) { this.producto = producto; }

    public CustomProduct getProductoPersonalizado() { return productoPersonalizado; }
    public void setProductoPersonalizado(CustomProduct productoPersonalizado) { this.productoPersonalizado = productoPersonalizado; }
}
