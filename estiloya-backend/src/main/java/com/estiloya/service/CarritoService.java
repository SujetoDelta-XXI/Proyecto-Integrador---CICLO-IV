package com.estiloya.service;

import com.estiloya.dto.AgregarAlCarritoDTO;
import com.estiloya.model.*;
import com.estiloya.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CarritoService {

    @Autowired
    private CarritoRepository carritoRepository;

    @Autowired
    private DetalleCarritoRepository detalleCarritoRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductoRepository productoRepository;

    // Si tienes ProductoPersonalizadoRepository, autowired aquí

    public Carrito agregarAlCarrito(AgregarAlCarritoDTO dto) {
        User usuario = userRepository.findById(dto.getUsuarioId())
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Buscar si ya tiene un carrito
        Carrito carrito = carritoRepository.findByUsuario(usuario)
            .orElseGet(() -> {
                Carrito nuevo = new Carrito();
                nuevo.setUsuario(usuario);
                return carritoRepository.save(nuevo);
            });

        DetalleCarrito detalle = new DetalleCarrito();
        detalle.setCarrito(carrito);

        if (dto.getProductoId() != null) {
            Producto producto = productoRepository.findById(dto.getProductoId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
            detalle.setProducto(producto);
        } else if (dto.getProductoPersonalizadoId() != null) {
            detalle.setIdProductoPersonalizado(dto.getProductoPersonalizadoId());
        } else {
            throw new RuntimeException("ProductoId o ProductoPersonalizadoId requerido");
        }

        detalle.setCantidad(dto.getCantidad());
        detalleCarritoRepository.save(detalle);

        // Opcional: agregar a la lista en el carrito
        if (carrito.getDetalles() == null) {
            carrito.setDetalles(Collections.singletonList(detalle));
        } else {
            carrito.getDetalles().add(detalle);
        }
        carritoRepository.save(carrito);

        return carrito;
    }
}
