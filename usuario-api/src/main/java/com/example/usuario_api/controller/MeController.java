// src/main/java/com/example/usuario_api/controller/MeController.java
package com.example.usuario_api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.usuario_api.model.Usuario;
import com.example.usuario_api.repository.UsuarioRepository;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class MeController {

    private final UsuarioRepository repo;

    public MeController(UsuarioRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication auth) {
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No autorizado");
        }

        String principal = auth.getName();
        try {
            // si es numérico => es ID
            Long id = Long.parseLong(principal);
            return repo.findById(id)
                    .map(this::toFullMap)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (NumberFormatException e) {
            // si no es numérico => es correo
            return repo.findByCorreo(principal)
                    .map(this::toFullMap)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        }
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateMe(
            Authentication auth,
            @RequestBody Map<String, Object> dto
    ) {
        Long id = Long.parseLong(auth.getName());
        return repo.findById(id).map(u -> {
            if (dto.get("nombre") != null) u.setNombre((String) dto.get("nombre"));
            if (dto.get("apellidos") != null) u.setApellidos((String) dto.get("apellidos"));
            if (dto.get("telefono") != null) u.setTelefono((String) dto.get("telefono"));
            Usuario updated = repo.save(u);
            return ResponseEntity.ok(toFullMap(updated));
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    private Map<String, Object> toFullMap(Usuario u) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", u.getId());
        map.put("nombre", u.getNombre());
        map.put("apellidos", u.getApellidos());
        map.put("correo", u.getCorreo());
        map.put("telefono", u.getTelefono());
        map.put("rol", u.getRol());
        map.put("fechaRegistro", u.getFechaRegistro());
        map.put("correoAlternativo", u.getCorreo_auth());
        map.put("tiene2FAConfigurado", u.getTiene_2fa() != null && u.getTiene_2fa() == 1);
        return map;
    }
}

