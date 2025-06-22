// src/main/java/com/example/usuario_api/payload/response/JwtResponse.java
package com.example.usuario_api.payload.response;

public class JwtResponse {
    private String token;
    public JwtResponse(String token) { this.token = token; }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}

