package com.estiloya.controller;

import com.estiloya.model.Descuento;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/descuentos")
@CrossOrigin(origins = "http://localhost:5173")
public class DescuentoController {

    private final RestTemplate restTemplate;

    public DescuentoController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping
    public List<Descuento> listarDescuentos() {
        Descuento[] descuentos = restTemplate.getForObject("http://127.0.0.1:8000/api/descuentos/", Descuento[].class);
        return Arrays.asList(descuentos);
    }
}
