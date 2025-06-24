package com.example.usuario_api.mapper;

import com.example.usuario_api.dto.CategoriaDto;
import com.example.usuario_api.model.Categoria;
import org.springframework.stereotype.Component;

@Component
public class CategoriaMapper {
    public CategoriaDto toDto(Categoria categoria) {
        CategoriaDto dto = new CategoriaDto();
        dto.setId(categoria.getId());
        dto.setNombre(categoria.getNombre());
        return dto;
    }
}
