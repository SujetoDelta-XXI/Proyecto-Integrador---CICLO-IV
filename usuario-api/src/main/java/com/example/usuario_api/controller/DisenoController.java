package com.example.usuario_api.controller;

import com.example.usuario_api.dto.GenerarImagenRequestDto;
import com.example.usuario_api.dto.GenerarImagenResponseDto;
import com.example.usuario_api.dto.GuardarDisenoRequestDto;
import com.example.usuario_api.dto.DisenoDto;
import com.example.usuario_api.dto.DisenosSeparadosDto;
import com.example.usuario_api.model.CustomDesign;
import com.example.usuario_api.service.DisenoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/usuario/diseno")
@CrossOrigin(origins = "*")
public class DisenoController {
    @Autowired
    private DisenoService disenoService;

    @PostMapping("/generar-imagen")
    public Mono<ResponseEntity<GenerarImagenResponseDto>> generarImagen(@RequestBody GenerarImagenRequestDto request) {
        System.out.println("🎯 Endpoint /generar-imagen llamado");
        System.out.println("📝 Request recibido: " + request.getPrompt());   
        return disenoService.generarImagen(request.getPrompt())
                .map(resp -> {
                    System.out.println("✅ Respuesta generada exitosamente");
                    return ResponseEntity.ok(resp);
                })
                .doOnError(error -> System.err.println("❌ Error en controlador: " + error.getMessage()));
    }

    @PostMapping("/guardar-diseno")
    public ResponseEntity<CustomDesign> guardarDiseno(@RequestBody GuardarDisenoRequestDto request) {
        System.out.println("🎯 Endpoint /guardar-diseno llamado");
        System.out.println("📝 Request recibido - UsuarioId: " + request.getUsuarioId());
        System.out.println("📝 Request recibido - Descripción: " + request.getDescripcion());
        System.out.println("📝 Request recibido - Tamaño imagen: " + (request.getBase64Image() != null ? request.getBase64Image().length() : "null") + " caracteres");
        
        try {
            CustomDesign diseno = disenoService.guardarDiseno(request.getBase64Image(), request.getDescripcion(), request.getUsuarioId());
            System.out.println("✅ Diseño guardado exitosamente con ID: " + diseno.getId());
            return new ResponseEntity<>(diseno, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("❌ Error guardando diseño: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    // Get pending designs for a user
    @GetMapping("/pendientes/{usuarioId}")
    public ResponseEntity<List<DisenoDto>> getDisenosPendientes(@PathVariable Long usuarioId) {
        System.out.println("🎯 Endpoint /pendientes/" + usuarioId + " llamado");
        try {
            List<DisenoDto> disenos = disenoService.getDisenosPendientes(usuarioId);
            System.out.println("✅ Encontrados " + disenos.size() + " diseños pendientes");
            return ResponseEntity.ok(disenos);
        } catch (Exception e) {
            System.err.println("❌ Error obteniendo diseños pendientes: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get approved designs for a user
    @GetMapping("/aprobados/{usuarioId}")
    public ResponseEntity<List<DisenoDto>> getDisenosAprobados(@PathVariable Long usuarioId) {
        System.out.println("🎯 Endpoint /aprobados/" + usuarioId + " llamado");
        try {
            List<DisenoDto> disenos = disenoService.getDisenosAprobados(usuarioId);
            System.out.println("✅ Encontrados " + disenos.size() + " diseños aprobados");
            return ResponseEntity.ok(disenos);
        } catch (Exception e) {
            System.err.println("❌ Error obteniendo diseños aprobados: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get all designs for a user separated by status
    @GetMapping("/todos/{usuarioId}")
    public ResponseEntity<DisenosSeparadosDto> getDisenosSeparados(@PathVariable Long usuarioId) {
        System.out.println("🎯 Endpoint /todos/" + usuarioId + " llamado");
        try {
            DisenosSeparadosDto disenos = disenoService.getDisenosSeparados(usuarioId);
            System.out.println("✅ Encontrados " + disenos.getDisenosPendientes().size() + " pendientes y " + disenos.getDisenosAprobados().size() + " aprobados");
            return ResponseEntity.ok(disenos);
        } catch (Exception e) {
            System.err.println("❌ Error obteniendo diseños separados: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        System.out.println("🧪 Endpoint de prueba llamado");
        return ResponseEntity.ok("Endpoint funcionando correctamente");
    }
} 