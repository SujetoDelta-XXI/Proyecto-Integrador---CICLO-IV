package com.example.usuario_api.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    @Column(columnDefinition="TEXT")
    private String descripcion;
    @Column(columnDefinition="TEXT")
    private String imagen;
    private BigDecimal precio;
    private Integer stock;
    private String tipo;              // Polo | Polera
    private LocalDate fecha_creacion;
    private String estado;            // Disponible|Agotado|Preventa

    @ManyToOne @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    @ManyToOne @JoinColumn(name = "descuento_id")
    private Descuento descuento;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getImagen() { return imagen; }
    public void setImagen(String imagen) { this.imagen = imagen; }

    public BigDecimal getPrecio() { return precio; }
    public void setPrecio(BigDecimal precio) { this.precio = precio; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public LocalDate getFecha_creacion() { return fecha_creacion; }
    public void setFecha_creacion(LocalDate fecha_creacion) { this.fecha_creacion = fecha_creacion; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public Categoria getCategoria() { return categoria; }
    public void setCategoria(Categoria categoria) { this.categoria = categoria; }

    public Descuento getDescuento() { return descuento; }
    public void setDescuento(Descuento descuento) { this.descuento = descuento; }
}
