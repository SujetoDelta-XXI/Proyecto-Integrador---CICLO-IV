package com.estiloya.controller;

import com.estiloya.model.User;
import com.estiloya.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    // URL del frontend para el enlace de recuperación (ajusta si es necesario)
    @Value("${app.frontend.url}")
    private String frontendUrl;

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

    // Endpoint para solicitar recuperación de contraseña
    @PostMapping("/recuperar")
    public ResponseEntity<?> solicitarRecuperacion(@RequestBody Map<String, String> request) {
        String correo = request.get("correo");
        userService.createPasswordResetToken(correo, frontendUrl);
        // Por seguridad, siempre responde igual aunque el correo no exista
        return ResponseEntity.ok("Correo de recuperación enviado si el usuario existe.");
    }

    // Endpoint para cambiar la contraseña usando el token
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String nuevaContraseña = request.get("nuevaContraseña");
        boolean result = userService.resetPassword(token, nuevaContraseña);
        if (result) {
            return ResponseEntity.ok("Contraseña actualizada correctamente.");
        } else {
            return ResponseEntity.badRequest().body("Token inválido o expirado.");
        }
    }
}