package com.example.usuario_api.dto;

import java.util.Map;

public class AuthResponseDto {
    private boolean success;
    private String message;
    private String token;
    private UsuarioResponseDto user;
    private boolean requiere2FA;
    private Map<String, Boolean> metodos;
    private String correo;
    private String correoAlternativo;
    private boolean tiene2FAConfigurado;
    private String jwt;

    // Constructor
    public AuthResponseDto() {}

    public AuthResponseDto(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public AuthResponseDto(boolean success, String message, String token, UsuarioResponseDto user, boolean requiere2FA) {
        this.success = success;
        this.message = message;
        this.token = token;
        this.user = user;
        this.requiere2FA = requiere2FA;
        this.jwt = token; // Para compatibilidad
    }

    public AuthResponseDto(boolean success, String message, String token, UsuarioResponseDto user, boolean requiere2FA, 
                          Map<String, Boolean> metodos, String correo, String correoAlternativo, boolean tiene2FAConfigurado) {
        this.success = success;
        this.message = message;
        this.token = token;
        this.user = user;
        this.requiere2FA = requiere2FA;
        this.metodos = metodos;
        this.correo = correo;
        this.correoAlternativo = correoAlternativo;
        this.tiene2FAConfigurado = tiene2FAConfigurado;
        this.jwt = token; // Para compatibilidad
    }

    // Getters y Setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
        this.jwt = token; // Mantener sincronizados
    }

    public UsuarioResponseDto getUser() {
        return user;
    }

    public void setUser(UsuarioResponseDto user) {
        this.user = user;
    }

    public boolean isRequiere2FA() {
        return requiere2FA;
    }

    public void setRequiere2FA(boolean requiere2FA) {
        this.requiere2FA = requiere2FA;
    }

    public Map<String, Boolean> getMetodos() {
        return metodos;
    }

    public void setMetodos(Map<String, Boolean> metodos) {
        this.metodos = metodos;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getCorreoAlternativo() {
        return correoAlternativo;
    }

    public void setCorreoAlternativo(String correoAlternativo) {
        this.correoAlternativo = correoAlternativo;
    }

    public boolean isTiene2FAConfigurado() {
        return tiene2FAConfigurado;
    }

    public void setTiene2FAConfigurado(boolean tiene2FAConfigurado) {
        this.tiene2FAConfigurado = tiene2FAConfigurado;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
        this.token = jwt; // Mantener sincronizados
    }
} 