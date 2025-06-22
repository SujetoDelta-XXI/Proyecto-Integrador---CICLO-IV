// src/main/java/com/example/usuario_api/mapper/ProductoMapper.java
package com.example.usuario_api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.example.usuario_api.dto.ProductoDto;
import com.example.usuario_api.model.Producto;

@Mapper(componentModel = "spring")
public interface ProductoMapper {
    @Mapping(source = "categoria.nombre", target = "categoria")
    @Mapping(source = "descuento.porcentaje", target = "descuento")
    ProductoDto toDto(Producto p);
}

