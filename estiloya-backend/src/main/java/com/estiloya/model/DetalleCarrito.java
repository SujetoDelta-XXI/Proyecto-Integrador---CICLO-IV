package com.estiloya.model;

import jakarta.persistence.*;

@Entity
@Table(name = "detalle_carrito")
public class DetalleCarrito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDetalleCarrito;

    @ManyToOne
    @JoinColumn(name = "id_carrito")
    private Carrito carrito;

    // Producto normal
    @ManyToOne
    @JoinColumn(name = "id_producto", nullable = true)
    private Producto producto;

    // Producto personalizado (nullable)
    @Column(name = "id_producto_personalizado", nullable = true)
    private Long idProductoPersonalizado;

    private Integer cantidad;

    // Getters y setters
    public Long getIdDetalleCarrito() { return idDetalleCarrito; }
    public void setIdDetalleCarrito(Long idDetalleCarrito) { this.idDetalleCarrito = idDetalleCarrito; }

    public Carrito getCarrito() { return carrito; }
    public void setCarrito(Carrito carrito) { this.carrito = carrito; }

    public Producto getProducto() { return producto; }
    public void setProducto(Producto producto) { this.producto = producto; }

    public Long getIdProductoPersonalizado() { return idProductoPersonalizado; }
    public void setIdProductoPersonalizado(Long idProductoPersonalizado) { this.idProductoPersonalizado = idProductoPersonalizado; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
}
