package com.example.usuario_api.controller;

import com.example.usuario_api.dto.GenerarImagenRequestDto;
import com.example.usuario_api.dto.GenerarImagenResponseDto;
import com.example.usuario_api.dto.GuardarDisenoRequestDto;
import com.example.usuario_api.model.CustomDesign;
import com.example.usuario_api.service.DisenoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/usuario/diseno")
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
    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        System.out.println("🧪 Endpoint de prueba llamado");
        return ResponseEntity.ok("Endpoint funcionando correctamente");
    }
} 