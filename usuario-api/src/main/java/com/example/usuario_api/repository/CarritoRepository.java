// src/main/java/com/example/usuario_api/repository/CarritoRepository.java
package com.example.usuario_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.example.usuario_api.model.Carrito;

public interface CarritoRepository extends JpaRepository<Carrito, Long> {
    List<Carrito> findByUsuarioId(Long usuarioId);
}
