package com.example.usuario_api.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final UserDetailsServiceImpl userDetailsService;

    public AuthTokenFilter(JwtUtils jwtUtils,
                           UserDetailsServiceImpl userDetailsService) {
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
    }

   @Override
protected boolean shouldNotFilter(HttpServletRequest request) {
    String uri = request.getRequestURI();
    return uri.equals("/api/auth/login")
        || uri.equals("/api/auth/register");
}


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
                                    throws ServletException, IOException {
        // 1) Extraer el encabezado Authorization
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        String token = null;
        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
        }

        // 2) Validar token y cargar contexto
        if (token != null && jwtUtils.validateJwtToken(token)) {
            String correo = jwtUtils.getUserNameFromJwtToken(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(correo);

            // Aquí construimos la Authentication con el principal y credenciales nulas
            UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
                );

            // Adjuntamos detalles de la petición (IP, sessionId…)
            auth.setDetails(
                new WebAuthenticationDetailsSource()
                    .buildDetails(request)
            );

            // Finalmente lo ponemos en el SecurityContext
            SecurityContextHolder
                .getContext()
                .setAuthentication(auth);
        }

        // 3) Continuar con la cadena de filtros
        chain.doFilter(request, response);
    }
}

