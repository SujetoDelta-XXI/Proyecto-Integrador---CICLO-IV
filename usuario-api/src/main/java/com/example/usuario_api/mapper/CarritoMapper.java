package com.example.usuario_api.mapper;

import org.springframework.stereotype.Component;

import com.example.usuario_api.dto.CarritoItemDto;
import com.example.usuario_api.model.DetalleCarrito;
import com.example.usuario_api.model.Producto;

@Component
public class CarritoMapper {

    public CarritoItemDto toDto(DetalleCarrito item) {
        CarritoItemDto dto = new CarritoItemDto();
        dto.setId(item.getId());
        dto.setCantidad(item.getCantidad());

        Producto producto = item.getProducto();
        if (producto != null) {
            dto.setProductoId(producto.getId());
            dto.setNombre(producto.getNombre());
            dto.setImagen(producto.getImagen());
            dto.setPrecio(producto.getPrecio().doubleValue());
            dto.setDescuento(producto.getDescuento() != null
                ? producto.getDescuento().getPorcentaje()
                : 0);
        }

        if (item.getProductoPersonalizado() != null) {
            dto.setProductoPersonalizadoId(item.getProductoPersonalizado().getId());
            // Si lo deseas, podrías también mapear nombre, imagen, precio desde productoPersonalizado
        }

        return dto;
    }
}
