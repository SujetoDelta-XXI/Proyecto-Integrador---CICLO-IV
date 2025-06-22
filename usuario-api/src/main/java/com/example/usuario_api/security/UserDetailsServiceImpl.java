// src/main/java/com/example/usuario_api/service/UserDetailsServiceImpl.java
package com.example.usuario_api.security;

import java.util.*;

import org.springframework.security.core.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.example.usuario_api.model.Usuario;
import com.example.usuario_api.repository.UsuarioRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UsuarioRepository usuarioRepo;

    public UserDetailsServiceImpl(UsuarioRepository usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        Usuario user = usuarioRepo.findByCorreo(correo)
                         .orElseThrow(() ->
                             new UsernameNotFoundException("User Not Found with correo: " + correo));
        List<GrantedAuthority> authorities = List.of(
            new SimpleGrantedAuthority("ROLE_" + user.getRol())
        );
        return new org.springframework.security.core.userdetails.User(
            user.getCorreo(),
            user.getContraseña(),
            authorities
        );
    }
}
