package com.example.usuario_api.dto;

public class ResumenCompraDto {
    private double subtotal;
    private double igv;
    private double envio;
    private double total;

    // Getters y Setters
    public double getSubtotal() { return subtotal; }
    public void setSubtotal(double subtotal) { this.subtotal = subtotal; }

    public double getIgv() { return igv; }
    public void setIgv(double igv) { this.igv = igv; }

    public double getEnvio() { return envio; }
    public void setEnvio(double envio) { this.envio = envio; }

    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }
}
