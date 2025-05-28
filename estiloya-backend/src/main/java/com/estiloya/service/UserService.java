package com.estiloya.service;

import com.estiloya.model.User;
import com.estiloya.model.PasswordResetToken;
import com.estiloya.repository.UserRepository;
import com.estiloya.repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import com.estiloya.model.TwoFactorCode;
import com.estiloya.repository.TwoFactorCodeRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TwoFactorCodeRepository twoFactorCodeRepository;
    @Autowired
    private TwilioService twilioService;

    // Si tienes TwilioService, descomenta esta línea:
    // @Autowired
    // private TwilioService twilioService;

    // Registro de usuario
    public User registrarUsuario(User user) {
        user.setFechaRegistro(LocalDate.now());
        if (user.getTipoUsuario() == null) {
            user.setTipoUsuario("cliente");
        }
        return userRepository.save(user);
    }

    // Buscar usuario por correo
    public Optional<User> buscarPorCorreo(String correo) {
        return userRepository.findByCorreo(correo);
    }

    public void actualizarUsuario(User user) {
        userRepository.save(user);
    }

    // Formatear número a internacional (Perú)
    private String formatearNumeroPeru(String numero) {
        if (numero == null) return null;
        numero = numero.trim();
        if (numero.startsWith("+")) return numero;
        if (numero.startsWith("0")) numero = numero.substring(1);
        if (numero.length() == 9) {
            return "+51" + numero;
        }
        if (numero.length() == 11 && numero.startsWith("51")) {
            return "+" + numero;
        }
        return numero;
    }

    // Iniciar 2FA: genera y envía el código por correo alternativo o SMS
    @Transactional
    public String iniciar2FA(User user, String metodo) {
        // Borra códigos anteriores
        twoFactorCodeRepository.deleteByUser(user);

        // Genera código de 6 dígitos
        String code = String.format("%06d", (int)(Math.random() * 1000000));
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(5);

        TwoFactorCode twoFactorCode = new TwoFactorCode();
        twoFactorCode.setUser(user);
        twoFactorCode.setCode(code);
        twoFactorCode.setExpiry(expiry);
        twoFactorCode.setMetodo(metodo);
        twoFactorCodeRepository.save(twoFactorCode);

        // Envía el código
        if ("sms".equals(metodo) && user.getTelefono() != null) {
            String numeroFormateado = formatearNumeroPeru(user.getTelefono());
            // Si tienes TwilioService, usa esto:
            twilioService.sendSms(numeroFormateado, "Tu código de verificación es: " + code);
            // Si solo quieres simular:
            //System.out.println("Código 2FA por SMS: " + code + " al teléfono " + numeroFormateado);
        } else if ("correo".equals(metodo) && user.getCorreoAlternativo() != null) {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom("EstiloYa <mathias.villena@tecsup.edu.pe>"); // Cambia aquí
            mailMessage.setTo(user.getCorreoAlternativo());
            mailMessage.setSubject("Código de verificación 2FA - EstiloYa");
            mailMessage.setText("Tu código de verificación es: " + code);
            mailSender.send(mailMessage);
        }
        return metodo;
    }

    // Validar el código 2FA
    public boolean validar2FACode(User user, String code) {
        Optional<TwoFactorCode> codeOpt = twoFactorCodeRepository.findByUserAndCode(user, code);
        if (codeOpt.isPresent()) {
            TwoFactorCode twoFactorCode = codeOpt.get();
            if (twoFactorCode.getExpiry().isAfter(LocalDateTime.now())) {
                twoFactorCodeRepository.delete(twoFactorCode);
                return true;
            }
        }
        return false;
    }

    @Transactional
    public void createPasswordResetToken(String correo, String appUrl) {
        Optional<User> userOpt = userRepository.findByCorreo(correo);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            tokenRepository.deleteByUser(user);

            String token = UUID.randomUUID().toString();
            PasswordResetToken resetToken = new PasswordResetToken();
            resetToken.setToken(token);
            resetToken.setUser(user);
            resetToken.setExpiryDate(LocalDateTime.now().plusHours(1));
            tokenRepository.save(resetToken);

            String resetUrl = appUrl + "/reset-password?token=" + token;
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom("EstiloYa <mathias.villena@tecsup.edu.pe>");
            mailMessage.setTo(user.getCorreo());
            mailMessage.setSubject("Recuperación de contraseña - EstiloYa");
            mailMessage.setText("Haz clic en el siguiente enlace para restablecer tu contraseña: " + resetUrl);
            mailSender.send(mailMessage);
        }
    }

    public boolean resetPassword(String token, String nuevaContraseña) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
        if (tokenOpt.isPresent()) {
            PasswordResetToken resetToken = tokenOpt.get();
            if (resetToken.getExpiryDate().isAfter(LocalDateTime.now())) {
                User user = resetToken.getUser();
                user.setContraseña(nuevaContraseña);
                userRepository.save(user);
                tokenRepository.delete(resetToken);
                return true;
            }
        }
        return false;
    }
}