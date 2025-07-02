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

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationMs}")
    private int jwtExpirationMs;

    private SecretKey key() {
        byte[] bytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(bytes);
    }

    public SecretKey getKey() {
        return key();
    }
public String generateJwtToken(Usuario user) {
    Date now = new Date();
    Date exp = new Date(now.getTime() + jwtExpirationMs);
    return Jwts.builder()
        .setSubject(String.valueOf(user.getId()))  // 👈 SIEMPRE id
        .claim("correo", user.getCorreo())
        .claim("rol", user.getRol())
        .setIssuedAt(now)
        .setExpiration(exp)
        .signWith(key(), SignatureAlgorithm.HS256)
        .compact();
}


    public String generateJwtTokenTemporal(Usuario user) {
    Date now = new Date();
    Date exp = new Date(now.getTime() + jwtExpirationMs);

    return Jwts.builder()
        .setSubject(String.valueOf(user.getId()))   // <<-- ahora subject es el ID
        .claim("correo", user.getCorreo())          // <<-- correo en claim
        .claim("temp2fa", true)
        .setIssuedAt(now)
        .setExpiration(exp)
        .signWith(key(), SignatureAlgorithm.HS256)
        .compact();
}


    public boolean validateJwtToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(key())
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }

    public Authentication getAuthenticationToken(String token, UserDetails userDetails) {
        return new UsernamePasswordAuthenticationToken(
            userDetails,
            null,
            userDetails.getAuthorities()
        );
    }
}
