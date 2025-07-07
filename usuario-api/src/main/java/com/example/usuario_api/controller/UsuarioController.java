package com.example.usuario_api.controller;

import com.example.usuario_api.dto.AuthResponseDto;
import com.example.usuario_api.dto.UsuarioResponseDto;
import com.example.usuario_api.dto.DisenoDto;
import com.example.usuario_api.dto.DisenosSeparadosDto;
import com.example.usuario_api.model.Usuario;
import com.example.usuario_api.repository.UsuarioRepository;
import com.example.usuario_api.service.AuthService;
import com.example.usuario_api.service.DisenoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioRepository usuarioRepo;
    private final AuthService authService;
    
    @Autowired
    private DisenoService disenoService;

    public UsuarioController(UsuarioRepository usuarioRepo, AuthService authService) {
        this.usuarioRepo = usuarioRepo;
        this.authService = authService;
    }

    /** Obtener Perfil */
    @GetMapping("/perfil")
    public ResponseEntity<?> getPerfil() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401)
                .body(new AuthResponseDto(false, "No autorizado"));
        }

        try {
            Long userId = Long.parseLong(authentication.getName());
            Usuario usuario = usuarioRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

            UsuarioResponseDto userDto = new UsuarioResponseDto(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getApellidos(),
                usuario.getCorreo(),
                usuario.getTelefono(),
                usuario.getRol(),
                usuario.getFechaRegistro()
            );

            Map<String, Object> response = Map.of(
                "success", true,
                "message", "Perfil obtenido exitosamente",
                "user", userDto
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401)
                .body(new AuthResponseDto(false, "Error al obtener perfil"));
        }
    }

    /** Actualizar Perfil */
    @PutMapping("/perfil")
    public ResponseEntity<?> updatePerfil(@RequestBody Map<String, String> body) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401)
                .body(new AuthResponseDto(false, "No autorizado"));
        }

        try {
            Long userId = Long.parseLong(authentication.getName());
            Usuario usuario = usuarioRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

            // Actualizar campos permitidos
            if (body.containsKey("nombre")) {
                usuario.setNombre(body.get("nombre"));
            }
            if (body.containsKey("apellidos")) {
                usuario.setApellidos(body.get("apellidos"));
            }
            if (body.containsKey("telefono")) {
                usuario.setTelefono(body.get("telefono"));
            }

            usuarioRepo.save(usuario);

            UsuarioResponseDto userDto = new UsuarioResponseDto(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getApellidos(),
                usuario.getCorreo(),
                usuario.getTelefono(),
                usuario.getRol(),
                usuario.getFechaRegistro()
            );

            Map<String, Object> response = Map.of(
                "success", true,
                "message", "Perfil actualizado exitosamente",
                "user", userDto
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new AuthResponseDto(false, "Error al actualizar perfil"));
        }
    }

    // ========== ENDPOINTS DE DISEÑOS ==========

    /** Obtener diseños pendientes del usuario autenticado */
    @GetMapping("/diseno/pendientes")
    public ResponseEntity<?> getDisenosPendientes() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401)
                .body(new AuthResponseDto(false, "No autorizado"));
        }

        try {
            Long userId = Long.parseLong(authentication.getName());
            System.out.println("🎯 Endpoint /api/usuario/diseno/pendientes llamado para usuario: " + userId);
            
            List<DisenoDto> disenos = disenoService.getDisenosPendientes(userId);
            System.out.println("✅ Encontrados " + disenos.size() + " diseños pendientes");
            
            Map<String, Object> response = Map.of(
                "success", true,
                "message", "Diseños pendientes obtenidos exitosamente",
                "disenos", disenos
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("❌ Error obteniendo diseños pendientes: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new AuthResponseDto(false, "Error al obtener diseños pendientes"));
        }
    }

    /** Obtener diseños aprobados del usuario autenticado */
    @GetMapping("/diseno/aprobados")
    public ResponseEntity<?> getDisenosAprobados() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401)
                .body(new AuthResponseDto(false, "No autorizado"));
        }

        try {
            Long userId = Long.parseLong(authentication.getName());
            System.out.println("🎯 Endpoint /api/usuario/diseno/aprobados llamado para usuario: " + userId);
            
            List<DisenoDto> disenos = disenoService.getDisenosAprobados(userId);
            System.out.println("✅ Encontrados " + disenos.size() + " diseños aprobados");
            
            Map<String, Object> response = Map.of(
                "success", true,
                "message", "Diseños aprobados obtenidos exitosamente",
                "disenos", disenos
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("❌ Error obteniendo diseños aprobados: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new AuthResponseDto(false, "Error al obtener diseños aprobados"));
        }
    }

    /** Obtener todos los diseños del usuario autenticado separados por estado */
    @GetMapping("/diseno/todos")
    public ResponseEntity<?> getDisenosSeparados() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401)
                .body(new AuthResponseDto(false, "No autorizado"));
        }

        try {
            Long userId = Long.parseLong(authentication.getName());
            System.out.println("🎯 Endpoint /api/usuario/diseno/todos llamado para usuario: " + userId);
            
            DisenosSeparadosDto disenos = disenoService.getDisenosSeparados(userId);
            System.out.println("✅ Encontrados " + disenos.getDisenosPendientes().size() + " pendientes y " + disenos.getDisenosAprobados().size() + " aprobados");
            
            Map<String, Object> response = Map.of(
                "success", true,
                "message", "Diseños obtenidos exitosamente",
                "disenos", disenos
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("❌ Error obteniendo diseños separados: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new AuthResponseDto(false, "Error al obtener diseños"));
        }
    }
} 