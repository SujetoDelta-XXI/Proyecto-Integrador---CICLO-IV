// src/main/java/com/example/usuario_api/repository/CategoriaRepository.java
package com.example.usuario_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.usuario_api.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {}
