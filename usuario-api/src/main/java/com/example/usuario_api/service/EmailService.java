package com.example.usuario_api.service;

/**
 * Servicio para enviar correos simples.
 */
public interface EmailService {
    /**
     * Envía un correo simple.
     * @param to       dirección de destino
     * @param subject  asunto del mensaje
     * @param text     cuerpo del mensaje
     */
    void sendSimpleMessage(String to, String subject, String text);
}

