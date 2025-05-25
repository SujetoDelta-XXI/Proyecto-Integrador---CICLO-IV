package com.estiloya.service;

import com.estiloya.model.User;
import com.estiloya.model.PasswordResetToken;
import com.estiloya.repository.UserRepository;
import com.estiloya.repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private JavaMailSender mailSender;

    // Registro de usuario (igual que antes)
    public User registrarUsuario(User user) {
        user.setFechaRegistro(LocalDate.now());
        if (user.getTipoUsuario() == null) {
            user.setTipoUsuario("cliente");
        }
        return userRepository.save(user);
    }

    // Buscar usuario por correo (igual que antes)
    public Optional<User> buscarPorCorreo(String correo) {
        return userRepository.findByCorreo(correo);
    }

    // Generar token y enviar correo de recuperación
    public void createPasswordResetToken(String correo, String appUrl) {
        Optional<User> userOpt = userRepository.findByCorreo(correo);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Elimina tokens anteriores para ese usuario
            tokenRepository.deleteByUser(user);

            // Genera un token único
            String token = UUID.randomUUID().toString();
            PasswordResetToken resetToken = new PasswordResetToken();
            resetToken.setToken(token);
            resetToken.setUser(user); // Relaciona el token con el usuario
            resetToken.setExpiryDate(LocalDateTime.now().plusHours(1)); // 1 hora de validez
            tokenRepository.save(resetToken);

            // Prepara y envía el correo
            String resetUrl = appUrl + "/reset-password?token=" + token;
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(user.getCorreo());
            mailMessage.setSubject("Recuperación de contraseña - EstiloYa");
            mailMessage.setText("Haz clic en el siguiente enlace para restablecer tu contraseña: " + resetUrl);
            mailSender.send(mailMessage);
        }
    }

    // Validar token y cambiar la contraseña
    public boolean resetPassword(String token, String nuevaContraseña) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
        if (tokenOpt.isPresent()) {
            PasswordResetToken resetToken = tokenOpt.get();
            // Verifica que el token no haya expirado
            if (resetToken.getExpiryDate().isAfter(LocalDateTime.now())) {
                User user = resetToken.getUser();
                user.setContraseña(nuevaContraseña);
                userRepository.save(user);
                tokenRepository.delete(resetToken); // Elimina el token usado
                return true;
            }
        }
        return false;
    }
}