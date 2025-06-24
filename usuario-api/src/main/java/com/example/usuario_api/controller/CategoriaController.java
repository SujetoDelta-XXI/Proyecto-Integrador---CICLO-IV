package com.example.usuario_api.controller;

import com.example.usuario_api.dto.CategoriaDto;
import com.example.usuario_api.mapper.CategoriaMapper;
import com.example.usuario_api.service.CategoriaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/usuario/categorias")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoriaController {

    private final CategoriaService service;
    private final CategoriaMapper mapper;

    public CategoriaController(CategoriaService service, CategoriaMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    public List<CategoriaDto> list() {
        return service.listar()
                      .stream()
                      .map(mapper::toDto)
                      .collect(Collectors.toList());
    }
}
