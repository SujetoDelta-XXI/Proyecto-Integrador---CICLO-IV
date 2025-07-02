package com.example.usuario_api.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendSimpleMessage(String to, String subject, String text) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(to);
            msg.setSubject(subject);
            msg.setText(text);

            System.out.println("➡️ Enviando correo simple a: " + to);
            mailSender.send(msg);
            System.out.println("✅ Correo enviado exitosamente a: " + to);
        } catch (Exception e) {
            System.out.println("🚨 Error enviando correo:");
            e.printStackTrace();
        }
    }

}


