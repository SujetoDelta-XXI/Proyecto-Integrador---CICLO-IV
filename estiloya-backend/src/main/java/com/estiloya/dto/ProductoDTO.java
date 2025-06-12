package com.estiloya.dto;

import com.estiloya.model.Categoria;
import com.estiloya.model.Marca;
import com.estiloya.model.Descuento;

import java.math.BigDecimal;

public class ProductoDTO {

    // ────────── Atributos ──────────
    private Long id;
    private String nombre;
    private String descripcion;
    private String imagen;
    private BigDecimal precio;
    private int stock;
    private Categoria categoria;
    private Marca marca;
    private Descuento descuento;   // puede ser null

    // ────────── Constructores ──────────
    public ProductoDTO() {
    }

    public ProductoDTO(Long id, String nombre, String descripcion, String imagen,
                       BigDecimal precio, int stock,
                       Categoria categoria, Marca marca, Descuento descuento) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
        this.marca = marca;
        this.descuento = descuento;
    }

    // ────────── Getters & Setters ──────────
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagen() {
        return imagen;
    }
    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public BigDecimal getPrecio() {
        return precio;
    }
    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public int getStock() {
        return stock;
    }
    public void setStock(int stock) {
        this.stock = stock;
    }

    public Categoria getCategoria() {
        return categoria;
    }
    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Marca getMarca() {
        return marca;
    }
    public void setMarca(Marca marca) {
        this.marca = marca;
    }

    public Descuento getDescuento() {
        return descuento;
    }
    public void setDescuento(Descuento descuento) {
        this.descuento = descuento;
    }
}
