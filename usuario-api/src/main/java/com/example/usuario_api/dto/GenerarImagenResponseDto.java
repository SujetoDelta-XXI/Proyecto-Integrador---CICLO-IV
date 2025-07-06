package com.example.usuario_api.dto;

public class GenerarImagenResponseDto {
    private String base64Image;

    public GenerarImagenResponseDto() {}
    public GenerarImagenResponseDto(String base64Image) { this.base64Image = base64Image; }

    public String getBase64Image() { return base64Image; }
    public void setBase64Image(String base64Image) { this.base64Image = base64Image; }
} 