package com.example.usuario_api.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "custom_products")
public class CustomProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre_personalizado;
    private BigDecimal precio_final;

    @ManyToOne @JoinColumn(name = "producto_id")
    private Producto producto;

    @ManyToOne @JoinColumn(name = "diseño_id")
    private CustomDesign diseño;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre_personalizado() { return nombre_personalizado; }
    public void setNombre_personalizado(String nombre_personalizado) { this.nombre_personalizado = nombre_personalizado; }

    public BigDecimal getPrecio_final() { return precio_final; }
    public void setPrecio_final(BigDecimal precio_final) { this.precio_final = precio_final; }

    public Producto getProducto() { return producto; }
    public void setProducto(Producto producto) { this.producto = producto; }

    public CustomDesign getDiseño() { return diseño; }
    public void setDiseño(CustomDesign diseño) { this.diseño = diseño; }
}
