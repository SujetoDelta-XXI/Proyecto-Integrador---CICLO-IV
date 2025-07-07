package com.example.usuario_api.dto;

import java.util.List;

public class DisenosSeparadosDto {
    private List<DisenoDto> disenosPendientes;
    private List<DisenoDto> disenosAprobados;

    // Constructors
    public DisenosSeparadosDto() {}

    public DisenosSeparadosDto(List<DisenoDto> disenosPendientes, List<DisenoDto> disenosAprobados) {
        this.disenosPendientes = disenosPendientes;
        this.disenosAprobados = disenosAprobados;
    }

    // Getters and Setters
    public List<DisenoDto> getDisenosPendientes() { return disenosPendientes; }
    public void setDisenosPendientes(List<DisenoDto> disenosPendientes) { this.disenosPendientes = disenosPendientes; }

    public List<DisenoDto> getDisenosAprobados() { return disenosAprobados; }
    public void setDisenosAprobados(List<DisenoDto> disenosAprobados) { this.disenosAprobados = disenosAprobados; }
} 