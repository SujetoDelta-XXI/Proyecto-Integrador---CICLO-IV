package com.example.usuario_api.controller;

import java.security.Principal;
import java.util.List;
import java.util.stream.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.usuario_api.dto.CarritoItemDto;
import com.example.usuario_api.dto.ResumenCompraDto;
import com.example.usuario_api.mapper.CarritoMapper;
import com.example.usuario_api.service.CarritoService;

@RestController
@RequestMapping("/api/usuario/carrito")
@CrossOrigin(origins = "http://localhost:5173")
public class CarritoController {

    private final CarritoService service;
    private final CarritoMapper mapper;

    public CarritoController(CarritoService service, CarritoMapper mapper) {
        this.service = service;
        this.mapper  = mapper;
    }
    @GetMapping
    public List<CarritoItemDto> verCarrito(Principal principal) {
        Long userId = Long.valueOf(principal.getName()); 
        return service.listarDetalle(userId)
                      .stream()
                      .map(mapper::toDto)
                      .collect(Collectors.toList());
    }
    @PostMapping("/agregar")
    public ResponseEntity<?> agregar(
            Principal principal,
            @RequestBody CarritoItemDto input) {
        Long userId = Long.valueOf(principal.getName());
        service.agregarItem(userId, input.getProductoId(), input.getCantidad());
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarItem(@PathVariable Long id, Principal principal) {
        Long userId = Long.valueOf(principal.getName());
        service.eliminarItem(userId, id);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/actualizar")
    public ResponseEntity<?> actualizarCantidad(
            Principal principal,
            @RequestBody CarritoItemDto input) {
        Long userId = Long.valueOf(principal.getName());
        service.actualizarCantidad(userId, input.getProductoId(), input.getCantidad());
        return ResponseEntity.ok().build();
    }
    @GetMapping("/resumen")
public ResumenCompraDto resumenCompra(Principal principal) {
    Long userId = Long.valueOf(principal.getName());
    return service.calcularResumen(userId);
}
@PostMapping("/finalizar")
public ResponseEntity<?> finalizarCompra(Principal principal) {
    Long userId = Long.valueOf(principal.getName());
    service.finalizarCompra(userId);
    return ResponseEntity.ok("Compra finalizada exitosamente");
}


}
