// src/main/java/com/example/usuario_api/mapper/PedidoMapper.java
package com.example.usuario_api.mapper;

import org.mapstruct.Mapper;
import com.example.usuario_api.dto.PedidoDto;
import com.example.usuario_api.model.Pedido;

@Mapper(componentModel = "spring")
public interface PedidoMapper {
    PedidoDto toDto(Pedido p);
}
