package com.example.usuario_api.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.usuario_api.dto.ResumenCompraDto;
import com.example.usuario_api.model.Carrito;
import com.example.usuario_api.model.DetalleCarrito;
import com.example.usuario_api.repository.CarritoRepository;
import com.example.usuario_api.repository.DetalleCarritoRepository;

@Service
public class CarritoService {

    private final CarritoRepository carritoRepo;
    private final DetalleCarritoRepository detalleRepo;

    public CarritoService(CarritoRepository carritoRepo, DetalleCarritoRepository detalleRepo) {
        this.carritoRepo = carritoRepo;
        this.detalleRepo = detalleRepo;
    }

    public List<DetalleCarrito> listarDetalle(Long usuarioId) {
        return detalleRepo.findByUsuarioId(usuarioId);
    }

    @Transactional
    public void agregarItem(Long usuarioId, Long productoId, int cantidad) {
        carritoRepo.deleteAll(carritoRepo.findByUsuarioId(usuarioId));
        Carrito staging = new Carrito();
        staging.setUsuario(new com.example.usuario_api.model.Usuario());
        staging.getUsuario().setId(usuarioId);
        staging.setProducto(new com.example.usuario_api.model.Producto());
        staging.getProducto().setId(productoId);
        staging.setProductoPersonalizado(null);
        carritoRepo.save(staging);

        List<DetalleCarrito> items = detalleRepo.findByUsuarioId(usuarioId);
        items.stream()
            .filter(i -> i.getProducto() != null && i.getProducto().getId().equals(productoId))
            .findFirst()
            .ifPresentOrElse(item -> {
                item.setCantidad(item.getCantidad() + cantidad);
                detalleRepo.save(item);
            }, () -> {
                DetalleCarrito nuevo = new DetalleCarrito();
                nuevo.setUsuario(staging.getUsuario());
                nuevo.setProducto(staging.getProducto());
                nuevo.setCantidad(cantidad);
                detalleRepo.save(nuevo);
            });
    }

    @Transactional
    public void eliminarItem(Long usuarioId, Long itemId) {
        List<DetalleCarrito> items = detalleRepo.findByUsuarioId(usuarioId);
        items.stream()
            .filter(item -> item.getId().equals(itemId))
            .findFirst()
            .ifPresent(detalleRepo::delete);
    }

    @Transactional
    public void actualizarCantidad(Long usuarioId, Long productoId, int nuevaCantidad) {
        List<DetalleCarrito> items = detalleRepo.findByUsuarioId(usuarioId);
        items.stream()
            .filter(i -> i.getProducto() != null && i.getProducto().getId().equals(productoId))
            .findFirst()
            .ifPresent(item -> {
                item.setCantidad(nuevaCantidad);
                detalleRepo.save(item);
            });
    }
public ResumenCompraDto calcularResumen(Long usuarioId) {
    List<DetalleCarrito> items = detalleRepo.findByUsuarioId(usuarioId);

    double subtotal = items.stream()
        .filter(i -> i.getProducto() != null) // seguridad
        .mapToDouble(i -> {
            double precio = i.getProducto().getPrecio().doubleValue();
            double descuento = (i.getProducto().getDescuento() != null)
                ? i.getProducto().getDescuento().getPorcentaje().doubleValue()
                : 0.0;
            double precioFinal = precio * (1 - descuento / 100);
            return precioFinal * i.getCantidad();
        })
        .sum();

    double igv = subtotal * 0.18;
    double envio = 10.0;
    double total = subtotal + igv + envio;

    ResumenCompraDto dto = new ResumenCompraDto();
    dto.setSubtotal(subtotal);
    dto.setIgv(igv);
    dto.setEnvio(envio);
    dto.setTotal(total);
    return dto;
}

@Transactional
public void finalizarCompra(Long usuarioId) {
    List<DetalleCarrito> items = detalleRepo.findByUsuarioId(usuarioId);

    if (items.isEmpty()) {
        throw new IllegalStateException("No hay productos en el carrito");
    }

    // Aquí podrías registrar un pedido si lo deseas (tabla Pedido, etc.)

    // Vaciar el carrito
    detalleRepo.deleteAll(items);
}



}

