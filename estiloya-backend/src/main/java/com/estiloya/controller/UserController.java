package com.estiloya.controller;

import com.estiloya.model.User;
import com.estiloya.service.GoogleAuthService;
import com.estiloya.service.TwilioService;
import com.estiloya.service.UserService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;

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
    @Autowired
    private GoogleAuthService googleAuthService;
    //@Autowired
    //private TwilioService twilioService;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    // Registro de usuario
    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@RequestBody User user) {
        if (!user.getCorreo().trim().toLowerCase().endsWith("@tecsup.edu.pe")) {
            return ResponseEntity
                .badRequest()
                .body("El correo debe ser institucional de Tecsup (@tecsup.edu.pe)");
        }
        User nuevoUsuario = userService.registrarUsuario(user);
        return ResponseEntity.ok(nuevoUsuario);
    }

    // Buscar usuario por correo
    @GetMapping("/buscar")
    public User buscarPorCorreo(@RequestParam String correo) {
        return userService.buscarPorCorreo(correo).orElse(null);
    }

    // Solicitar recuperación de contraseña
    @PostMapping("/recuperar")
    public ResponseEntity<?> solicitarRecuperacion(@RequestBody Map<String, String> request) {
        String correo = request.get("correo");
        userService.createPasswordResetToken(correo, frontendUrl);
        return ResponseEntity.ok("Correo de recuperación enviado si el usuario existe.");
    }

    // Cambiar contraseña usando token
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

    // Registrar correo alternativo para 2FA
    @PostMapping("/2fa-setup")
    public ResponseEntity<?> registrarAlternativo(@RequestBody Map<String, String> request) {
        String correo = request.get("correo");
        String correoAlternativo = request.get("correoAlternativo");
        Optional<User> usuarioOpt = userService.buscarPorCorreo(correo);

        if (usuarioOpt.isPresent()) {
            User usuario = usuarioOpt.get();
            usuario.setCorreoAlternativo(correoAlternativo);
            userService.actualizarUsuario(usuario);
            return ResponseEntity.ok("Correo alternativo registrado correctamente");
        } else {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }
    }

    // Enviar código 2FA (SMS o correo) con validaciones robustas
    @PostMapping("/enviar-codigo-2fa")
    public ResponseEntity<?> enviarCodigo2FA(@RequestBody Map<String, String> request) {
        String correo = request.get("correo");
        String metodo = request.get("metodo"); // "sms" o "correo"
        Optional<User> usuarioOpt = userService.buscarPorCorreo(correo);

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        }

        User usuario = usuarioOpt.get();

        // Validar método disponible
        if ("sms".equals(metodo)) {
            if (usuario.getTelefono() == null || usuario.getTelefono().isEmpty()) {
                return ResponseEntity.badRequest().body("El usuario no tiene teléfono registrado");
            }
        } else if ("correo".equals(metodo)) {
            if (usuario.getCorreoAlternativo() == null || usuario.getCorreoAlternativo().isEmpty()) {
                return ResponseEntity.badRequest().body("El usuario no tiene correo alternativo registrado");
            }
        } else {
            return ResponseEntity.badRequest().body("Método de 2FA no válido");
        }

        try {
            userService.iniciar2FA(usuario, metodo);
            return ResponseEntity.ok("Código enviado");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al enviar el código: " + e.getMessage());
        }
    }

    // Verificar código 2FA
    @PostMapping("/verificar-codigo-2fa")
    public ResponseEntity<?> verificarCodigo2FA(@RequestBody Map<String, String> request) {
        String correo = request.get("correo");
        String code = request.get("code");
        Optional<User> usuario = userService.buscarPorCorreo(correo);
        if (usuario.isPresent() && userService.validar2FACode(usuario.get(), code)) {
            return ResponseEntity.ok("2FA verificado");
        } else {
            return ResponseEntity.status(401).body("Código inválido o expirado");
        }
    }

    // Login tradicional
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String correo = request.get("correo");
        String contraseña = request.get("contraseña");
        Optional<User> usuario = userService.buscarPorCorreo(correo);

        if (usuario.isPresent() && usuario.get().getContraseña().trim().equals(contraseña.trim())) {
            boolean tieneTelefono = usuario.get().getTelefono() != null && !usuario.get().getTelefono().isEmpty();
            boolean tieneCorreoAlternativo = usuario.get().getCorreoAlternativo() != null && !usuario.get().getCorreoAlternativo().isEmpty();

            if (!tieneCorreoAlternativo) {
                return ResponseEntity.ok(Map.of(
                    "requiere2FA", true,
                    "metodos", Map.of(
                        "sms", false,
                        "correo", false
                    ),
                    "correo", usuario.get().getCorreo()
                ));
            }

            return ResponseEntity.ok(Map.of(
                "requiere2FA", true,
                "metodos", Map.of(
                    "sms", tieneTelefono,
                    "correo", tieneCorreoAlternativo
                ),
                "correo", usuario.get().getCorreo()
            ));
        } else {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }
    }

    // Login con Google
    @PostMapping("/login-google")
    public ResponseEntity<?> loginGoogle(@RequestBody Map<String, String> request) {
        String idTokenString = request.get("token");

        GoogleIdToken.Payload payload = googleAuthService.verificarGoogleToken(idTokenString);
        if (payload == null) {
            return ResponseEntity.status(401).body("Token de Google inválido");
        }

        String correo = payload.getEmail();
        String nombre = (String) payload.get("given_name");
        String apellidos = (String) payload.get("family_name");

        if (!correo.endsWith("@tecsup.edu.pe")) {
            return ResponseEntity.status(403).body("Solo se permiten cuentas de TECSUP");
        }

        Optional<User> usuarioOpt = userService.buscarPorCorreo(correo);

        User usuario;
        if (usuarioOpt.isPresent()) {
            usuario = usuarioOpt.get();
        } else {
            usuario = new User();
            usuario.setCorreo(correo);
            usuario.setNombre(nombre);
            usuario.setApellidos(apellidos);
            usuario.setContraseña(null);
            userService.actualizarUsuario(usuario);
        }

        return ResponseEntity.ok(Map.of(
            "usuario", usuario,
            "requiere2FA", true,
            "metodos", Map.of(
                "sms", usuario.getTelefono() != null && !usuario.getTelefono().isEmpty(),
                "correo", usuario.getCorreoAlternativo() != null && !usuario.getCorreoAlternativo().isEmpty()
            ),
            "correo", usuario.getCorreo()
        ));
    }
}