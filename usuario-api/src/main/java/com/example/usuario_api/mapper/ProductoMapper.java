package com.example.usuario_api.mapper;

import com.example.usuario_api.dto.ProductoDto;
import com.example.usuario_api.dto.DescuentoDto;
import com.example.usuario_api.model.Producto;
import org.springframework.stereotype.Component;

@Component
public class ProductoMapper {

    public ProductoDto toDto(Producto p) {
        ProductoDto dto = new ProductoDto();
        dto.setId(p.getId());
        dto.setNombre(p.getNombre());
        dto.setDescripcion(p.getDescripcion());
        dto.setImagen(p.getImagen());
        dto.setPrecio(p.getPrecio());
        dto.setStock(p.getStock());
        dto.setTipo(p.getTipo());
        dto.setEstado(p.getEstado());
        dto.setCategoriaNombre(p.getCategoria() != null ? p.getCategoria().getNombre() : null);

        // Mapear descuento si existe
        if (p.getDescuento() != null) {
            DescuentoDto descuentoDto = new DescuentoDto();
            descuentoDto.setId(p.getDescuento().getId());
            descuentoDto.setPorcentaje(p.getDescuento().getPorcentaje());
            dto.setDescuento(descuentoDto);
        }

        return dto;
    }
}
