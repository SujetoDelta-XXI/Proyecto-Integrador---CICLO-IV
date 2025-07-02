package com.example.usuario_api.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;

    public AuthTokenFilter(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

  @Override
protected boolean shouldNotFilter(HttpServletRequest request) {
    String uri = request.getRequestURI();
    return uri.equals("/api/auth/login")
        || uri.equals("/api/auth/register")
        || uri.equals("/api/usuario/categorias")
        || uri.startsWith("/api/usuario/diseno/")
        || uri.startsWith("/error"); // importante para evitar bucles infinitos
}


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
                                    throws ServletException, IOException {
        // 1) Extraer token desde Authorization: Bearer xxx
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        String token = null;
        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
        }

        // 2) Si hay token y es válido
        if (token != null && jwtUtils.validateJwtToken(token)) {
            String subject = jwtUtils.getUserNameFromJwtToken(token); // ← puede ser correo o ID

            // 👉 Evitar sobrescribir si ya hay auth
            if (SecurityContextHolder.getContext().getAuthentication() == null) {

                // ✅ NO buscamos en UserDetails → solo usamos el subject como principal temporal
                UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(
                        subject,  // principal (ej: correo)
                        null,
                        List.of() // sin roles por ahora
                    );

                auth.setDetails(
                    new WebAuthenticationDetailsSource()
                        .buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        // 3) Continuar cadena
        chain.doFilter(request, response);
    }
}


