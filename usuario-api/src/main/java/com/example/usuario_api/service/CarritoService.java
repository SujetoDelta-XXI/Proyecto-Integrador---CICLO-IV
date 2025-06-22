// src/main/java/com/example/usuario_api/service/CarritoService.java
package com.example.usuario_api.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.usuario_api.model.Carrito;
import com.example.usuario_api.model.DetalleCarrito;
import com.example.usuario_api.repository.CarritoRepository;
import com.example.usuario_api.repository.DetalleCarritoRepository;

@Service
public class CarritoService {
    private final CarritoRepository carritoRepo;
    private final DetalleCarritoRepository detalleRepo;

    public CarritoService(
        CarritoRepository carritoRepo,
        DetalleCarritoRepository detalleRepo
    ) {
        this.carritoRepo = carritoRepo;
        this.detalleRepo = detalleRepo;
    }

    public List<DetalleCarrito> listarDetalle(Long usuarioId) {
        return detalleRepo.findByUsuarioId(usuarioId);
    }

    @Transactional
    public void agregarItem(Long usuarioId, Long productoId, int cantidad) {
        // 1. Actualizar staging
        carritoRepo.deleteAll(carritoRepo.findByUsuarioId(usuarioId));
        Carrito staging = new Carrito();
        staging.setUsuario(new com.example.usuario_api.model.Usuario());
        staging.getUsuario().setId(usuarioId);
        staging.setProducto(new com.example.usuario_api.model.Producto());
        staging.getProducto().setId(productoId);
        staging.setProductoPersonalizado(null);
        carritoRepo.save(staging);

        // 2. Actualizar detalle
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
}
