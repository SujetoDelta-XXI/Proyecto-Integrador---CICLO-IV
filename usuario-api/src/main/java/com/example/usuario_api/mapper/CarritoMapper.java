// src/main/java/com/example/usuario_api/mapper/CarritoMapper.java
package com.example.usuario_api.mapper;

import com.example.usuario_api.dto.CarritoItemDto;

import com.example.usuario_api.model.DetalleCarrito;
import org.springframework.stereotype.Component;

@Component
public class CarritoMapper {

    public CarritoItemDto toDto(DetalleCarrito detalle) {
        CarritoItemDto dto = new CarritoItemDto();
        dto.setId(detalle.getId());
        dto.setCantidad(detalle.getCantidad());

        if (detalle.getProducto() != null) {
            dto.setProductoId(detalle.getProducto().getId());
            dto.setNombre(detalle.getProducto().getNombre());
            dto.setImagen(detalle.getProducto().getImagen());
            dto.setPrecio(detalle.getProducto().getPrecio().doubleValue());

            if (detalle.getProducto().getDescuento() != null) {
                dto.setDescuento(detalle.getProducto().getDescuento().getPorcentaje());
            } else {
                dto.setDescuento(0); // sin descuento
            }
        }

        if (detalle.getProductoPersonalizado() != null) {
            dto.setProductoPersonalizadoId(detalle.getProductoPersonalizado().getId());
            // También puedes mapear info del personalizado si lo deseas
        }

        return dto;
    }
}

