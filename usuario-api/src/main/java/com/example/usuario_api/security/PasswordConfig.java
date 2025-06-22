package com.example.usuario_api.security;

//import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.security.crypto.factory.PasswordEncoderFactories;
//import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class PasswordConfig {

    /**
     * Crea un DelegatingPasswordEncoder que:
     * - usa bcrypt por defecto para nuevos hashes
     * - reconoce automáticamente pbkdf2 (y otros) para validar hashes existentes
     
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }*/
}
