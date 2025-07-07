package com.example.usuario_api.service;

import com.example.usuario_api.dto.GenerarImagenRequestDto;
import com.example.usuario_api.dto.GenerarImagenResponseDto;
import com.example.usuario_api.dto.DisenoDto;
import com.example.usuario_api.dto.DisenosSeparadosDto;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.MediaType;
import reactor.core.publisher.Mono;
import java.util.Collections;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;
import com.example.usuario_api.model.CustomDesign;
import com.example.usuario_api.model.Usuario;
import com.example.usuario_api.repository.CustomDesignRepository;
import com.example.usuario_api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDate;
import java.util.Optional;

@Service
public class DisenoService {
    private static final String GEMINI_API_KEY = "AIzaSyBRxnhfLctu2yhpExYotRDb79naXvZXA8E";
    private static final String GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=" + GEMINI_API_KEY;

    private final WebClient webClient = WebClient.builder()
            .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(10 * 1024 * 1024)) // 10MB
            .build();

    @Autowired
    private CustomDesignRepository customDesignRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Mono<GenerarImagenResponseDto> generarImagen(String prompt) {
        System.out.println("🔍 Prompt recibido: " + prompt);
        
        Map<String, Object> requestBody = Map.of(
            "contents", Collections.singletonList(
                Map.of("parts", Collections.singletonList(
                    Map.of("text", prompt)
                ))
            ),
            "generationConfig", Map.of(
                "responseModalities", List.of("TEXT", "IMAGE")
            )
        );
        
        System.out.println("📤 JSON enviado a Gemini: " + requestBody);
        System.out.println("🌐 URL de Gemini: " + GEMINI_URL);

        return webClient.post()
                .uri(GEMINI_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .doOnNext(response -> System.out.println("📥 Respuesta de Gemini: " + response))
                .doOnError(error -> System.err.println("❌ Error en llamada a Gemini: " + error.getMessage()))
                .map(response -> {
                    try {
                        var candidates = (java.util.List<?>) response.get("candidates");
                        if (candidates != null && !candidates.isEmpty()) {
                            var candidate = (Map<?, ?>) candidates.get(0);
                            var content = (Map<?, ?>) candidate.get("content");
                            var parts = (java.util.List<?>) content.get("parts");
                            for (Object partObj : parts) {
                                var part = (Map<?, ?>) partObj;
                                // Buscar inlineData en la misma parte que contiene el text
                                var inlineData = (Map<?, ?>) part.get("inlineData");
                                if (inlineData != null) {
                                    String base64 = (String) inlineData.get("data");
                                    return new GenerarImagenResponseDto(base64);
                                }
                            }
                        }
                    } catch (Exception e) {
                        // Manejo de error de parseo
                        System.err.println("Error procesando respuesta de Gemini: " + e.getMessage());
                    }
                    return new GenerarImagenResponseDto(null);
                });
    }

    public CustomDesign guardarDiseno(String base64Image, String descripcion, Long usuarioId) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        if (usuarioOpt.isEmpty()) {
            throw new RuntimeException("Usuario no encontrado");
        }
        CustomDesign diseno = new CustomDesign();
        diseno.setUrl_imagen(base64Image);
        diseno.setDescripcion(descripcion);
        diseno.setFecha_creacion(LocalDate.now());
        diseno.setEstado("pendiente");
        diseno.setUsuario(usuarioOpt.get());
        return customDesignRepository.save(diseno);
    }

    // Get pending designs for a user
    public List<DisenoDto> getDisenosPendientes(Long usuarioId) {
        System.out.println("🎯 Obteniendo diseños pendientes para usuario: " + usuarioId);
        List<CustomDesign> disenos = customDesignRepository.findByUsuarioIdAndEstadoOrderByFechaCreacionDesc(usuarioId, "pendiente");
        List<DisenoDto> disenosDto = disenos.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        System.out.println("✅ Encontrados " + disenosDto.size() + " diseños pendientes");
        return disenosDto;
    }

    // Get approved designs for a user
    public List<DisenoDto> getDisenosAprobados(Long usuarioId) {
        System.out.println("🎯 Obteniendo diseños aprobados para usuario: " + usuarioId);
        List<CustomDesign> disenos = customDesignRepository.findByUsuarioIdAndEstadoOrderByFechaCreacionDesc(usuarioId, "aprobado");
        List<DisenoDto> disenosDto = disenos.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        System.out.println("✅ Encontrados " + disenosDto.size() + " diseños aprobados");
        return disenosDto;
    }

    // Get all designs for a user separated by status
    public DisenosSeparadosDto getDisenosSeparados(Long usuarioId) {
        System.out.println("🎯 Obteniendo todos los diseños separados para usuario: " + usuarioId);
        List<DisenoDto> pendientes = getDisenosPendientes(usuarioId);
        List<DisenoDto> aprobados = getDisenosAprobados(usuarioId);
        return new DisenosSeparadosDto(pendientes, aprobados);
    }

    // Convert CustomDesign to DisenoDto
    private DisenoDto convertToDto(CustomDesign diseno) {
        return new DisenoDto(
            diseno.getId(),
            diseno.getUrl_imagen(),
            diseno.getDescripcion(),
            diseno.getFecha_creacion(),
            diseno.getEstado(),
            diseno.getUsuario().getId(),
            diseno.getUsuario().getNombre() + " " + diseno.getUsuario().getApellidos()
        );
    }
} 