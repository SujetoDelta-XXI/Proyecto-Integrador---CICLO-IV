// src/main/java/com/example/usuario_api/controller/AuthController.java
package com.example.usuario_api.controller;

import java.util.Map;

import com.example.usuario_api.payload.SignupRequest;
import com.example.usuario_api.payload.response.JwtResponse;
import com.example.usuario_api.payload.response.Login2FaResponse;
import com.example.usuario_api.service.AuthService;
import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")  // o tu URL de frontend
public class AuthController {

    private final AuthService auth;

    public AuthController(AuthService auth) {
        this.auth = auth;
    }

    /** Registro */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody SignupRequest dto) {
        return auth.register(dto)
            ? ResponseEntity.ok(Map.of("message", "Usuario creado exitosamente"))
            : ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", "Ya existe un usuario con ese correo"));
    }

    /** Login tradicional */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> body) {
        try {
            Login2FaResponse resp = auth.login(
                body.get("correo"), 
                body.get("contraseña")
            );
            return ResponseEntity.ok(resp);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(e.getMessage());
        }
    }

    /** Verificar código 2FA y emitir nuevo JWT */
    @PostMapping("/login/verify-2fa")
    public ResponseEntity<?> verify2fa(@RequestParam String code) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No autorizado");
        }

        String correo = authentication.getName(); // obtiene el correo del token actual

        try {
            String jwt = auth.verify2Fa(correo, code);
            return ResponseEntity.ok(new JwtResponse(jwt));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    /** Registrar correo alternativo para 2FA */
    @PostMapping("/2fa/register-email")
    public ResponseEntity<?> register2faEmail(@RequestParam String alternativo) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No autorizado");
        }

        String correo = authentication.getName();

        try {
            auth.register2FaEmail(correo, alternativo);
            return ResponseEntity.ok("Correo alternativo registrado");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /** Olvidé contraseña */
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String correo) {
        auth.forgotPassword(correo);
        return ResponseEntity.ok("Email de recuperación enviado");
    }

    /** Restablecer contraseña */
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> body) {
        try {
            String token = body.get("token");
            String nueva = body.get("nuevaContraseña");
            auth.resetPassword(token, nueva);
            return ResponseEntity.ok("Contraseña restablecida");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /** Login con Google */
    @PostMapping("/login-google")
    public ResponseEntity<?> loginGoogle(@RequestBody Map<String,String> body) {
        try {
            String jwt = auth.loginGoogle(body.get("token"));
            return ResponseEntity.ok(new JwtResponse(jwt));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(e.getMessage());
        }
    }
}
