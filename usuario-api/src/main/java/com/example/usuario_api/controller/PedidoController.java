// src/main/java/com/example/usuario_api/controller/PedidoController.java
package com.example.usuario_api.controller;

import java.security.Principal;
import java.util.List;
import java.util.stream.*;

import org.springframework.web.bind.annotation.*;

import com.example.usuario_api.dto.PedidoDto;
import com.example.usuario_api.mapper.PedidoMapper;
import com.example.usuario_api.service.PedidoService;

@RestController
@RequestMapping("/api/usuario/pedidos")
@CrossOrigin(origins = "http://localhost:5173")
public class PedidoController {

    private final PedidoService service;
    private final PedidoMapper mapper;

    public PedidoController(PedidoService service, PedidoMapper mapper) {
        this.service = service;
        this.mapper  = mapper;
    }

    @GetMapping
    public List<PedidoDto> listar(Principal principal) {
        Long userId = Long.valueOf(principal.getName());
        return service.listarPorUsuario(userId)
                      .stream()
                      .map(mapper::toDto)
                      .collect(Collectors.toList());
    }

    // @PostMapping
// public PedidoDto crear(Principal principal) {
//     Long userId = Long.valueOf(principal.getName());
//     return mapper.toDto(service.crearPedidoDesdeCarrito(userId));
// }

}

