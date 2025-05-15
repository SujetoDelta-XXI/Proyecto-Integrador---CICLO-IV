package com.estiloya.controller;

import com.estiloya.model.User;
import com.estiloya.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint para registrar un nuevo usuario
    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@RequestBody User user) {
        // Validación de correo institucional
        if (!user.getCorreo().trim().toLowerCase().endsWith("@tecsup.edu.pe")) {
            return ResponseEntity
                .badRequest()
                .body("El correo debe ser institucional de Tecsup (@tecsup.edu.pe)");
        }
        User nuevoUsuario = userService.registrarUsuario(user);
        return ResponseEntity.ok(nuevoUsuario);
    }

    // Endpoint para buscar usuario por correo
    @GetMapping("/buscar")
    public User buscarPorCorreo(@RequestParam String correo) {
        return userService.buscarPorCorreo(correo).orElse(null);
    }

    // Endpoint para login de usuario
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        // Busca el usuario por correo
        Optional<User> usuario = userService.buscarPorCorreo(user.getCorreo());
        if (usuario.isPresent()) {
            // Compara la contraseña (usa .trim() por si acaso)
            if (usuario.get().getContraseña().trim().equals(user.getContraseña().trim())) {
                return ResponseEntity.ok(usuario.get());
            } else {
                return ResponseEntity.status(401).body("Credenciales incorrectas");
            }
        } else {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }
    }
}