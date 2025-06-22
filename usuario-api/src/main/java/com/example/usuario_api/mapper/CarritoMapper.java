// src/main/java/com/example/usuario_api/mapper/CarritoMapper.java
package com.example.usuario_api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.example.usuario_api.dto.CarritoItemDto;
import com.example.usuario_api.model.DetalleCarrito;

@Mapper(componentModel = "spring")
public interface CarritoMapper {
    @Mapping(source = "producto.id", target = "productoId")
    @Mapping(source = "productoPersonalizado.id", target = "productoPersonalizadoId")
    CarritoItemDto toDto(DetalleCarrito d);
}
