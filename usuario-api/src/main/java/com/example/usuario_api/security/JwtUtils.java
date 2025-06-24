package com.example.usuario_api.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import com.example.usuario_api.model.Usuario;                // <–– Usuario
import io.jsonwebtoken.*;                                     // <–– Jwts, JwtException, SignatureAlgorithm
import io.jsonwebtoken.io.Decoders;                           // <–– Decoders
import io.jsonwebtoken.security.Keys; 

@Component
public class JwtUtils {

    // La clave debe ser una cadena Base64 suficientemente larga.
    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationMs}")
    private int jwtExpirationMs;

    /**
     * Construye el SecretKey a partir de la cadena Base64.
     */
    private SecretKey key() {
        byte[] bytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(bytes);
    }

    /**
     * Genera el JWT firmándolo con HS256 (o HS512 si cambias el algoritmo).
     */
    public String generateJwtToken(Usuario user) {
    Date now = new Date();
    Date exp = new Date(now.getTime() + jwtExpirationMs);

    return Jwts.builder()
        .setSubject(String.valueOf(user.getId())) // Usamos el ID como subject
        .claim("correo", user.getCorreo())
        .claim("rol", user.getRol())
        .setIssuedAt(now)
        .setExpiration(exp)
        .signWith(key(), SignatureAlgorithm.HS256)
        .compact();
}


    /**
     * Valida la firma y la caducidad.
     */
    public boolean validateJwtToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            // token inválido, expirado, etc.
            return false;
        }
    }

    /**
     * Extrae el subject (correo) de las claims.
     */
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder()
                   .setSigningKey(key())
                   .build()
                   .parseClaimsJws(token)
                   .getBody()
                   .getSubject();
    }

    /**
     * Crea un Authentication a partir de los authorities del UserDetails.
     */
    public Authentication getAuthenticationToken(String token, UserDetails userDetails) {
        return new UsernamePasswordAuthenticationToken(
            userDetails,
            null,
            userDetails.getAuthorities()
        );
    }
}
