// src/main/java/com/example/usuario_api/repository/DescuentoRepository.java
package com.example.usuario_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.usuario_api.model.Descuento;

public interface DescuentoRepository extends JpaRepository<Descuento, Long> {}
