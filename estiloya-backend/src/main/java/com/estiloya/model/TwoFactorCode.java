package com.estiloya.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "two_factor_codes")
public class TwoFactorCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;

    private LocalDateTime expiry;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String metodo; // "sms" o "correo"

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public LocalDateTime getExpiry() { return expiry; }
    public void setExpiry(LocalDateTime expiry) { this.expiry = expiry; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getMetodo() { return metodo; }
    public void setMetodo(String metodo) { this.metodo = metodo; }
}