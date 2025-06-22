// src/main/java/com/example/usuario_api/payload/request/LoginRequest.java
package com.example.usuario_api.payload.request;

public class LoginRequest {
    private String correo;
    private String contraseña;
    // getters & setters
    public String getCorreo() {
        return correo;
    }
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    public String getContraseña() {
        return contraseña;
    }
    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }
    
}
