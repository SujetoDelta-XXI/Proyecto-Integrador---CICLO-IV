package com.example.usuario_api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "imagenes_producto")
public class ImagenProducto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition="TEXT")
    private String url_imagen;

    @ManyToOne @JoinColumn(name = "producto_id")
    private Producto producto;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUrl_imagen() { return url_imagen; }
    public void setUrl_imagen(String url_imagen) { this.url_imagen = url_imagen; }

    public Producto getProducto() { return producto; }
    public void setProducto(Producto producto) { this.producto = producto; }
}
