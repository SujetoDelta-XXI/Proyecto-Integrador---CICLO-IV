package com.example.usuario_api.mapper;

import org.mapstruct.Mapper;
import com.example.usuario_api.model.Usuario;
import com.example.usuario_api.dto.UsuarioDto;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {
  UsuarioDto toDto(Usuario usuario);
  Usuario toEntity(UsuarioDto dto);
}
