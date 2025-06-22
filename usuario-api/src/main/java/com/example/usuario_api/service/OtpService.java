package com.example.usuario_api.service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Random;

import org.springframework.stereotype.Service;

@Service
public class OtpService {
    private final EmailService emailService;
    private final Map<String,String> codes = new ConcurrentHashMap<>();

    public OtpService(EmailService emailService) {
        this.emailService = emailService;
    }

    public String generateAndSendCode(String correoUsuario, String correoAlternativo) {
        String code = String.valueOf(new Random().nextInt(900_000) + 100_000);
        codes.put(correoUsuario, code);
        // <— aquí usa el método que realmente definas en EmailService:
        emailService.sendSimpleMessage(
          correoAlternativo,
          "Código 2FA",
          "Tu código de verificación es: " + code
        );
        return code;
    }

    public boolean verify(String correoUsuario, String code) {
        return code.equals(codes.remove(correoUsuario));
    }
}
