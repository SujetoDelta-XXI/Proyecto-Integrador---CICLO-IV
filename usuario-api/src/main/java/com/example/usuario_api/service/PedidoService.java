// src/main/java/com/example/usuario_api/service/PedidoService.java
package com.example.usuario_api.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.usuario_api.exception.ResourceNotFoundException;
import com.example.usuario_api.model.*;
import com.example.usuario_api.repository.*;

@Service
public class PedidoService {

  private final DetalleCarritoRepository detalleCarritoRepo;
  private final PedidoRepository pedidoRepo;
  private final DetalleCompraRepository detalleCompraRepo;
  private final CarritoRepository carritoRepo;

  public PedidoService(
      DetalleCarritoRepository detalleCarritoRepo,
      PedidoRepository pedidoRepo,
      DetalleCompraRepository detalleCompraRepo,
      CarritoRepository carritoRepo
  ) {
    this.detalleCarritoRepo = detalleCarritoRepo;
    this.pedidoRepo         = pedidoRepo;
    this.detalleCompraRepo  = detalleCompraRepo;
    this.carritoRepo        = carritoRepo;
  }

  public List<Pedido> listarPorUsuario(Long usuarioId) {
    return pedidoRepo.findByUsuarioId(usuarioId);
  }

  @Transactional
  public Pedido crearPedidoDesdeCarrito(Long usuarioId) {
    // 1. Leer detalle carrito
    List<DetalleCarrito> items = detalleCarritoRepo.findByUsuarioId(usuarioId);
    if (items.isEmpty()) {
      throw new ResourceNotFoundException("El carrito está vacío");
    }

    // 2. Crear Pedido
    Pedido pedido = new Pedido();
    pedido.setUsuario(new Usuario()); pedido.getUsuario().setId(usuarioId);
    pedido.setFecha_pedido(LocalDate.now());
    pedido.setEstado("Pendiente");
    // calculamos total
    BigDecimal total = items.stream()
        .map(i -> {
          BigDecimal precio = i.getProducto() != null
            ? i.getProducto().getPrecio()
            : i.getProductoPersonalizado().getPrecio_final();
          return precio.multiply(BigDecimal.valueOf(i.getCantidad()));
        })
        .reduce(BigDecimal.ZERO, BigDecimal::add);
    pedido.setTotal(total);

    pedido = pedidoRepo.save(pedido);

    // 3. Crear DetalleCompra
    for (DetalleCarrito i : items) {
      DetalleCompra dc = new DetalleCompra();
      dc.setPedido(pedido);
      dc.setCantidad(i.getCantidad());
      if (i.getProducto() != null) {
        dc.setProducto(i.getProducto());
        dc.setPrecio_unitario(i.getProducto().getPrecio());
      } else {
        dc.setProductoPersonalizado(i.getProductoPersonalizado());
        dc.setPrecio_unitario(i.getProductoPersonalizado().getPrecio_final());
      }
      detalleCompraRepo.save(dc);
    }

    // 4. Limpiar carrito staging y detalle
    carritoRepo.deleteAll(carritoRepo.findByUsuarioId(usuarioId));
    detalleCarritoRepo.deleteAll(items);

    return pedido;
  }
}
