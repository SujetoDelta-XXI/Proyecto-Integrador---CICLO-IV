package com.estiloya.controller;

import com.estiloya.model.Categoria;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "http://localhost:5173") // O el puerto de tu frontend React
public class CategoriaController {

    private final RestTemplate restTemplate;

    public CategoriaController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping
    public List<Categoria> listarCategorias() {
        Categoria[] categorias = restTemplate.getForObject("http://127.0.0.1:8000/api/categorias/", Categoria[].class);
        return Arrays.asList(categorias);
    }
}
