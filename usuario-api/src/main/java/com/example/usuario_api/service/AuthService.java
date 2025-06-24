// src/main/java/com/example/usuario_api/service/AuthService.java
package com.example.usuario_api.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

import java.util.UUID;

import com.example.usuario_api.model.PasswordResetToken;
import com.example.usuario_api.model.Usuario;
import com.example.usuario_api.payload.SignupRequest;
import com.example.usuario_api.payload.response.Login2FaResponse;
import com.example.usuario_api.repository.PasswordResetTokenRepository;
import com.example.usuario_api.repository.UsuarioRepository;
import com.example.usuario_api.security.GoogleVerifier;
import com.example.usuario_api.security.JwtUtils;
import java.util.List;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository             usuarioRepo;
    private final PasswordEncoder               passwordEncoder;
    private final JwtUtils                      jwtUtils;
    private final PasswordResetTokenRepository  tokenRepo;
    private final EmailService                  emailService;
    private final OtpService                    otpService;
    private final GoogleVerifier                googleVerifier;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    public AuthService(
        UsuarioRepository usuarioRepo,
        PasswordEncoder passwordEncoder,
        JwtUtils jwtUtils,
        PasswordResetTokenRepository tokenRepo,
        EmailService emailService,
        OtpService otpService,
        GoogleVerifier googleVerifier
    ) {
        this.usuarioRepo    = usuarioRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils       = jwtUtils;
        this.tokenRepo      = tokenRepo;
        this.emailService   = emailService;
        this.otpService     = otpService;
        this.googleVerifier = googleVerifier;
    }

    /** 1) Registro de usuario */
    public boolean register(SignupRequest dto) {
        if (usuarioRepo.existsByCorreo(dto.getCorreo())) {
            return false;
        }
        Usuario u = new Usuario();
        u.setNombre(dto.getNombre());
        u.setApellidos(dto.getApellidos());
        u.setCorreo(dto.getCorreo());
        u.setContraseña(passwordEncoder.encode(dto.getContraseña()));
        u.setTelefono(dto.getTelefono());
        u.setFecha_registro(LocalDate.now());
        u.setRol("USER");
        u.setTiene_2fa((short)0);
        usuarioRepo.save(u);
        return true;
    }

  /** 2) Login tradicional → inicia 2-FA si aplica */
public Login2FaResponse login(String correo, String rawPassword) {
    Usuario u = usuarioRepo.findByCorreo(correo)
        .filter(us -> passwordEncoder.matches(rawPassword, us.getContraseña()))
        .orElseThrow(() -> new IllegalArgumentException("Credenciales inválidas"));

    // Generar token temporal
    String jwt = jwtUtils.generateJwtToken(u);

    // Establecer token temporal en el contexto de seguridad
    Authentication authSpring = new UsernamePasswordAuthenticationToken(
        String.valueOf(u.getId()), null, List.of()
    );
    SecurityContextHolder.getContext().setAuthentication(authSpring);

    // Detectar métodos
    boolean tieneCorreo = u.getCorreo_auth() != null;
    boolean tieneTelefono = u.getTelefono() != null;

    Map<String, Boolean> metodos = Map.of(
        "correo", tieneCorreo,
        "sms", tieneTelefono
    );

    if (u.getTiene_2fa() == 0) {
        // 🔴 Si no tiene 2FA y NO tiene correo alternativo → enviar a configuración
        if (!tieneCorreo) {
            return new Login2FaResponse(true, metodos, correo, jwt);
        }

        // 🔵 Si no tiene 2FA pero sí tiene correo alternativo → enviar a verificar
        otpService.generateAndSendCode(correo, u.getCorreo_auth());
        return new Login2FaResponse(true, metodos, correo, jwt);
    }

    // ✅ Si ya tiene 2FA → enviar a verificar directamente
    otpService.generateAndSendCode(correo, u.getCorreo_auth());
    return new Login2FaResponse(true, metodos, correo, jwt);
}




    /** 3) Verificar código 2-FA y devolver JWT */
    public String verify2Fa(String correo, String code) {
    if (!otpService.verify(correo, code)) {
        throw new IllegalArgumentException("Código 2FA inválido");
    }

    Usuario u = usuarioRepo.findByCorreo(correo).orElseThrow();

    // ✅ Activar 2FA si aún no está activado
    if (u.getTiene_2fa() == 0) {
        u.setTiene_2fa((short) 1);
        usuarioRepo.save(u);
    }

    Authentication auth = new UsernamePasswordAuthenticationToken(
        String.valueOf(u.getId()),
        null,
        List.of()
    );
    SecurityContextHolder.getContext().setAuthentication(auth);

    return jwtUtils.generateJwtToken(u); // ✅ Token post-verificación
}



    /** 4) Registrar correo alternativo para 2-FA */
    public void register2FaEmail(String correo, String alternativo) {
        Usuario u = usuarioRepo.findByCorreo(correo)
            .orElseThrow(() -> new IllegalArgumentException("Usuario no existe"));
        u.setCorreo_auth(alternativo);
        u.setTiene_2fa((short)1);
        usuarioRepo.save(u);
    }

    /** 5a) Olvidé mi contraseña: generar token y enviar email */
    public void forgotPassword(String correo) {
        Usuario u = usuarioRepo.findByCorreo(correo)
            .orElseThrow(() -> new IllegalArgumentException("Usuario no existe"));
        String token = UUID.randomUUID().toString();
        PasswordResetToken pr = new PasswordResetToken();
        pr.setToken(token);
        pr.setExpiresAt(LocalDateTime.now().plusHours(24));
        pr.setUsuario(u);
        tokenRepo.save(pr);
        emailService.sendSimpleMessage(
    u.getCorreo(),
    "Restablecimiento de contraseña",
    "Haz clic en el siguiente enlace para restablecer tu contraseña:\n" +
    frontendUrl + "/reset-password?token=" + token
);

    }

    /** 5b) Restablecer contraseña */
    public void resetPassword(String token, String nueva) {
        PasswordResetToken pr = tokenRepo.findByToken(token)
            .filter(t -> t.getExpiresAt().isAfter(LocalDateTime.now()))
            .orElseThrow(() -> new IllegalArgumentException("Token inválido o expirado"));

        Usuario u = pr.getUsuario();
        u.setContraseña(passwordEncoder.encode(nueva));
        usuarioRepo.save(u);
        tokenRepo.delete(pr);
    }

    /** 6) Login con Google */
    public String loginGoogle(String googleToken) {
        GoogleIdToken.Payload payload = googleVerifier.verify(googleToken);
        String correo = payload.getEmail();

        if (!correo.endsWith("@tecsup.edu.pe")) {
            throw new IllegalArgumentException("Solo cuentas @tecsup.edu.pe");
        }

        Usuario u = usuarioRepo.findByCorreo(correo)
            .orElseGet(() -> {
                Usuario nuevo = new Usuario();
                nuevo.setCorreo(correo);
                nuevo.setNombre((String) payload.get("given_name"));
                nuevo.setApellidos((String) payload.get("family_name"));
                nuevo.setContraseña(passwordEncoder.encode(UUID.randomUUID().toString()));
                nuevo.setRol("USER");
                nuevo.setFecha_registro(LocalDate.now());
                nuevo.setTiene_2fa((short)0);
                return usuarioRepo.save(nuevo);
            });
            Authentication auth = new UsernamePasswordAuthenticationToken(
    String.valueOf(u.getId()),
    null,
    List.of()
);
SecurityContextHolder.getContext().setAuthentication(auth);


        return jwtUtils.generateJwtToken(u);
    }
}



