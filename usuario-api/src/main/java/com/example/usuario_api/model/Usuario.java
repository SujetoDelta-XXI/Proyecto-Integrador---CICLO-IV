// src/main/java/com/example/usuario_api/model/Usuario.java
package com.example.usuario_api.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String apellidos;
    private String correo;
    private String contraseña;
    private String telefono;
    private LocalDate fecha_registro;
    private String correo_auth;
    private Short tiene_2fa;
    private String rol;

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

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

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public LocalDate getFecha_registro() {
        return fecha_registro;
    }

    public void setFecha_registro(LocalDate fecha_registro) {
        this.fecha_registro = fecha_registro;
    }

    public String getCorreo_auth() {
        return correo_auth;
    }

    public void setCorreo_auth(String correo_auth) {
        this.correo_auth = correo_auth;
    }

    public Short getTiene_2fa() {
        return tiene_2fa;
    }

    public void setTiene_2fa(Short tiene_2fa) {
        this.tiene_2fa = tiene_2fa;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    /** Método para compatibilidad con DTOs que esperan LocalDateTime */
    public LocalDateTime getFechaRegistro() {
        if (fecha_registro != null) {
            return fecha_registro.atStartOfDay();
        }
        return null;
    }
}
