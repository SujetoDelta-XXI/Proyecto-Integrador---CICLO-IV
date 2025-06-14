package com.estiloya.controller;

import com.estiloya.dto.AgregarAlCarritoDTO;
import com.estiloya.model.Carrito;
import com.estiloya.service.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "http://localhost:5173")
public class CarritoController {

    @Autowired
    private CarritoService carritoService;

    @PostMapping("/agregar")
    public Carrito agregarAlCarrito(@RequestBody AgregarAlCarritoDTO dto) {
        return carritoService.agregarAlCarrito(dto);
    }
}
