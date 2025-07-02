package com.example.usuario_api.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "pedidos")
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fecha_pedido;
    private BigDecimal total;
    private String estado;       // Pendiente, etc.
    @Column(columnDefinition="TEXT")
    private String direccion_envio;
    private String telefono;

    @ManyToOne @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    @Column(name = "stripe_payment_id")
private String stripePaymentId;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getFecha_pedido() { return fecha_pedido; }
    public void setFecha_pedido(LocalDate fecha_pedido) { this.fecha_pedido = fecha_pedido; }

    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getDireccion_envio() { return direccion_envio; }
    public void setDireccion_envio(String direccion_envio) { this.direccion_envio = direccion_envio; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public String getStripePaymentId() { return stripePaymentId; }
public void setStripePaymentId(String stripePaymentId) { this.stripePaymentId = stripePaymentId; }
}

