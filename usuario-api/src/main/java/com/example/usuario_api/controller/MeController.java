// src/main/java/com/example/usuario_api/controller/MeController.java
package com.example.usuario_api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.usuario_api.dto.UsuarioDto;
import com.example.usuario_api.model.Usuario;
import com.example.usuario_api.repository.UsuarioRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class MeController {

    private final UsuarioRepository repo;

    public MeController(UsuarioRepository repo) {
        this.repo = repo;
    }

    // GET /api/me
    @GetMapping("/me")
    public ResponseEntity<UsuarioDto> me(Authentication auth) {
        String correo = auth.getName(); // viene del JWT
        return repo.findByCorreo(correo)
                   .map(this::toDto)
                   .map(ResponseEntity::ok)
                   .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping("/me")
public ResponseEntity<UsuarioDto> updateMe(
      Authentication auth,
      @RequestBody UsuarioDto dto
) {
    String correo = auth.getName();
    return repo.findByCorreo(correo).map(u -> {
        if (dto.getNombre()    != null) u.setNombre(dto.getNombre());
        if (dto.getApellidos() != null) u.setApellidos(dto.getApellidos());
        if (dto.getTelefono()  != null) u.setTelefono(dto.getTelefono());
        Usuario updated = repo.save(u);
        return ResponseEntity.ok(toDto(updated));
    }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
}


    private UsuarioDto toDto(Usuario u) {
        UsuarioDto d = new UsuarioDto();
        d.setId(u.getId());
        d.setNombre(u.getNombre());
        d.setApellidos(u.getApellidos());
        d.setCorreo(u.getCorreo());
        d.setTelefono(u.getTelefono());
        d.setRol(u.getRol());
        return d;
    }
}
