package com.example.usuario_api.service;

import com.example.usuario_api.model.*;
import com.example.usuario_api.repository.*;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@Service
public class StripeService {

    private final PedidoRepository pedidoRepo;
    private final DetalleCompraRepository detalleCompraRepo;
    private final PagoRepository pagoRepo;
    private final DetalleCarritoRepository detalleCarritoRepo;
    private final UsuarioRepository usuarioRepo;
    private final EmailService emailService;

    public StripeService(
            PedidoRepository pedidoRepo,
            DetalleCompraRepository detalleCompraRepo,
            PagoRepository pagoRepo,
            DetalleCarritoRepository detalleCarritoRepo,
            UsuarioRepository usuarioRepo,
            EmailService emailService
    ) {
        this.pedidoRepo = pedidoRepo;
        this.detalleCompraRepo = detalleCompraRepo;
        this.pagoRepo = pagoRepo;
        this.detalleCarritoRepo = detalleCarritoRepo;
        this.usuarioRepo = usuarioRepo;
        this.emailService = emailService;
    }

    @Transactional
    public Map<String, Object> crearPagoIntent(Long usuarioId, String direccion, String telefono) throws StripeException {
        List<DetalleCarrito> items = detalleCarritoRepo.findByUsuarioId(usuarioId);
        if (items.isEmpty()) {
            throw new IllegalStateException("Carrito vacío");
        }

        BigDecimal total = items.stream()
                .map(i -> {
                    BigDecimal precio = i.getProducto() != null
                            ? i.getProducto().getPrecio()
                            : i.getProductoPersonalizado().getPrecio_final();
                    return precio.multiply(BigDecimal.valueOf(i.getCantidad()));
                })
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(total.multiply(BigDecimal.valueOf(100)).longValue())
                .setCurrency("pen")
                .build();

        PaymentIntent intent = PaymentIntent.create(params);

        Pedido pedido = new Pedido();
        Usuario usuario = new Usuario();
        usuario.setId(usuarioId);
        pedido.setUsuario(usuario);
        pedido.setDireccion_envio(direccion);
        pedido.setTelefono(telefono);
        pedido.setFecha_pedido(LocalDate.now());
        pedido.setEstado("Pendiente");
        pedido.setTotal(total);
        pedido.setStripePaymentId(intent.getId());
        pedido = pedidoRepo.save(pedido);

        for (DetalleCarrito item : items) {
            DetalleCompra dc = new DetalleCompra();
            dc.setPedido(pedido);
            dc.setCantidad(item.getCantidad());
            if (item.getProducto() != null) {
                dc.setProducto(item.getProducto());
                dc.setPrecio_unitario(item.getProducto().getPrecio());
            } else {
                dc.setProductoPersonalizado(item.getProductoPersonalizado());
                dc.setPrecio_unitario(item.getProductoPersonalizado().getPrecio_final());
            }
            detalleCompraRepo.save(dc);
        }

        return Map.of("clientSecret", intent.getClientSecret());
    }

    @Transactional
    public void confirmarPago(String paymentIntentId, Long userId) throws StripeException {
        PaymentIntent intent = PaymentIntent.retrieve(paymentIntentId);

        if ("succeeded".equals(intent.getStatus())) {
            Pedido pedido = pedidoRepo.findByStripePaymentId(paymentIntentId)
                    .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));

            if ("PAGADO".equals(pedido.getEstado())) {
                System.out.println("⚠️ Pedido ya marcado como pagado, ignorando confirmación repetida");
                return;
            }

            pedido.setEstado("PAGADO");
            pedidoRepo.save(pedido);

            Pago pago = new Pago();
            pago.setPedido(pedido);
            pago.setMonto(pedido.getTotal());
            pago.setFecha_pago(LocalDate.now());
            pagoRepo.save(pago);

            detalleCarritoRepo.deleteAll(detalleCarritoRepo.findByUsuarioId(pedido.getUsuario().getId()));

            String correoDestino = usuarioRepo.findById(pedido.getUsuario().getId())
                    .map(Usuario::getCorreo)
                    .orElseThrow(() -> new RuntimeException("Correo no encontrado"));

            String texto = """
Hola %s,

Tu pago con un total de S/ %.2f ha sido confirmado exitosamente.

¡Gracias por comprar en EstiloYa!
""".formatted(
    pedido.getUsuario().getNombre(),
    pedido.getTotal()
);

            emailService.sendSimpleMessage(
                    correoDestino,
                    "Confirmación de compra",
                    texto
            );

            System.out.println("✅ Pedido confirmado, carrito limpiado y correo de confirmación enviado a " + pedido.getUsuario().getId());
        } else {
            throw new RuntimeException("El pago no se completó: " + intent.getStatus());
        }
    }

}
