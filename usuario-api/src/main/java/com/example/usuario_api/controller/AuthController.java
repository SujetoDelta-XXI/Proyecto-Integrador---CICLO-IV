package com.example.usuario_api.controller;

import com.example.usuario_api.dto.AuthResponseDto;
import com.example.usuario_api.dto.UsuarioResponseDto;
import com.example.usuario_api.model.Usuario;
import com.example.usuario_api.payload.SignupRequest;
import com.example.usuario_api.repository.UsuarioRepository;
import com.example.usuario_api.service.AuthService;
import com.example.usuario_api.service.OtpService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")  // Permitir cualquier origen
public class AuthController {

    private final AuthService auth;
    private final UsuarioRepository usuarioRepo;
    private final OtpService otpService;

    public AuthController(AuthService auth, UsuarioRepository usuarioRepo, OtpService otpService) {
        this.auth = auth;
        this.usuarioRepo = usuarioRepo;
        this.otpService = otpService;
    }

    /** Registro de Usuario */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody SignupRequest dto) {
        try {
            boolean success = auth.register(dto);
            if (success) {
                // Buscar el usuario recién creado
                Usuario usuario = usuarioRepo.findByCorreo(dto.getCorreo()).orElse(null);
                if (usuario != null) {
                    UsuarioResponseDto userDto = new UsuarioResponseDto(
                        usuario.getId(),
                        usuario.getNombre(),
                        usuario.getApellidos(),
                        usuario.getCorreo(),
                        usuario.getTelefono(),
                        usuario.getRol(),
                        usuario.getFechaRegistro()
                    );
                    
                    String jwt = auth.generateJwt(usuario.getCorreo());
                    
                    AuthResponseDto response = new AuthResponseDto(
                        true,
                        "Usuario registrado exitosamente",
                        jwt,
                        userDto,
                        false
                    );
                    
                    return ResponseEntity.ok(response);
                }
            }
            
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new AuthResponseDto(false, "Ya existe un usuario con ese correo"));
                
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new AuthResponseDto(false, e.getMessage()));
        }
    }

    /** Login Tradicional */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        try {
            String correo = body.get("correo");
            String contraseña = body.get("contraseña");
            
            // Verificar si el usuario existe y las credenciales son correctas
            Usuario usuario = usuarioRepo.findByCorreo(correo).orElse(null);
            if (usuario == null || !auth.verifyPassword(contraseña, usuario.getContraseña())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponseDto(false, "Credenciales inválidas"));
            }
            
            UsuarioResponseDto userDto = new UsuarioResponseDto(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getApellidos(),
                usuario.getCorreo(),
                usuario.getTelefono(),
                usuario.getRol(),
                usuario.getFechaRegistro()
            );
            
            // Verificar si tiene 2FA configurado
            boolean tiene2FA = usuario.getCorreo_auth() != null && usuario.getTiene_2fa() == 1;

            
            if (tiene2FA) {
                // Usuario tiene 2FA configurado - requiere verificación
                String tokenTemporal = auth.generateTemporaryToken(usuario.getId().toString());
                
                Map<String, Boolean> metodos = new HashMap<>();
                metodos.put("correo", true);
                metodos.put("sms", usuario.getTelefono() != null);
                
                AuthResponseDto response = new AuthResponseDto(
    true,
    "Se requiere verificación 2FA",
    tokenTemporal,
    userDto,
    true,
    metodos,
    usuario.getCorreo(),
    usuario.getCorreo_auth(),
    tiene2FA
);




                
                return ResponseEntity.ok(response);
            } else {
                // Usuario NO tiene 2FA configurado - debe configurarlo primero
                // Generar token temporal para permitir configuración de correo alternativo
                String tokenTemporal = auth.generateTemporaryToken(usuario.getId().toString());
                
                Map<String, Boolean> metodos = new HashMap<>();
                metodos.put("correo", true);
                metodos.put("sms", usuario.getTelefono() != null);
                
                AuthResponseDto response = new AuthResponseDto(
                    true,
                    "Debe configurar correo alternativo para 2FA",
                    tokenTemporal,
                    userDto,
                    true, // Requiere configuración de 2FA
                    metodos,
                    usuario.getCorreo(),
                    null, // No tiene correo alternativo
                    false // No tiene 2FA configurado
                );
                
                return ResponseEntity.ok(response);
            }
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new AuthResponseDto(false, "Credenciales inválidas"));
        }
    }

    /** Verificar código 2FA y emitir nuevo JWT */
    @PostMapping("/login/verify-2fa")
    public ResponseEntity<?> verify2fa(@RequestParam String code) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new AuthResponseDto(false, "Token inválido o expirado"));
        }

        String idStr = authentication.getName();
        
        try {
            Long id = Long.parseLong(idStr);
            Usuario usuario = usuarioRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

            // Verificar el código 2FA
            String jwt = auth.verify2Fa(idStr, code);
            
            UsuarioResponseDto userDto = new UsuarioResponseDto(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getApellidos(),
                usuario.getCorreo(),
                usuario.getTelefono(),
                usuario.getRol(),
                usuario.getFechaRegistro()
            );

            AuthResponseDto response = new AuthResponseDto(
                true,
                "Verificación 2FA exitosa",
                jwt,
                userDto,
                false
            );

            return ResponseEntity.ok(response);
            
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new AuthResponseDto(false, "Código inválido"));
        }
    }

    /** Registrar correo alternativo para 2FA */
    @PostMapping("/2fa/register-email")
    public ResponseEntity<?> register2faEmail(@RequestParam String alternativo) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new AuthResponseDto(false, "No autorizado"));
        }

        String idStr = authentication.getName();
        try {
            auth.register2FaEmail(idStr, alternativo);
            return ResponseEntity.ok(new AuthResponseDto(true, "Correo alternativo registrado exitosamente"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                .body(new AuthResponseDto(false, e.getMessage()));
        }
    }

    /** Enviar código por el método elegido (correo o sms) */
    @PostMapping("/2fa/send-code")
    public ResponseEntity<?> send2faCode(@RequestParam String metodo, Authentication auth) {
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new AuthResponseDto(false, "Token inválido o expirado"));
        }

        Long userId;
        try {
            userId = Long.parseLong(auth.getName());
        } catch (NumberFormatException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new AuthResponseDto(false, "Token inválido: ID de usuario no numérico"));
        }

        Usuario usuario = usuarioRepo.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("Usuario no existe"));

        try {
            if ("correo".equals(metodo) && usuario.getCorreo_auth() != null) {
                otpService.generateAndSendCode(usuario.getCorreo(), usuario.getCorreo_auth());
                return ResponseEntity.ok(new AuthResponseDto(true, "Código enviado exitosamente"));
            } else if ("sms".equals(metodo) && usuario.getTelefono() != null) {
                otpService.generateAndSendCode(usuario.getCorreo(), usuario.getTelefono());
                return ResponseEntity.ok(new AuthResponseDto(true, "Código enviado exitosamente"));
            } else {
                return ResponseEntity.badRequest()
                    .body(new AuthResponseDto(false, "Método no válido o no configurado"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new AuthResponseDto(false, "Error al enviar código"));
        }
    }

    /** Olvidé contraseña */
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> body) {
        try {
            String correo = body.get("correo");
            auth.forgotPassword(correo);
            return ResponseEntity.ok(new AuthResponseDto(true, 
                "Se ha enviado un correo con instrucciones para restablecer tu contraseña"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new AuthResponseDto(false, "No se encontró una cuenta con ese correo"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new AuthResponseDto(false, e.getMessage()));
        }
    }

    /** Restablecer contraseña */
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> body) {
        try {
            String correo = body.get("correo");
            String token = body.get("token");
            String contraseña = body.get("contraseña");
            
            auth.resetPassword(token, contraseña);
            return ResponseEntity.ok(new AuthResponseDto(true, "Contraseña restablecida exitosamente"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                .body(new AuthResponseDto(false, "Token inválido o expirado"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new AuthResponseDto(false, e.getMessage()));
        }
    }

    /** Login con Google */
    @PostMapping("/login-google")
    public ResponseEntity<?> loginGoogle(@RequestBody Map<String, String> body) {
        try {
            String idToken = body.get("idToken");
            String jwt = auth.loginGoogle(idToken);
            
            // Obtener información del usuario
            String correo = auth.getEmailFromGoogleToken(idToken);
            Usuario usuario = usuarioRepo.findByCorreo(correo).orElse(null);
            
            if (usuario != null) {
                UsuarioResponseDto userDto = new UsuarioResponseDto(
                    usuario.getId(),
                    usuario.getNombre(),
                    usuario.getApellidos(),
                    usuario.getCorreo(),
                    usuario.getTelefono(),
                    usuario.getRol(),
                    usuario.getFechaRegistro()
                );
                
                AuthResponseDto response = new AuthResponseDto(
                    true,
                    "Login con Google exitoso",
                    jwt,
                    userDto,
                    false
                );
                
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest()
                    .body(new AuthResponseDto(false, "Usuario no encontrado"));
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new AuthResponseDto(false, e.getMessage()));
        }
    }

    /** Probar Conexión */
    @GetMapping("/test-connection")
    public ResponseEntity<?> testConnection() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Conexión exitosa");
        response.put("timestamp", LocalDateTime.now());
        
        return ResponseEntity.ok(response);
    }
}
