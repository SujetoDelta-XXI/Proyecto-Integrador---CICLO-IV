package com.example.usuario_api.mapper;

import com.example.usuario_api.dto.UsuarioDto;
import com.example.usuario_api.model.Usuario;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-07T09:58:05-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 24.0.1 (Oracle Corporation)"
)
@Component
public class UsuarioMapperImpl implements UsuarioMapper {

    @Override
    public UsuarioDto toDto(Usuario usuario) {
        if ( usuario == null ) {
            return null;
        }

        UsuarioDto usuarioDto = new UsuarioDto();

        usuarioDto.setId( usuario.getId() );
        usuarioDto.setNombre( usuario.getNombre() );
        usuarioDto.setApellidos( usuario.getApellidos() );
        usuarioDto.setCorreo( usuario.getCorreo() );
        usuarioDto.setTelefono( usuario.getTelefono() );
        usuarioDto.setRol( usuario.getRol() );

        return usuarioDto;
    }

    @Override
    public Usuario toEntity(UsuarioDto dto) {
        if ( dto == null ) {
            return null;
        }

        Usuario usuario = new Usuario();

        usuario.setId( dto.getId() );
        usuario.setNombre( dto.getNombre() );
        usuario.setApellidos( dto.getApellidos() );
        usuario.setCorreo( dto.getCorreo() );
        usuario.setTelefono( dto.getTelefono() );
        usuario.setRol( dto.getRol() );

        return usuario;
    }
}
