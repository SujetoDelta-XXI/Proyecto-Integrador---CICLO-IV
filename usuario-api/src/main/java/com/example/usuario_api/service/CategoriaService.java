package com.example.usuario_api.service;

import com.example.usuario_api.model.Categoria;
import com.example.usuario_api.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {
    private final CategoriaRepository repo;

    public CategoriaService(CategoriaRepository repo) {
        this.repo = repo;
    }

    public List<Categoria> listar() {
        return repo.findAll();
    }
}
