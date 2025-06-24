// src/main/java/com/example/usuario_api/payload/response/Login2FaResponse.java
package com.example.usuario_api.payload.response;

import java.util.Map;

public record Login2FaResponse(
    boolean requiere2FA,
    Map<String, Boolean> metodos,
    String correo,
    String jwt // 👈 agrega esto
) {}

