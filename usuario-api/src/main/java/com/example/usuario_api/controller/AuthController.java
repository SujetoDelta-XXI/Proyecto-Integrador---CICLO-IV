package com.example.usuario_api.controller;

import com.example.usuario_api.model.Usuario;
import com.example.usuario_api.payload.SignupRequest;
import com.example.usuario_api.payload.response.JwtResponse;
import com.example.usuario_api.payload.response.Login2FaResponse;
import com.example.usuario_api.repository.UsuarioRepository;
import com.example.usuario_api.service.AuthService;
import com.example.usuario_api.service.OtpService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")  // ajusta según tu frontend
public class AuthController {

    private final AuthService auth;
    private final UsuarioRepository usuarioRepo;
    private final OtpService otpService;

    public AuthController(AuthService auth, UsuarioRepository usuarioRepo, OtpService otpService) {
        this.auth = auth;
        this.usuarioRepo = usuarioRepo;
        this.otpService = otpService;
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
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        try {
            Login2FaResponse resp = auth.login(body.get("correo"), body.get("contraseña"));
            return ResponseEntity.ok(resp);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    /** Verificar código 2FA y emitir nuevo JWT */
@PostMapping("/login/verify-2fa")
public ResponseEntity<?> verify2fa(@RequestParam String code) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication == null || !authentication.isAuthenticated()) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No autorizado");
    }

    String idStr = authentication.getName(); // ahora getName() es el ID
    System.out.println("→ id recibido en verify2fa (getName()): " + idStr);

    try {
        Long id = Long.parseLong(idStr);

        Usuario u = usuarioRepo.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        String correoAlternativo = u.getCorreo_auth();
        System.out.println("→ correo alternativo registrado: " + correoAlternativo);

        if (correoAlternativo == null) {
            return ResponseEntity.badRequest().body("No tiene correo alternativo registrado");
        }

        String jwt = auth.verify2Fa(idStr, code); // ya espera el id como string

        return ResponseEntity.ok(new JwtResponse(jwt));
    } catch (IllegalArgumentException e) {
        System.out.println("→ Error verify2fa: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Código inválido: " + e.getMessage());
    }
}



    /** Registrar correo alternativo para 2FA */
    @PostMapping("/2fa/register-email")
public ResponseEntity<?> register2faEmail(@RequestParam String alternativo) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication == null || !authentication.isAuthenticated()) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No autorizado");
    }

    String correo = authentication.getName();  // correo
    try {
        auth.register2FaEmail(correo, alternativo);  // pasas el correo
        return ResponseEntity.ok("Correo alternativo registrado");
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}


    /** Enviar código por el método elegido (correo o sms) */
@PostMapping("/2fa/send-code")
public ResponseEntity<?> send2faCode(@RequestParam String metodo, Authentication auth) {
    Long userId;
    try {
        userId = Long.parseLong(auth.getName());
    } catch (NumberFormatException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido: ID de usuario no numérico");
    }

    Usuario u = usuarioRepo.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("Usuario no existe"));

    if ("correo".equals(metodo) && u.getCorreo_auth() != null) {
        otpService.generateAndSendCode(u.getCorreo(), u.getCorreo_auth());
        return ResponseEntity.ok("Código enviado al correo alternativo.");
    } else if ("sms".equals(metodo) && u.getTelefono() != null) {
        otpService.generateAndSendCode(u.getCorreo(), u.getTelefono());
        return ResponseEntity.ok("Código enviado al teléfono.");
    } else {
        return ResponseEntity.badRequest().body("Método no válido o no configurado.");
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
    public ResponseEntity<?> loginGoogle(@RequestBody Map<String, String> body) {
        try {
            String jwt = auth.loginGoogle(body.get("token"));
            return ResponseEntity.ok(new JwtResponse(jwt));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
