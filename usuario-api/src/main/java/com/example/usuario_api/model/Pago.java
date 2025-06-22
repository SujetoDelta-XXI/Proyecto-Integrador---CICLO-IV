package com.example.usuario_api.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "pagos")
public class Pago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fecha_pago;
    private BigDecimal monto;
    private String metodo_pago;
    private String estado_pago;
    private String id_transaccion_externo;

    @ManyToOne @JoinColumn(name = "pedido_id", nullable = false)
    private Pedido pedido;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getFecha_pago() { return fecha_pago; }
    public void setFecha_pago(LocalDate fecha_pago) { this.fecha_pago = fecha_pago; }

    public BigDecimal getMonto() { return monto; }
    public void setMonto(BigDecimal monto) { this.monto = monto; }

    public String getMetodo_pago() { return metodo_pago; }
    public void setMetodo_pago(String metodo_pago) { this.metodo_pago = metodo_pago; }

    public String getEstado_pago() { return estado_pago; }
    public void setEstado_pago(String estado_pago) { this.estado_pago = estado_pago; }

    public String getId_transaccion_externo() { return id_transaccion_externo; }
    public void setId_transaccion_externo(String id_transaccion_externo) { this.id_transaccion_externo = id_transaccion_externo; }

    public Pedido getPedido() { return pedido; }
    public void setPedido(Pedido pedido) { this.pedido = pedido; }
}
