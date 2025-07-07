package com.example.usuario_api.mapper;

import com.example.usuario_api.dto.PedidoDto;
import com.example.usuario_api.model.Pedido;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-07T02:50:30-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 24.0.1 (Oracle Corporation)"
)
@Component
public class PedidoMapperImpl implements PedidoMapper {

    @Override
    public PedidoDto toDto(Pedido p) {
        if ( p == null ) {
            return null;
        }

        PedidoDto pedidoDto = new PedidoDto();

        pedidoDto.setId( p.getId() );
        pedidoDto.setFecha_pedido( p.getFecha_pedido() );
        pedidoDto.setTotal( p.getTotal() );
        pedidoDto.setEstado( p.getEstado() );
        pedidoDto.setDireccion_envio( p.getDireccion_envio() );
        pedidoDto.setTelefono( p.getTelefono() );

        return pedidoDto;
    }
}
