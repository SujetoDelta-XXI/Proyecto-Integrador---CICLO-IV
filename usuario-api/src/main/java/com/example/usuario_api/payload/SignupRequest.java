package com.example.usuario_api.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;

public class SignupRequest {
    @NotBlank @Size(max = 100)
    private String nombre;

    @NotBlank @Size(max = 100)
    private String apellidos;

    @NotBlank
    @Email(message = "Debe ser una dirección de correo válida")
    @Pattern(
      regexp = "^[A-Za-z0-9._%+-]+@tecsup\\.edu\\.pe$",
      message = "Sólo se permiten correos terminados en @tecsup.edu.pe"
    )
    private String correo;

    @NotBlank @Size(min = 6, max = 128)
    private String contraseña;

    private String telefono; // opcional

    // getters y setters
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
    
}
