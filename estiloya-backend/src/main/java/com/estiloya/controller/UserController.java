package com.estiloya.controller;

import com.estiloya.model.User;
import com.estiloya.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity; // <-- Agrega este import
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@RequestBody User user) {
        // Validación de correo institucional
        if (!user.getCorreo().endsWith("@tecsup.edu.pe")) {
            return ResponseEntity
                .badRequest()
                .body("El correo debe ser institucional de Tecsup (@tecsup.edu.pe)");
        }
        User nuevoUsuario = userService.registrarUsuario(user);
        return ResponseEntity.ok(nuevoUsuario);
    }

    @GetMapping("/buscar")
    public User buscarPorCorreo(@RequestParam String correo) {
        return userService.buscarPorCorreo(correo).orElse(null);
    }
}