package com.estiloya.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "usuarios")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "apellidos", nullable = false)
    private String apellidos;

    @Column(name = "correo", nullable = false, unique = true)
    private String correo;

    @Column(name = "contraseña", nullable = true)
    private String contraseña;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "correo_alternativo")
    private String correoAlternativo;

    @Column(name = "fecha_registro")
    private LocalDate fechaRegistro;

    @Column(name = "tipo_usuario")
    private String tipoUsuario = "cliente";

    @Column(name = "tiene_2fa")
    private boolean tiene2FA = false;

    // Constructor vacío
    public User() {}

    // Constructor con parámetros
    public User(String nombre, String apellidos, String correo, String contraseña, String direccion, String telefono, String correoAlternativo, LocalDate fechaRegistro, String tipoUsuario, boolean tiene2FA) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.contraseña = contraseña;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correoAlternativo = correoAlternativo;
        this.fechaRegistro = fechaRegistro;
        this.tipoUsuario = tipoUsuario;
        this.tiene2FA = tiene2FA;
    }

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellidos() { return apellidos; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getContraseña() { return contraseña; }
    public void setContraseña(String contraseña) { this.contraseña = contraseña; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getCorreoAlternativo() { return correoAlternativo; }
    public void setCorreoAlternativo(String correoAlternativo) { this.correoAlternativo = correoAlternativo; }

    public LocalDate getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(LocalDate fechaRegistro) { this.fechaRegistro = fechaRegistro; }

    public String getTipoUsuario() { return tipoUsuario; }
    public void setTipoUsuario(String tipoUsuario) { this.tipoUsuario = tipoUsuario; }

    public boolean isTiene2FA() { return tiene2FA; }
    public void setTiene2FA(boolean tiene2FA) { this.tiene2FA = tiene2FA; }
}